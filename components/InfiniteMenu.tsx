"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";

export interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items?: MenuItem[];
  /** 0.8 = closer/larger, 1 = normal, 1.2 = farther/smaller */
  scale?: number;
  backgroundColor?: string;
  /** Kept for compatibility with your Certificates.tsx. */
  imageFit?: "contain" | "cover";
}

const cardVertShaderSource = `#version 300 es
uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

void main() {
  vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.0);
  vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float radius = length(centerPos);

  vec3 rotationAxis = uRotationAxisVelocity.xyz;
  float rotationVelocity = min(0.15, uRotationAxisVelocity.w * 15.0);
  vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
  vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
  float strength = dot(stretchDir, relativeVertexPos);
  float invAbsStrength = min(0.0, abs(strength) - 1.0);
  strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.0);
  worldPosition.xyz += stretchDir * strength;

  worldPosition.xyz = radius * normalize(worldPosition.xyz);
  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

  vAlpha = smoothstep(0.5, 1.0, normalize(worldPosition.xyz).z) * 0.9 + 0.1;
  vUvs = aModelUvs;
  vInstanceId = gl_InstanceID;
}
`;

const cardFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;
in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
  int safeItemCount = max(uItemCount, 1);
  int itemIndex = vInstanceId % safeItemCount;
  int cellsPerRow = max(uAtlasSize, 1);
  int cellX = itemIndex % cellsPerRow;
  int cellY = itemIndex / cellsPerRow;

  vec2 cellSize = vec2(1.0) / float(cellsPerRow);
  vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

  vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);

  // Tiny inset prevents neighboring atlas images from bleeding in.
  float padding = 0.006;
  st = mix(vec2(padding), vec2(1.0 - padding), st);
  st = st * cellSize + cellOffset;

  outColor = texture(uTex, st);
  outColor.a *= vAlpha;
}
`;

class Face {
  constructor(
    public a: number,
    public b: number,
    public c: number
  ) {}
}

class Vertex {
  public position: vec3;
  public normal: vec3;
  public uv: vec2;

  constructor(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  public vertices: Vertex[] = [];
  public faces: Face[] = [];

  public addVertex(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3) {
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  public addFace(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3) {
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  public get lastVertex(): Vertex {
    return this.vertices[this.vertices.length - 1];
  }

  public subdivide(divisions = 1): this {
    const midPointCache: Record<string, number> = {};
    let faces = this.faces;

    for (let division = 0; division < divisions; division++) {
      const newFaces = new Array<Face>(faces.length * 4);

      faces.forEach((face, index) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);
        const p = index * 4;

        newFaces[p] = new Face(face.a, mAB, mCA);
        newFaces[p + 1] = new Face(face.b, mBC, mAB);
        newFaces[p + 2] = new Face(face.c, mCA, mBC);
        newFaces[p + 3] = new Face(mAB, mBC, mCA);
      });

      faces = newFaces;
    }

    this.faces = faces;
    return this;
  }

  public spherize(radius = 1): this {
    this.vertices.forEach(vertex => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }

  public get data(): {
    vertices: Float32Array;
    indices: Uint16Array;
    normals: Float32Array;
    uvs: Float32Array;
  } {
    return {
      vertices: new Float32Array(this.vertices.flatMap(v => Array.from(v.position))),
      indices: new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c])),
      normals: new Float32Array(this.vertices.flatMap(v => Array.from(v.normal))),
      uvs: new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)))
    };
  }

  private getMidPoint(indexA: number, indexB: number, cache: Record<string, number>): number {
    const cacheKey = indexA < indexB ? `k_${indexB}_${indexA}` : `k_${indexA}_${indexB}`;

    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
      return cache[cacheKey];
    }

    const a = this.vertices[indexA].position;
    const b = this.vertices[indexB].position;
    const index = this.vertices.length;

    cache[cacheKey] = index;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return index;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;

    this.addVertex(
      -1, t, 0,
      1, t, 0,
      -1, -t, 0,
      1, -t, 0,
      0, -1, t,
      0, 1, t,
      0, -1, -t,
      0, 1, -t,
      t, 0, -1,
      t, 0, 1,
      -t, 0, -1,
      -t, 0, 1
    ).addFace(
      0, 11, 5,
      0, 5, 1,
      0, 1, 7,
      0, 7, 10,
      0, 10, 11,
      1, 5, 9,
      5, 11, 4,
      11, 10, 2,
      10, 7, 6,
      7, 1, 8,
      3, 9, 4,
      3, 4, 2,
      3, 2, 6,
      3, 6, 8,
      3, 8, 9,
      4, 9, 5,
      2, 4, 11,
      6, 2, 10,
      8, 6, 7,
      9, 8, 1
    );
  }
}

/** Rectangle geometry. The final width/height is based on each JPG's real aspect ratio. */
class CardGeometry extends Geometry {
  constructor() {
    super();

    // Counter-clockwise when viewed from +Z, so front-face culling works.
    this.addVertex(-1, -1, 0); // bottom-left
    this.lastVertex.uv[0] = 0;
    this.lastVertex.uv[1] = 0;

    this.addVertex(1, -1, 0); // bottom-right
    this.lastVertex.uv[0] = 1;
    this.lastVertex.uv[1] = 0;

    this.addVertex(1, 1, 0); // top-right
    this.lastVertex.uv[0] = 1;
    this.lastVertex.uv[1] = 1;

    this.addVertex(-1, 1, 0); // top-left
    this.lastVertex.uv[0] = 0;
    this.lastVertex.uv[1] = 1;

    this.addFace(0, 1, 2, 0, 2, 3);
  }
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(
  gl: WebGL2RenderingContext,
  shaderSources: [string, string],
  attribLocations?: Record<string, number>
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, index) => {
    const shader = createShader(gl, type, shaderSources[index]);
    if (shader) gl.attachShader(program, shader);
  });

  if (attribLocations) {
    for (const attrib in attribLocations) {
      if (Object.prototype.hasOwnProperty.call(attribLocations, attrib)) {
        gl.bindAttribLocation(program, attribLocations[attrib], attrib);
      }
    }
  }

  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeBuffer(
  gl: WebGL2RenderingContext,
  sizeOrData: number | ArrayBufferView,
  usage: number
): WebGLBuffer {
  const buffer = gl.createBuffer();
  if (!buffer) throw new Error("Failed to create WebGL buffer.");

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, sizeOrData as any, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buffer;
}

function makeVertexArray(
  gl: WebGL2RenderingContext,
  buffers: Array<[WebGLBuffer, number, number]>,
  indices?: Uint16Array
): WebGLVertexArrayObject | null {
  const vao = gl.createVertexArray();
  if (!vao) return null;

  gl.bindVertexArray(vao);

  for (const [buffer, location, elementCount] of buffers) {
    if (location === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, elementCount, gl.FLOAT, false, 0, 0);
  }

  if (indices) {
    const indexBuffer = gl.createBuffer();
    if (indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }
  }

  gl.bindVertexArray(null);
  return vao;
}

function createTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) throw new Error("Failed to create WebGL texture.");

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Valid placeholder until the JPG atlas finishes loading.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([5, 5, 6, 255])
  );

  return texture;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
  const changed = canvas.width !== width || canvas.height !== height;

  if (changed) {
    canvas.width = width;
    canvas.height = height;
  }

  return changed;
}

type UpdateCallback = (deltaTime: number) => void;

class ArcballControl {
  public isPointerDown = false;
  public orientation = quat.create();
  public pointerRotation = quat.create();
  public rotationVelocity = 0;
  public rotationAxis = vec3.fromValues(1, 0, 0);
  public snapDirection = vec3.fromValues(0, 0, -1);
  public snapTargetDirection: vec3 | null = null;

  private pointerPos = vec2.create();
  private previousPointerPos = vec2.create();
  private rotationVelocityInternal = 0;
  private combinedQuat = quat.create();
  private readonly EPSILON = 0.1;
  private readonly IDENTITY_QUAT = quat.create();

  constructor(
    private canvas: HTMLCanvasElement,
    private updateCallback: UpdateCallback = () => undefined
  ) {
    canvas.addEventListener("pointerdown", this.handlePointerDown);
    canvas.addEventListener("pointerup", this.handlePointerUp);
    canvas.addEventListener("pointercancel", this.handlePointerUp);
    canvas.addEventListener("pointerleave", this.handlePointerUp);
    canvas.addEventListener("pointermove", this.handlePointerMove);
    canvas.style.touchAction = "none";
  }

  private handlePointerDown = (event: PointerEvent) => {
    vec2.set(this.pointerPos, event.clientX, event.clientY);
    vec2.copy(this.previousPointerPos, this.pointerPos);
    this.isPointerDown = true;
    this.canvas.setPointerCapture?.(event.pointerId);
  };

  private handlePointerUp = (event: PointerEvent) => {
    this.isPointerDown = false;
    try {
      this.canvas.releasePointerCapture?.(event.pointerId);
    } catch {
      // Ignore if capture has already been released.
    }
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (this.isPointerDown) {
      vec2.set(this.pointerPos, event.clientX, event.clientY);
    }
  };

  public destroy() {
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this.canvas.removeEventListener("pointerup", this.handlePointerUp);
    this.canvas.removeEventListener("pointercancel", this.handlePointerUp);
    this.canvas.removeEventListener("pointerleave", this.handlePointerUp);
    this.canvas.removeEventListener("pointermove", this.handlePointerMove);
  }

  public update(deltaTime: number, targetFrameDuration = 16) {
    const timeScale = deltaTime / targetFrameDuration + 0.00001;
    let angleFactor = timeScale;
    const snapRotation = quat.create();

    if (this.isPointerDown) {
      const intensity = 0.3 * timeScale;
      const angleAmplification = 5 / timeScale;
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
      vec2.scale(midPointerPos, midPointerPos, intensity);

      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);

        const p = this.project(midPointerPos);
        const q = this.project(this.previousPointerPos);
        const a = vec3.normalize(vec3.create(), p);
        const b = vec3.normalize(vec3.create(), q);

        vec2.copy(this.previousPointerPos, midPointerPos);
        angleFactor *= angleAmplification;
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, intensity);
      }
    } else {
      const intensity = 0.1 * timeScale;
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, intensity);

      if (this.snapTargetDirection) {
        const snappingIntensity = 0.2;
        const sqrDistance = vec3.squaredDistance(this.snapTargetDirection, this.snapDirection);
        const distanceFactor = Math.max(0.1, 1 - sqrDistance * 10);
        angleFactor *= snappingIntensity * distanceFactor;
        this.quatFromVectors(this.snapTargetDirection, this.snapDirection, snapRotation, angleFactor);
      }
    }

    const combined = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
    this.orientation = quat.multiply(quat.create(), combined, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    const rotationAxisIntensity = 0.8 * timeScale;
    quat.slerp(this.combinedQuat, this.combinedQuat, combined, rotationAxisIntensity);
    quat.normalize(this.combinedQuat, this.combinedQuat);

    const w = Math.max(-1, Math.min(1, this.combinedQuat[3]));
    const radians = Math.acos(w) * 2;
    const sinHalf = Math.sin(radians / 2);
    let rotationValue = 0;

    if (sinHalf > 0.000001) {
      rotationValue = radians / (2 * Math.PI);
      this.rotationAxis[0] = this.combinedQuat[0] / sinHalf;
      this.rotationAxis[1] = this.combinedQuat[1] / sinHalf;
      this.rotationAxis[2] = this.combinedQuat[2] / sinHalf;
    }

    const velocityIntensity = 0.5 * timeScale;
    this.rotationVelocityInternal +=
      (rotationValue - this.rotationVelocityInternal) * velocityIntensity;
    this.rotationVelocity = this.rotationVelocityInternal / timeScale;

    this.updateCallback(deltaTime);
  }

  private quatFromVectors(a: vec3, b: vec3, out: quat, angleFactor = 1) {
    const axis = vec3.cross(vec3.create(), a, b);
    if (vec3.squaredLength(axis) < 0.0000001) return;

    vec3.normalize(axis, axis);
    const dot = Math.max(-1, Math.min(1, vec3.dot(a, b)));
    const angle = Math.acos(dot) * angleFactor;
    quat.setAxisAngle(out, axis, angle);
  }

  private project(position: vec2): vec3 {
    const radius = 2;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const size = Math.max(1, Math.max(width, height) - 1);

    const x = (2 * position[0] - width - 1) / size;
    const y = (2 * position[1] - height - 1) / size;
    const xySquared = x * x + y * y;
    const radiusSquared = radius * radius;

    const z =
      xySquared <= radiusSquared / 2
        ? Math.sqrt(radiusSquared - xySquared)
        : radiusSquared / Math.sqrt(xySquared);

    return vec3.fromValues(-x, y, z);
  }
}

type ActiveItemCallback = (index: number) => void;
type MovementChangeCallback = (moving: boolean) => void;

interface Camera {
  matrix: mat4;
  near: number;
  far: number;
  fov: number;
  aspect: number;
  position: vec3;
  up: vec3;
  matrices: {
    view: mat4;
    projection: mat4;
    inverseProjection: mat4;
  };
}

class InfiniteGridMenu {
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private texture: WebGLTexture | null = null;
  private control!: ArcballControl;
  private frameId: number | null = null;
  private destroyed = false;

  private cardGeometry!: CardGeometry;
  private cardBuffers!: {
    vertices: Float32Array;
    indices: Uint16Array;
    normals: Float32Array;
    uvs: Float32Array;
  };

  private sphereGeometry!: IcosahedronGeometry;
  private instancePositions: vec3[] = [];
  private instanceCount = 0;
  private atlasSize = 1;
  private imageAspects: number[] = [];

  private instanceData!: {
    matricesArray: Float32Array;
    matrices: Float32Array[];
    buffer: WebGLBuffer | null;
  };

  private locations!: {
    aModelPosition: number;
    aModelUvs: number;
    aInstanceMatrix: number;
    uWorldMatrix: WebGLUniformLocation | null;
    uViewMatrix: WebGLUniformLocation | null;
    uProjectionMatrix: WebGLUniformLocation | null;
    uCameraPosition: WebGLUniformLocation | null;
    uRotationAxisVelocity: WebGLUniformLocation | null;
    uTex: WebGLUniformLocation | null;
    uItemCount: WebGLUniformLocation | null;
    uAtlasSize: WebGLUniformLocation | null;
  };

  private worldMatrix = mat4.create();
  private previousTime = 0;
  private moving = false;

  private readonly TARGET_FRAME_DURATION = 1000 / 60;
  private readonly SPHERE_RADIUS = 3.2;

  public smoothRotationVelocity = 0;
  public scaleFactor = 1;

  public camera: Camera = {
    matrix: mat4.create(),
    near: 0.1,
    far: 40,
    fov: Math.PI / 4,
    aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inverseProjection: mat4.create()
    }
  };

  constructor(
    private canvas: HTMLCanvasElement,
    private items: MenuItem[],
    private onActiveItemChange: ActiveItemCallback,
    private onMovementChange: MovementChangeCallback,
    scale = 1
  ) {
    this.scaleFactor = scale;
    this.camera.position[2] = 3 * scale;
    this.init();
  }

  private init() {
    const gl = this.canvas.getContext("webgl2", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: true
    });

    if (!gl) {
      throw new Error("WebGL 2 is not supported by this browser.");
    }

    this.gl = gl;
    this.program = createProgram(gl, [cardVertShaderSource, cardFragShaderSource], {
      aModelPosition: 0,
      aModelUvs: 2,
      aInstanceMatrix: 3
    });

    if (!this.program) {
      throw new Error("Could not create InfiniteMenu shader program.");
    }

    this.locations = {
      aModelPosition: gl.getAttribLocation(this.program, "aModelPosition"),
      aModelUvs: gl.getAttribLocation(this.program, "aModelUvs"),
      aInstanceMatrix: gl.getAttribLocation(this.program, "aInstanceMatrix"),
      uWorldMatrix: gl.getUniformLocation(this.program, "uWorldMatrix"),
      uViewMatrix: gl.getUniformLocation(this.program, "uViewMatrix"),
      uProjectionMatrix: gl.getUniformLocation(this.program, "uProjectionMatrix"),
      uCameraPosition: gl.getUniformLocation(this.program, "uCameraPosition"),
      uRotationAxisVelocity: gl.getUniformLocation(this.program, "uRotationAxisVelocity"),
      uTex: gl.getUniformLocation(this.program, "uTex"),
      uItemCount: gl.getUniformLocation(this.program, "uItemCount"),
      uAtlasSize: gl.getUniformLocation(this.program, "uAtlasSize")
    };

    this.cardGeometry = new CardGeometry();
    this.cardBuffers = this.cardGeometry.data;

    const positionBuffer = makeBuffer(gl, this.cardBuffers.vertices, gl.STATIC_DRAW);
    const uvBuffer = makeBuffer(gl, this.cardBuffers.uvs, gl.STATIC_DRAW);

    this.vao = makeVertexArray(
      gl,
      [
        [positionBuffer, this.locations.aModelPosition, 3],
        [uvBuffer, this.locations.aModelUvs, 2]
      ],
      this.cardBuffers.indices
    );

    this.sphereGeometry = new IcosahedronGeometry();
    this.sphereGeometry.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = this.sphereGeometry.vertices.map(v => v.position);
    this.instanceCount = this.instancePositions.length;

    this.initInstances();
    this.initTextureAtlas();

    this.control = new ArcballControl(this.canvas, deltaTime => this.onControlUpdate(deltaTime));
    this.updateCameraMatrix();
    this.resize();
  }

  private initTextureAtlas() {
    if (!this.gl) return;
    const gl = this.gl;

    this.texture = createTexture(gl);

    const itemCount = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));

    // Increase to 768 for sharper certificates if your device handles it well.
    const cellSize = 512;
    const atlas = document.createElement("canvas");
    atlas.width = this.atlasSize * cellSize;
    atlas.height = this.atlasSize * cellSize;

    const ctx = atlas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#050506";
    ctx.fillRect(0, 0, atlas.width, atlas.height);

    Promise.all(this.items.map(item => this.loadImage(item.image, cellSize))).then(images => {
      if (this.destroyed || !this.gl || !this.texture) return;

      // Store the REAL JPG width/height ratio.
      this.imageAspects = images.map(image => image.width / Math.max(1, image.height));

      images.forEach((image, index) => {
        const x = (index % this.atlasSize) * cellSize;
        const y = Math.floor(index / this.atlasSize) * cellSize;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, cellSize, cellSize);
        ctx.clip();

        // IMPORTANT:
        // The JPG is intentionally drawn into a square atlas cell.
        // The 3D card geometry below restores the JPG's real aspect ratio.
        // This prevents the black letterbox/double-aspect problem.
        ctx.drawImage(image, x, y, cellSize, cellSize);
        ctx.restore();
      });

      const currentGl = this.gl;
      currentGl.bindTexture(currentGl.TEXTURE_2D, this.texture);
      currentGl.pixelStorei(currentGl.UNPACK_FLIP_Y_WEBGL, false);
      currentGl.texImage2D(
        currentGl.TEXTURE_2D,
        0,
        currentGl.RGBA,
        currentGl.RGBA,
        currentGl.UNSIGNED_BYTE,
        atlas
      );
      currentGl.generateMipmap(currentGl.TEXTURE_2D);
      currentGl.texParameteri(
        currentGl.TEXTURE_2D,
        currentGl.TEXTURE_MIN_FILTER,
        currentGl.LINEAR_MIPMAP_LINEAR
      );
    });
  }

  private loadImage(src: string, fallbackSize: number): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => {
        const fallback = document.createElement("canvas");
        fallback.width = fallbackSize;
        fallback.height = Math.round(fallbackSize * 0.7);

        const ctx = fallback.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#0b0b0e";
          ctx.fillRect(0, 0, fallback.width, fallback.height);
          ctx.fillStyle = "#888";
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Image unavailable", fallback.width / 2, fallback.height / 2);
        }

        const fallbackImage = new Image();
        fallbackImage.onload = () => resolve(fallbackImage);
        fallbackImage.src = fallback.toDataURL("image/png");
      };
      image.src = src;
    });
  }

  private initInstances() {
    if (!this.gl || !this.vao) return;
    const gl = this.gl;

    const matricesArray = new Float32Array(this.instanceCount * 16);
    const matrices: Float32Array[] = [];

    for (let i = 0; i < this.instanceCount; i++) {
      const matrix = new Float32Array(matricesArray.buffer, i * 16 * 4, 16);
      mat4.identity(matrix as unknown as mat4);
      matrices.push(matrix);
    }

    this.instanceData = {
      matricesArray,
      matrices,
      buffer: gl.createBuffer()
    };

    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceData.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, matricesArray.byteLength, gl.DYNAMIC_DRAW);

    const bytesPerMatrix = 16 * 4;

    for (let column = 0; column < 4; column++) {
      const location = this.locations.aInstanceMatrix + column;
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 4, gl.FLOAT, false, bytesPerMatrix, column * 4 * 4);
      gl.vertexAttribDivisor(location, 1);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  public resize() {
    if (!this.gl) return;

    if (resizeCanvasToDisplaySize(this.canvas)) {
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    }

    this.updateProjectionMatrix();
  }

  public run = (time = 0) => {
    if (this.destroyed) return;

    const deltaTime = Math.min(32, time - this.previousTime);
    this.previousTime = time;

    this.animate(deltaTime);
    this.render();
    this.frameId = requestAnimationFrame(this.run);
  };

  public destroy() {
    this.destroyed = true;

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }

    this.control?.destroy();

    if (this.gl && this.texture) this.gl.deleteTexture(this.texture);
    if (this.gl && this.program) this.gl.deleteProgram(this.program);
    if (this.gl && this.vao) this.gl.deleteVertexArray(this.vao);
    if (this.gl && this.instanceData?.buffer) this.gl.deleteBuffer(this.instanceData.buffer);
  }

  private animate(deltaTime: number) {
    if (!this.gl) return;

    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);

    const positions = this.instancePositions.map(position =>
      vec3.transformQuat(vec3.create(), position, this.control.orientation)
    );

    // MAIN SIZE CONTROL FOR CERTIFICATE CARDS.
    // 0.24 = smaller, 0.30 = recommended, 0.36 = larger.
    const cardScale = 0.30;
    const depthScaleIntensity = 0.6;

    positions.forEach((position, index) => {
      const depthScale =
        (Math.abs(position[2]) / this.SPHERE_RADIUS) * depthScaleIntensity +
        (1 - depthScaleIntensity);

      const baseScale = depthScale * cardScale;
      const itemIndex = index % Math.max(this.items.length, 1);
      const rawAspect = this.imageAspects[itemIndex] || 1.414;

      // Protect the layout from extremely narrow/wide images while still
      // following the real JPG dimensions.
      const aspect = Math.max(0.55, Math.min(rawAspect, 2.4));

      let scaleX = baseScale;
      let scaleY = baseScale;

      if (aspect >= 1) {
        // Landscape JPG: wider card.
        scaleX = baseScale * aspect;
      } else {
        // Portrait JPG: taller card.
        scaleY = baseScale / aspect;
      }

      const matrix = mat4.create();

      mat4.multiply(
        matrix,
        matrix,
        mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), position))
      );

      mat4.multiply(
        matrix,
        matrix,
        mat4.targetTo(mat4.create(), [0, 0, 0], position, [0, 1, 0])
      );

      // IMPORTANT FIX:
      // Your previous version created mat4.fromScaling(...) but did not
      // multiply it into the matrix. This applies the real JPG aspect ratio.
      mat4.multiply(
        matrix,
        matrix,
        mat4.fromScaling(mat4.create(), [scaleX, scaleY, baseScale])
      );

      mat4.multiply(
        matrix,
        matrix,
        mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS])
      );

      mat4.copy(this.instanceData.matrices[index], matrix);
    });

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.instanceData.buffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.instanceData.matricesArray);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  private render() {
    if (!this.gl || !this.program || !this.vao) return;
    const gl = this.gl;

    gl.useProgram(this.program);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.locations.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(this.locations.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(this.locations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(
      this.locations.uCameraPosition,
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2]
    );
    gl.uniform4f(
      this.locations.uRotationAxisVelocity,
      this.control.rotationAxis[0],
      this.control.rotationAxis[1],
      this.control.rotationAxis[2],
      this.smoothRotationVelocity * 1.1
    );
    gl.uniform1i(this.locations.uItemCount, Math.max(this.items.length, 1));
    gl.uniform1i(this.locations.uAtlasSize, this.atlasSize);
    gl.uniform1i(this.locations.uTex, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.bindVertexArray(this.vao);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.cardBuffers.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.instanceCount
    );
    gl.bindVertexArray(null);
  }

  private updateCameraMatrix() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  private updateProjectionMatrix() {
    if (!this.gl) return;

    const canvas = this.gl.canvas as HTMLCanvasElement;
    if (canvas.clientWidth <= 0 || canvas.clientHeight <= 0) return;

    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    const visibleHeight = this.SPHERE_RADIUS * 0.35;
    const distance = Math.max(0.1, this.camera.position[2]);

    this.camera.fov =
      this.camera.aspect > 1
        ? 2 * Math.atan(visibleHeight / distance)
        : 2 * Math.atan(visibleHeight / this.camera.aspect / distance);

    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far
    );

    mat4.invert(this.camera.matrices.inverseProjection, this.camera.matrices.projection);
  }

  private onControlUpdate(deltaTime: number) {
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;
    let damping = 5 / timeScale;
    let cameraTargetZ = 3 * this.scaleFactor;

    const isMoving =
      this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;

    if (isMoving !== this.moving) {
      this.moving = isMoving;
      this.onMovementChange(isMoving);
    }

    if (!this.control.isPointerDown) {
      const nearestIndex = this.findNearestVertexIndex();
      const itemIndex = nearestIndex % Math.max(1, this.items.length);
      this.onActiveItemChange(itemIndex);

      this.control.snapTargetDirection = vec3.normalize(
        vec3.create(),
        this.getVertexWorldPosition(nearestIndex)
      );
    } else {
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / timeScale;
    }

    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
    this.updateCameraMatrix();
  }

  private findNearestVertexIndex(): number {
    const inverseOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const direction = vec3.transformQuat(
      vec3.create(),
      this.control.snapDirection,
      inverseOrientation
    );

    let maxDot = -Infinity;
    let nearestIndex = 0;

    for (let i = 0; i < this.instancePositions.length; i++) {
      const dot = vec3.dot(direction, this.instancePositions[i]);
      if (dot > maxDot) {
        maxDot = dot;
        nearestIndex = i;
      }
    }

    return nearestIndex;
  }

  private getVertexWorldPosition(index: number): vec3 {
    return vec3.transformQuat(
      vec3.create(),
      this.instancePositions[index],
      this.control.orientation
    );
  }
}

const defaultItems: MenuItem[] = [
  {
    image: "/certificates/cert-1.jpg",
    link: "",
    title: "Certificate",
    description: "Credential"
  }
];

const InfiniteMenu: FC<InfiniteMenuProps> = ({
  items = [],
  scale = 1,
  backgroundColor = "#050506"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(items[0] ?? null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const safeItems = items.length ? items : defaultItems;
    setActiveItem(safeItems[0]);

    let menu: InfiniteGridMenu | null = null;

    const handleActiveItem = (index: number) => {
      setActiveItem(safeItems[index % safeItems.length]);
    };

    try {
      menu = new InfiniteGridMenu(
        canvas,
        safeItems,
        handleActiveItem,
        setIsMoving,
        scale
      );
      menu.run();
    } catch (error) {
      console.error("InfiniteMenu failed to initialize:", error);
    }

    const handleResize = () => menu?.resize();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      menu?.destroy();
    };
  }, [items, scale]);

  const openCredential = () => {
    if (!activeItem?.link) return;

    if (/^https?:\/\//i.test(activeItem.link)) {
      window.open(activeItem.link, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = activeItem.link;
    }
  };

  return (
    <div
      className="relative h-full w-full select-none overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive certificate gallery"
        className="absolute inset-0 h-full w-full cursor-grab touch-none outline-none active:cursor-grabbing"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.18)_70%,rgba(0,0,0,.65)_100%)]"
      />

      {activeItem && (
        <>
          <div
            className={`pointer-events-none absolute left-4 top-[72px] z-10 max-w-[72%] transition-all duration-500 sm:left-7 sm:top-1/2 sm:max-w-[270px] md:left-10 md:max-w-[320px] lg:left-14 lg:max-w-[380px] ${
              isMoving
                ? "translate-y-2 opacity-0 sm:-translate-y-[42%]"
                : "translate-y-0 opacity-100 sm:-translate-y-1/2"
            }`}
          >
            <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.26em] text-white/35 sm:text-[9px]">
              Selected credential
            </p>

            <h2 className="font-display text-lg font-semibold leading-[1.15] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,.8)] sm:text-2xl md:text-3xl lg:text-4xl">
              {activeItem.title}
            </h2>

            <p className="mt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-white/45 sm:text-[9px]">
              {activeItem.description}
            </p>
          </div>

          {activeItem.link && (
            <button
              type="button"
              onClick={openCredential}
              aria-label={`View ${activeItem.title}`}
              className={`absolute bottom-16 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white text-lg text-black shadow-[0_10px_40px_rgba(0,0,0,.6),0_0_35px_rgba(59,37,88,.25)] transition-all hover:scale-110 hover:bg-[#d7d7df] active:scale-95 sm:bottom-10 sm:h-14 sm:w-14 sm:text-xl ${
                isMoving
                  ? "pointer-events-none translate-y-8 scale-50 opacity-0"
                  : "pointer-events-auto translate-y-0 scale-100 opacity-100"
              }`}
            >
              ↗
            </button>
          )}

          <div
            className={`pointer-events-none absolute right-6 top-1/2 z-10 hidden max-w-[180px] -translate-y-1/2 transition-all duration-500 md:block ${
              isMoving ? "translate-x-8 opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            <p className="font-mono text-[9px] uppercase leading-[1.8] tracking-[0.18em] text-white/25">
              Drag the gallery to explore more credentials.
            </p>
          </div>
        </>
      )}

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] bg-black/40 px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/30 backdrop-blur-md sm:hidden">
        swipe to explore
      </div>
    </div>
  );
};

export default InfiniteMenu;
