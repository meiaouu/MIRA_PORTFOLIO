"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toPng } from "html-to-image";
import PaperCrumple, {
  type PaperCrumpleProps,
} from "./PaperCrumple";

type Size = {
  width: number;
  height: number;
};

type CrumpleSnapshotProps = {
  children: ReactNode;
  className?: string;
};

export default function CrumpleSnapshot({
  children,
  className = "",
}: CrumpleSnapshotProps) {
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const [snapshot, setSnapshot] = useState("");
  const [contentSize, setContentSize] = useState<Size>({
    width: 1200,
    height: 760,
  });
  const [viewport, setViewport] = useState<Size>({
    width: 1920,
    height: 1080,
  });

  /* =========================================================
     VIEWPORT SIZE
  ========================================================= */
  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  /* =========================================================
     CAPTURE ABOUT SECTION AS IMAGE
  ========================================================= */
  useEffect(() => {
    const node = sourceRef.current;
    if (!node) return;

    let cancelled = false;

    const capture = async () => {
      const element = sourceRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();

      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      setContentSize({ width, height });

      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }

        const dataUrl = await toPng(element, {
          cacheBust: true,
          pixelRatio: 1.1,
          backgroundColor: "transparent",
        });

        if (!cancelled) {
          setSnapshot(dataUrl);
        }
      } catch (error) {
        console.error("Snapshot capture failed:", error);
      }
    };

    const scheduleCapture = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        capture();
      }, 250);
    };

    scheduleCapture();

    const observer = new ResizeObserver(() => {
      scheduleCapture();
    });

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  /* =========================================================
     STAGE + PAPER SIZE

     - full screen stage
     - paper slightly smaller so it has room to crumple
     - centered in viewport
  ========================================================= */
  const isMobile = viewport.width < 768;

  const paperScale = isMobile ? 0.88 : 0.76;

  const paperWidth = Math.round(contentSize.width * paperScale);
  const paperHeight = Math.round(contentSize.height * paperScale);

  const sceneHeight = Math.max(
    viewport.height,
    Math.round(contentSize.height * 1.25),
    isMobile ? 700 : 820
  );

  const stageHeight = Math.max(sceneHeight, viewport.height);

  /* =========================================================
     PAPER SETTINGS

     Reduced crumple strength a bit so it does not collapse too
     hard and look clipped.
  ========================================================= */
  const paperProps: PaperCrumpleProps = {
    src: snapshot,
    alt: "Interactive About Me paper",
    width: paperWidth,
    height: paperHeight,
    sceneHeight: sceneHeight,

    releaseBehavior: "restore",

    crumpleAmount: 0.92,
    crumpleDuration: 0.45,
    releaseDuration: 0.34,

    foldCount: 4,
    foldSharpness: 0.42,
    wrinkleDepth: 0.75,
    creaseStrength: 0.06,

    paperColor: "#ebe6dc",
    paperTexture: 0.035,

    draggable: true,
    returnToOrigin: true,

    imageFit: "contain",

    roughness: 0.9,
    lightIntensity: 1.15,
    lightAngle: -28,

    shadow: false,
    shadowOpacity: 0,

    dragRotation: isMobile ? 3.2 : 4,
    dragRadius: isMobile ? 24 : 34,

    rotation: 0,
    seed: 7,
    detail: 26,
    disabled: false,

    className: "opacity-[0.99]",
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        minHeight: `${stageHeight}px`,
      }}
    >
      {/* Hidden source used for snapshot */}
      <div
        ref={sourceRef}
        className={
          snapshot
            ? "pointer-events-none absolute left-0 top-0 opacity-0"
            : "relative opacity-100"
        }
      >
        {children}
      </div>

      {/* Full-screen centered 3D stage */}
      {snapshot && (
        <div
          className="
            absolute
            left-1/2
            top-0
            z-20
            w-screen
            max-w-none
            -translate-x-1/2
            overflow-visible
          "
          style={{
            height: `${stageHeight}px`,
          }}
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              w-full
              -translate-x-1/2
              -translate-y-1/2
              overflow-visible
            "
            style={{
              height: `${sceneHeight}px`,
            }}
          >
            <PaperCrumple {...paperProps} />
          </div>
        </div>
      )}

      {!snapshot && (
        <div
          className="
            pointer-events-none
            absolute
            bottom-4
            left-1/2
            z-30
            -translate-x-1/2
            whitespace-nowrap
            font-mono
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/20
          "
        >
          preparing interactive paper...
        </div>
      )}
    </div>
  );
}