/* eslint-disable react/no-unknown-property */

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {

  Canvas,

  extend,

  useFrame,

  useThree,

  type ThreeEvent,

} from "@react-three/fiber";

import {

  Environment,

  Lightformer,

  useGLTF,

  useTexture,

} from "@react-three/drei";

import {

  BallCollider,

  CuboidCollider,

  Physics,

  RigidBody,

  useRopeJoint,

  useSphericalJoint,

  type RapierRigidBody,

  type RigidBodyProps,

} from "@react-three/rapier";

import { MeshLineGeometry, MeshLineMaterial } from "meshline";

import * as THREE from "three";

const CARD_GLB = "/lanyard/card.glb";

const DEFAULT_LANYARD = "/lanyard/lanyard.png";

extend({

  MeshLineGeometry,

  MeshLineMaterial,

});

declare module "@react-three/fiber" {

  interface ThreeElements {

    meshLineGeometry: any;

    meshLineMaterial: any;

  }

}

const BLANK_PIXEL =

  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = {

  x: 0,

  y: 0,

  w: 0.5,

  h: 0.755,

};

const BACK_UV_RECT = {

  x: 0.5,

  y: 0,

  w: 0.5,

  h: 0.757,

};

interface LanyardProps {

  position?: [number, number, number];

  gravity?: [number, number, number];

  fov?: number;

  transparent?: boolean;

  frontImage?: string | null;

  backImage?: string | null;

  imageFit?: "cover" | "contain";

  imageZoom?: number;

  imageOffsetY?: number;

  imageBrightness?: number;

  lanyardImage?: string | null;

  lanyardWidth?: number;

}

interface BandProps {

  maxSpeed?: number;

  minSpeed?: number;

  screenWidth: number;

  frontImage?: string | null;

  backImage?: string | null;

  imageFit?: "cover" | "contain";

  imageZoom?: number;

  imageOffsetY?: number;

  imageBrightness?: number;

  lanyardImage?: string | null;

  lanyardWidth?: number;

}

type LanyardRigidBody = RapierRigidBody & {

  lerped?: THREE.Vector3;

};

export default function Lanyard({

  position = [0, 0, 23],

  gravity = [0, -40, 0],

  fov = 20,

  transparent = true,

  frontImage = null,

  backImage = null,

  imageFit = "cover",

  imageZoom = 1.35,

  imageOffsetY = -0.12,

  imageBrightness = 1,

  lanyardImage = null,

  lanyardWidth = 1,

}: LanyardProps) {

  // Keep the first server render and first browser render identical.
  // The real browser width is applied after hydration in useEffect.
  const [screenWidth, setScreenWidth] = useState(1440);

  useEffect(() => {

    const resize = () => setScreenWidth(window.innerWidth);

    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

  }, []);

  const isMobile = screenWidth < 768;

  const layoutKey =

    screenWidth < 480

      ? "phone-small"

      : screenWidth < 640

        ? "phone"

        : screenWidth < 1024

          ? "tablet"

          : screenWidth < 1440

            ? "laptop"

            : "desktop";

  return (

    <div className="lanyard-wrapper">

      <Canvas

        key={layoutKey}

        camera={{ position, fov }}

        dpr={[1, isMobile ? 1.25 : 1.75]}

        gl={{ alpha: transparent, antialias: true }}

        onCreated={({ gl }) => {

          gl.setClearColor(

            new THREE.Color(0x000000),

            transparent ? 0 : 1

          );

        }}

      >

        <ambientLight intensity={Math.PI} />

        <Physics

          gravity={gravity}

          timeStep={isMobile ? 1 / 30 : 1 / 60}

        >

          <Band

            screenWidth={screenWidth}

            frontImage={frontImage}

            backImage={backImage}

            imageFit={imageFit}

            imageZoom={imageZoom}

            imageOffsetY={imageOffsetY}

            imageBrightness={imageBrightness}

            lanyardImage={lanyardImage}

            lanyardWidth={lanyardWidth}

          />

        </Physics>

        <Environment blur={0.75}>

          <Lightformer

            intensity={2}

            color="white"

            position={[0, -1, 5]}

            rotation={[0, 0, Math.PI / 3]}

            scale={[100, 0.1, 1]}

          />

          <Lightformer

            intensity={2.2}

            color="#d8d8df"

            position={[-1, -1, 1]}

            rotation={[0, 0, Math.PI / 3]}

            scale={[100, 0.1, 1]}

          />

          <Lightformer

            intensity={2.2}

            color="#6f5a86"

            position={[1, 1, 1]}

            rotation={[0, 0, Math.PI / 3]}

            scale={[100, 0.1, 1]}

          />

          <Lightformer

            intensity={10}

            color="white"

            position={[-10, 0, 14]}

            rotation={[0, Math.PI / 2, Math.PI / 3]}

            scale={[100, 10, 1]}

          />

        </Environment>

      </Canvas>

    </div>

  );

}

function Band({

  maxSpeed = 50,

  minSpeed = 0,

  screenWidth,

  frontImage = null,

  backImage = null,

  imageFit = "cover",

  imageZoom = 1.35,

  imageOffsetY = -0.12,

  imageBrightness = 1,

  lanyardImage = null,

  lanyardWidth = 1,

}: BandProps) {

  const { viewport } = useThree();

  const isMobile = screenWidth < 768;
  /**
   * MOBILE SIZE CONTROLS
   *
   * <480px = most phones / iPhones
   * <640px = larger phones
   *
   * Increase cardScale if you want the entire ID even bigger.
   */

  const responsive = useMemo(() => {

    if (screenWidth < 480) {

      return {

        x: viewport.width * 0.08,

        y: 4.55,

        cardScale: 3,

        ropeWidth: 0.72,

      };

    }

    if (screenWidth < 640) {

      return {

        x: viewport.width * 0.12,

        y: 4.6,

        cardScale: 2.7,

        ropeWidth: 0.8,

      };

    }

    if (screenWidth < 1024) {

      return {

        x: viewport.width * 0.24,

        y: 4.75,

        cardScale: 2.9,

        ropeWidth: 0.88,

      };

    }

    if (screenWidth < 1440) {

      return {

        x: viewport.width * 0.3,

        y: 4.75,

        cardScale: 4.25,

        ropeWidth: 0.98,

      };

    }

    return {

      x: viewport.width * 0.33,

      y: 4.75,

      cardScale: 2.55,

      ropeWidth: 1.05,

    };

  }, [screenWidth, viewport.width]);

  const band = useRef<any>(null);

  const fixed = useRef<RapierRigidBody>(null!);

  const j1 = useRef<LanyardRigidBody>(null!);

  const j2 = useRef<LanyardRigidBody>(null!);

  const j3 = useRef<RapierRigidBody>(null!);

  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);

  const ang = useMemo(() => new THREE.Vector3(), []);

  const rot = useMemo(() => new THREE.Vector3(), []);

  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps: RigidBodyProps = {

    type: "dynamic",

    canSleep: true,

    colliders: false,

    angularDamping: isMobile ? 5.5 : 4,

    linearDamping: isMobile ? 5 : 4,

  };

  const { nodes, materials } = useGLTF(CARD_GLB) as any;

  const texture = useTexture(lanyardImage || DEFAULT_LANYARD);

  const frontTex = useTexture(frontImage || BLANK_PIXEL);

  const backTex = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {

    const baseMap = materials.base?.map as THREE.Texture;

    if (!baseMap) return null;

    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image as any;

    if (!baseImg?.width || !baseImg?.height) return baseMap;

    const width = baseImg.width;

    const height = baseImg.height;

    const canvas = document.createElement("canvas");

    canvas.width = width;

    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, width, height);

    const drawFitted = (

      image: any,

      rect: { x: number; y: number; w: number; h: number }

    ) => {

      if (!image?.width || !image?.height) return;

      const rx = rect.x * width;

      const ry = rect.y * height;

      const rw = rect.w * width;

      const rh = rect.h * height;

      const baseScale =

        imageFit === "contain"

          ? Math.min(rw / image.width, rh / image.height)

          : Math.max(rw / image.width, rh / image.height);

      const scale = baseScale * imageZoom;

      const dw = image.width * scale;

      const dh = image.height * scale;

      const dx = rx + (rw - dw) / 2;

      const dy = ry + (rh - dh) / 2 + rh * imageOffsetY;

      ctx.save();

      ctx.beginPath();

      ctx.rect(rx, ry, rw, rh);

      ctx.clip();

      if (imageBrightness !== 1) {

        ctx.filter = `brightness(${imageBrightness})`;

      }

      ctx.drawImage(image, dx, dy, dw, dh);

      ctx.filter = "none";

      ctx.restore();

    };

    if (frontImage && frontTex.image) {

      drawFitted(frontTex.image, FRONT_UV_RECT);

    }

    if (backImage && backTex.image) {

      drawFitted(backTex.image, BACK_UV_RECT);

    }

    const result = new THREE.CanvasTexture(canvas);

    result.colorSpace = THREE.SRGBColorSpace;

    result.flipY = baseMap.flipY;

    result.anisotropy = 16;

    result.needsUpdate = true;

    return result;

  }, [

    materials,

    frontImage,

    backImage,

    imageFit,

    imageZoom,

    imageOffsetY,

    imageBrightness,

    frontTex,

    backTex,

  ]);

  const [curve] = useState(

    () =>

      new THREE.CatmullRomCurve3([

        new THREE.Vector3(),

        new THREE.Vector3(),

        new THREE.Vector3(),

        new THREE.Vector3(),

      ])

  );

  curve.curveType = "centripetal";

  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);

  const [hovered, setHovered] = useState(false);

  const ropeLength = isMobile ? 0.6 : 1;

useRopeJoint(fixed, j1, [

  [0, 0, 0],

  [0, 0, 0],

  ropeLength,

]);

useRopeJoint(j1, j2, [

  [0, 0, 0],

  [0, 0, 0],

  ropeLength,

]);

useRopeJoint(j2, j3, [

  [0, 0, 0],

  [0, 0, 0],

  ropeLength,

]);

useSphericalJoint(j3, card, [

  [0, 0, 0],

  [0, 1.80, 0],

]);

  useEffect(() => {

    if (hovered) {

      document.body.style.cursor = dragged ? "grabbing" : "grab";

    } else {

      document.body.style.cursor = "auto";

    }

    return () => {

      document.body.style.cursor = "auto";

    };

  }, [hovered, dragged]);

  const getLerped = (body: LanyardRigidBody) => {

    if (!body.lerped) {

      body.lerped = new THREE.Vector3().copy(body.translation());

    }

    return body.lerped;

  };

  useFrame((state, delta) => {

    if (dragged && typeof dragged !== "boolean") {

      vec

        .set(state.pointer.x, state.pointer.y, 0.5)

        .unproject(state.camera);

      dir

        .copy(vec)

        .sub(state.camera.position)

        .normalize();

      vec.add(

        dir.multiplyScalar(state.camera.position.length())

      );

      [card, j1, j2, j3, fixed].forEach((ref) => {

        ref.current?.wakeUp();

      });

      card.current?.setNextKinematicTranslation({

        x: vec.x - dragged.x,

        y: vec.y - dragged.y,

        z: vec.z - dragged.z,

      });

    }

    if (

      fixed.current &&

      j1.current &&

      j2.current &&

      j3.current &&

      card.current

    ) {

      [j1, j2].forEach((ref) => {

        const body = ref.current;

        const lerped = getLerped(body);

        const distance = lerped.distanceTo(body.translation());

        const clamped = Math.max(0.1, Math.min(1, distance));

        lerped.lerp(

          body.translation(),

          delta * (minSpeed + clamped * (maxSpeed - minSpeed))

        );

      });

      curve.points[0].copy(j3.current.translation());

      curve.points[1].copy(getLerped(j2.current));

      curve.points[2].copy(getLerped(j1.current));

      curve.points[3].copy(fixed.current.translation());

      band.current?.geometry?.setPoints(

        curve.getPoints(screenWidth < 768 ? 32 : 56)

      );

      ang.copy(card.current.angvel());

      rot.copy(card.current.rotation() as any);

      card.current.setAngvel(

        {

          x: ang.x,

          y: ang.y - rot.y * 0.25,

          z: ang.z,

        },

        true

      );

    }

  });

  texture.wrapS = THREE.RepeatWrapping;

  texture.wrapT = THREE.RepeatWrapping;

  texture.colorSpace = THREE.SRGBColorSpace;

  texture.needsUpdate = true;

  return (

    <>

      <group position={[responsive.x, responsive.y, 0]}>

        <RigidBody

  ref={fixed}

  {...segmentProps}

  type="fixed"

/>

<RigidBody

  ref={j1}

  {...segmentProps}

  position={[0, isMobile ? -1.15 : -1.2, 0]}

>

  <BallCollider args={[0.08]} />

</RigidBody>

<RigidBody

  ref={j2}

  {...segmentProps}

  position={[0, isMobile ? -2.3 : -2.4, 0]}

>

  <BallCollider args={[0.08]} />

</RigidBody>

<RigidBody

  ref={j3}

  {...segmentProps}

  position={[0, isMobile ? -3.45 : -3.6, 0]}

>

  <BallCollider args={[0.08]} />

</RigidBody>

<RigidBody

  ref={card}

  {...segmentProps}

  position={[0, isMobile ? -8.9 : -5.3, 0]}

  type={dragged ? "kinematicPosition" : "dynamic"}

>

  <CuboidCollider args={[1, 1.4, 0.02]} />

          <group

            scale={responsive.cardScale}

            position={[0, -1.2, -0.05]}

            onPointerOver={(e) => {

              e.stopPropagation();

              setHovered(true);

            }}

            onPointerOut={() => {

              setHovered(false);

            }}

            onPointerDown={(e: ThreeEvent<PointerEvent>) => {

              e.stopPropagation();

              (e.target as unknown as Element).setPointerCapture?.(

                e.pointerId

              );

              setDragged(

                new THREE.Vector3()

                  .copy(e.point)

                  .sub(vec.copy(card.current.translation()))

              );

            }}

            onPointerUp={(e: ThreeEvent<PointerEvent>) => {

              e.stopPropagation();

              (e.target as unknown as Element).releasePointerCapture?.(

                e.pointerId

              );

              setDragged(false);

            }}

          >

            <mesh geometry={nodes.card.geometry}>

              <meshPhysicalMaterial

                map={cardMap || materials.base?.map}

                clearcoat={screenWidth < 768 ? 0.25 : 0.65}

                clearcoatRoughness={0.2}

                roughness={0.82}

                metalness={0.15}

              />

            </mesh>

            <mesh

              geometry={nodes.clip.geometry}

              material={materials.metal}

            />

            <mesh

              geometry={nodes.clamp.geometry}

              material={materials.metal}

            />

          </group>

        </RigidBody>

      </group>

      <mesh ref={band}>

        <meshLineGeometry />

        <meshLineMaterial

          color="white"

          depthTest={false}

          resolution={[

            Math.max(screenWidth, 1),

            Math.max(

              typeof window !== "undefined"

                ? window.innerHeight

                : 800,

              1

            ),

          ]}

          useMap

          map={texture}

          repeat={[-4, 1]}

          lineWidth={lanyardWidth * responsive.ropeWidth}

        />

      </mesh>

    </>

  );

}

useGLTF.preload(CARD_GLB);
