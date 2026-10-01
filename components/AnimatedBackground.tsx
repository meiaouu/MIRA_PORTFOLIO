"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const SYMBOLS = [
  "</>",
  "{ }",
  "( )",
  "=>",
  ";",
  "#!",
  "&&",
  "[]",
  "</",
  "/>",
  "const",
  "npm",
  "git",
  "TS",
  "JS",
  "PY",
  "==",
  "λ",
  "0x",
  "01",
];

const IMAGES = [
  "/images/tech-1.png",
  "/images/tech-2.png",
  "/images/tech-3.png",
  "/images/tech-4.png",
];

interface FloatingItem {
  id: number;
  symbol: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotation: number;
  opacity: number;
}

interface FloatingImage {
  id: number;
  src: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotation: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  count?: number;
  className?: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function generateSymbols(count: number): FloatingItem[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (offset: number) => seededRandom(i * 100 + offset);

    return {
      id: i,

      symbol: SYMBOLS[
        Math.floor(r(1) * SYMBOLS.length)
      ],

      left: r(2) * 100,

      top: r(3) * 100,

      size: 0.75 + r(4) * 0.9,

      duration: 14 + r(5) * 12,

      delay: r(6) * -20,

      driftX: -18 + r(7) * 36,

      driftY: -14 + r(8) * 28,

      rotation: -8 + r(9) * 16,

      opacity: 0.045 + r(10) * 0.08,
    };
  });
}

function generateImages(): FloatingImage[] {
  return IMAGES.map((src, i) => {
    const r = (offset: number) => seededRandom((i + 50) * 100 + offset);

    return {
      id: i,

      src,

      left: 8 + r(1) * 84,

      top: 10 + r(2) * 75,

      size: 45 + r(3) * 35,

      duration: 18 + r(4) * 8,

      delay: r(5) * -15,

      driftX: -12 + r(6) * 24,

      driftY: -10 + r(7) * 20,

      rotation: -5 + r(8) * 10,

      opacity: 0.055 + r(9) * 0.08,
    };
  });
}

export default function AnimatedBackground({
  count = 22,
  className = "",
}: AnimatedBackgroundProps) {
  const symbols = useMemo(
    () => generateSymbols(count),
    [count]
  );

  const images = useMemo(
    () => generateImages(),
    []
  );

  /*
   * ============================================================
   * SCROLL PHYSICS
   * ============================================================
   */

  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    mass: 0.8,
  });

  /*
   * Black hole travels vertically as the page scrolls.
   *
   * Change these values to control the movement:
   *
   * 0% scroll  -> -30px
   * 100% scroll -> 260px
   */
  const blackHoleY = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [-30, 100, 260]
  );

  /*
   * Slight horizontal gravitational drift.
   */
  const blackHoleX = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [0, -25, 20]
  );

  /*
   * Very subtle scale change while scrolling.
   */
  const blackHoleScale = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [1, 1.06, 0.98]
  );

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        ${className}
      `}
    >
      {/* ========================================================
          DARK PURPLE BASE
      ======================================================== */}

      <div className="absolute inset-0 bg-[#08050f]" />

      {/* ========================================================
          LARGE PURPLE ATMOSPHERIC GLOW
      ======================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[800px]
          w-[800px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-700/[0.045]
          blur-[180px]
          animate-purple-breathe
        "
      />

      {/* ========================================================
          SECONDARY PURPLE GLOW
      ======================================================== */}

      <div
        className="
          absolute
          left-[15%]
          top-[25%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-fuchsia-700/[0.025]
          blur-[150px]
          animate-purple-orbit
        "
      />

      {/* ========================================================
          SUBTLE AMBIENT LIGHT
      ======================================================== */}

      <div className="ambient-light ambient-light-one" />
      <div className="ambient-light ambient-light-two" />

      {/* ========================================================
          FUTURISTIC GRID
      ======================================================== */}

      <div className="absolute inset-0 futuristic-grid" />

      {/* ========================================================
          REALISTIC BLACK HOLE
      ======================================================== */}

      <motion.div
        className="black-hole-container"
        style={{
          x: blackHoleX,
          y: blackHoleY,
          scale: blackHoleScale,
        }}
      >
        {/* --------------------------------------------------------
            DEEP GRAVITATIONAL FIELD
        -------------------------------------------------------- */}

        <div className="black-hole-gravity" />

        {/* --------------------------------------------------------
            OUTER SPACE DISTORTION
        -------------------------------------------------------- */}

        <div className="black-hole-haze" />

        <div className="black-hole-lensing" />

        {/* --------------------------------------------------------
            BACK SIDE OF ACCRETION DISK
        -------------------------------------------------------- */}

        <div className="disk-back-glow" />

        <div className="disk-back">
          <div className="disk-back-ring" />
        </div>

        {/* --------------------------------------------------------
            MAIN ACCRETION DISK
        -------------------------------------------------------- */}

        <div className="accretion-disk">
          <div className="disk-energy" />

          <div className="accretion-ring ring-outer" />
          <div className="accretion-ring ring-middle" />
          <div className="accretion-ring ring-inner" />

          {/* Rotating gas */}
          <div className="gas-cloud gas-cloud-one" />
          <div className="gas-cloud gas-cloud-two" />
          <div className="gas-cloud gas-cloud-three" />
          <div className="gas-cloud gas-cloud-four" />
          <div className="gas-cloud gas-cloud-five" />

          {/* Thin turbulent streams */}
          <div className="gas-stream gas-one" />
          <div className="gas-stream gas-two" />
          <div className="gas-stream gas-three" />
          <div className="gas-stream gas-four" />
          <div className="gas-stream gas-five" />
          <div className="gas-stream gas-six" />
        </div>

        {/* --------------------------------------------------------
            GRAVITATIONAL WARP ABOVE
        -------------------------------------------------------- */}

        <div className="black-hole-lens-top" />

        {/* --------------------------------------------------------
            EVENT HORIZON
        -------------------------------------------------------- */}

        <div className="event-horizon">
          <div className="event-horizon-shadow" />

          <div className="event-horizon-inner" />

          <div className="black-hole-center" />
        </div>

        {/* --------------------------------------------------------
            PHOTON RING
        -------------------------------------------------------- */}

        <div className="photon-ring photon-ring-one" />
        <div className="photon-ring photon-ring-two" />

        {/* --------------------------------------------------------
            BRIGHT INNER RING
        -------------------------------------------------------- */}

        <div className="inner-hot-ring" />

        {/* --------------------------------------------------------
            LOWER GRAVITATIONAL LENS
        -------------------------------------------------------- */}

        <div className="black-hole-lens-bottom" />

        {/* --------------------------------------------------------
            FORWARD LIGHT STREAKS
        -------------------------------------------------------- */}

        <div className="light-streak streak-one" />
        <div className="light-streak streak-two" />
        <div className="light-streak streak-three" />
      </motion.div>

      {/* ========================================================
          FLOATING CODE SYMBOLS
      ======================================================== */}

      {symbols.map((item) => (
        <span
          key={item.id}
          className="
            floating-code
            absolute
            font-mono
            font-semibold
            text-violet-300
          "
          style={
            {
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: `${item.size}rem`,
              opacity: item.opacity,

              "--drift-x": `${item.driftX}px`,
              "--drift-y": `${item.driftY}px`,
              "--rotation": `${item.rotation}deg`,

              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            } as React.CSSProperties
          }
        >
          {item.symbol}
        </span>
      ))}

      {/* ========================================================
          FLOATING TECH IMAGES
      ======================================================== */}

      {images.map((item) => (
        <div
          key={item.id}
          className="futuristic-image"
          style={
            {
              left: `${item.left}%`,
              top: `${item.top}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: item.opacity,

              "--drift-x": `${item.driftX}px`,
              "--drift-y": `${item.driftY}px`,
              "--rotation": `${item.rotation}deg`,

              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            } as React.CSSProperties
          }
        >
          <div
            className="
              relative
              h-full
              w-full
              overflow-hidden
              rounded-xl
              border
              border-violet-400/15
              bg-purple-950/10
              backdrop-blur-sm
              shadow-[0_0_25px_rgba(124,58,237,0.05)]
            "
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="100px"
              className="
                object-cover
                opacity-70
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-violet-400/10
                via-transparent
                to-fuchsia-500/10
              "
            />

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-px
                bg-violet-300/30
                scan-line
              "
            />

            {/* Corner markers */}

            <div className="absolute left-1 top-1 h-2 w-2 border-l border-t border-violet-300/30" />

            <div className="absolute right-1 top-1 h-2 w-2 border-r border-t border-violet-300/30" />

            <div className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-violet-300/30" />

            <div className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-violet-300/30" />
          </div>
        </div>
      ))}

      {/* ========================================================
          ANIMATIONS
      ======================================================== */}

      <style jsx>{`

        /* ========================================================
           PURPLE ATMOSPHERE
        ======================================================== */

        @keyframes purpleBreathe {
          0%,
          100% {
            opacity: 0.3;
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            opacity: 0.55;
            transform:
              translate(-50%, -50%)
              scale(1.08);
          }
        }

        @keyframes purpleOrbit {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(45px, -25px, 0)
              scale(1.08);
          }
        }

        .animate-purple-breathe {
          animation:
            purpleBreathe
            12s
            ease-in-out
            infinite;
        }

        .animate-purple-orbit {
          animation:
            purpleOrbit
            16s
            ease-in-out
            infinite;
        }

        /* ========================================================
           AMBIENT LIGHT
        ======================================================== */

        .ambient-light {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(160px);
        }

        .ambient-light-one {
          left: -180px;
          top: 40%;
          background: rgba(76, 29, 149, 0.035);
          animation: ambientOne 18s ease-in-out infinite;
        }

        .ambient-light-two {
          right: -180px;
          top: 10%;
          background: rgba(126, 34, 206, 0.025);
          animation: ambientTwo 21s ease-in-out infinite;
        }

        @keyframes ambientOne {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-100px) scale(1.15);
          }
        }

        @keyframes ambientTwo {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(120px) scale(1.1);
          }
        }

        /* ========================================================
           FUTURISTIC GRID
        ======================================================== */

        .futuristic-grid {
          background-image:
            linear-gradient(
              rgba(139, 92, 246, 0.025)
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.025)
              1px,
              transparent 1px
            );

          background-size:
            50px 50px,
            50px 50px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 12%,
              black 88%,
              transparent
            );
        }

        /* ========================================================
           BLACK HOLE CONTAINER
        ======================================================== */

        .black-hole-container {
          position: absolute;

          /*
           * BLACK HOLE POSITION
           *
           * Move left/right:
           * left: 20%;
           *
           * Move up/down:
           * top: 50%;
           */

          left: 20%;
          top: 50%;

          /*
           * BIGGER BLACK HOLE
           */

          width: 700px;
          height: 500px;

          transform:
            translate(-50%, -50%);

          opacity: 0.9;

          pointer-events: none;

          z-index: 1;

          transform-origin: center center;

          will-change:
            transform;
        }

        /* ========================================================
           GRAVITATIONAL FIELD
        ======================================================== */

        .black-hole-gravity {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 650px;
          height: 400px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(124, 58, 237, 0.08) 0%,
              rgba(91, 33, 182, 0.04) 35%,
              rgba(0, 0, 0, 0) 72%
            );

          filter: blur(45px);

          animation:
            gravityPulse
            8s
            ease-in-out
            infinite;
        }

        @keyframes gravityPulse {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              scale(1);
            opacity: 0.55;
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.08);
            opacity: 0.9;
          }
        }

        /* ========================================================
           BLACK HOLE HAZE
        ======================================================== */

        .black-hole-haze {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 620px;
          height: 350px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(124, 58, 237, 0.13) 0%,
              rgba(76, 29, 149, 0.07) 35%,
              transparent 70%
            );

          filter: blur(40px);

          animation:
            hazePulse
            9s
            ease-in-out
            infinite;
        }

        @keyframes hazePulse {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.07);
          }
        }

        /* ========================================================
           GRAVITATIONAL LENSING
        ======================================================== */

        .black-hole-lensing {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 470px;
          height: 310px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              transparent 37%,
              rgba(255, 255, 255, 0.025) 42%,
              rgba(196, 181, 253, 0.08) 48%,
              rgba(124, 58, 237, 0.055) 55%,
              transparent 70%
            );

          filter: blur(8px);

          animation:
            lensing
            7s
            ease-in-out
            infinite;
        }

        @keyframes lensing {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.035);
          }
        }

        /* ========================================================
           BACK SIDE OF DISK
        ======================================================== */

        .disk-back {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 520px;
          height: 130px;

          transform:
            translate(-50%, -50%)
            rotate(-3deg);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              transparent 25%,
              rgba(109, 40, 217, 0.12) 35%,
              rgba(124, 58, 237, 0.16) 50%,
              transparent 75%
            );

          filter: blur(4px);

          animation:
            backDiskSpin
            18s
            linear
            infinite;
        }

        .disk-back-ring {
          position: absolute;

          inset: 18px;

          border-radius: 50%;

          border:
            2px solid
            rgba(167, 139, 250, 0.1);
        }

        @keyframes backDiskSpin {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              rotate(-3deg)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(-3deg)
              scaleX(1.05);
          }
        }

        /* ========================================================
           MAIN ACCRETION DISK
        ======================================================== */

        .accretion-disk {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 570px;
          height: 170px;

          transform:
            translate(-50%, -50%)
            rotate(-5deg);

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,

              transparent 17%,

              rgba(255, 255, 255, 0.025) 20%,

              rgba(221, 214, 254, 0.1) 27%,

              rgba(196, 181, 253, 0.2) 34%,

              rgba(139, 92, 246, 0.28) 41%,

              rgba(124, 58, 237, 0.2) 48%,

              rgba(91, 33, 182, 0.12) 57%,

              rgba(76, 29, 149, 0.06) 65%,

              transparent 78%
            );

          filter:
            blur(1.5px);

          animation:
            diskBreathing
            8s
            ease-in-out
            infinite;

          z-index: 5;
        }

        @keyframes diskBreathing {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              rotate(-5deg)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(-5deg)
              scale(1.035);
          }
        }

        /* ========================================================
           DISK ENERGY
        ======================================================== */

        .disk-energy {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 500px;
          height: 125px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            conic-gradient(
              from 0deg,
              transparent,
              rgba(139, 92, 246, 0.1),
              rgba(221, 214, 254, 0.22),
              rgba(124, 58, 237, 0.1),
              transparent,
              rgba(167, 139, 250, 0.14),
              transparent
            );

          filter: blur(5px);

          animation:
            energyRotate
            7s
            linear
            infinite;
        }

        @keyframes energyRotate {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }
        }

        /* ========================================================
           ACCRETION RINGS
        ======================================================== */

        .accretion-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          transform:
            translate(-50%, -50%);

          pointer-events: none;
        }

        .ring-outer {
          width: 555px;
          height: 130px;

          border:
            2px solid
            rgba(124, 58, 237, 0.14);

          box-shadow:
            0 0 25px
            rgba(124, 58, 237, 0.08);

          animation:
            ringOuter
            11s
            linear
            infinite;
        }

        .ring-middle {
          width: 450px;
          height: 105px;

          border:
            2px solid
            rgba(196, 181, 253, 0.15);

          filter: blur(1px);

          animation:
            ringMiddle
            7s
            linear
            infinite;
        }

        .ring-inner {
          width: 320px;
          height: 75px;

          border:
            3px solid
            rgba(237, 233, 254, 0.2);

          filter: blur(1.5px);

          animation:
            ringInner
            4s
            linear
            infinite;
        }

        @keyframes ringOuter {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(180deg)
              scaleX(1.035);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              scaleX(1);
          }
        }

        @keyframes ringMiddle {
          from {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(180deg)
              scaleX(0.96);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              scaleX(1);
          }
        }

        @keyframes ringInner {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(180deg)
              scaleX(1.06);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              scaleX(1);
          }
        }

        /* ========================================================
           HOT GAS CLOUDS
        ======================================================== */

        .gas-cloud {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(255, 255, 255, 0.32),
              rgba(196, 181, 253, 0.18) 25%,
              rgba(124, 58, 237, 0.08) 50%,
              transparent 72%
            );

          filter: blur(8px);

          transform-origin: center;
        }

        .gas-cloud-one {
          width: 230px;
          height: 25px;

          animation:
            cloudOne
            5s
            linear
            infinite;
        }

        .gas-cloud-two {
          width: 180px;
          height: 20px;

          animation:
            cloudTwo
            4s
            linear
            infinite;
        }

        .gas-cloud-three {
          width: 260px;
          height: 18px;

          animation:
            cloudThree
            6s
            linear
            infinite;
        }

        .gas-cloud-four {
          width: 150px;
          height: 16px;

          animation:
            cloudFour
            3.5s
            linear
            infinite;
        }

        .gas-cloud-five {
          width: 200px;
          height: 15px;

          animation:
            cloudFive
            4.5s
            linear
            infinite;
        }

        @keyframes cloudOne {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              translateX(40px);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              translateX(40px);
          }
        }

        @keyframes cloudTwo {
          from {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              translateX(65px);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              translateX(65px);
          }
        }

        @keyframes cloudThree {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              translateX(85px);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              translateX(85px);
          }
        }

        @keyframes cloudFour {
          from {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              translateX(100px);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              translateX(100px);
          }
        }

        @keyframes cloudFive {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg)
              translateX(115px);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg)
              translateX(115px);
          }
        }

        /* ========================================================
           GAS STREAMS
        ======================================================== */

        .gas-stream {
          position: absolute;

          left: 50%;
          top: 50%;

          height: 2px;

          border-radius: 999px;

          transform-origin: left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.45),
              rgba(196, 181, 253, 0.55),
              rgba(124, 58, 237, 0.25),
              transparent
            );

          filter: blur(1px);
        }

        .gas-one {
          width: 450px;

          animation:
            gasOne
            4s
            linear
            infinite;
        }

        .gas-two {
          width: 380px;

          animation:
            gasTwo
            5s
            linear
            infinite;
        }

        .gas-three {
          width: 500px;

          animation:
            gasThree
            6s
            linear
            infinite;
        }

        .gas-four {
          width: 330px;

          animation:
            gasFour
            3.8s
            linear
            infinite;
        }

        .gas-five {
          width: 420px;

          animation:
            gasFive
            5.5s
            linear
            infinite;
        }

        .gas-six {
          width: 280px;

          animation:
            gasSix
            3.2s
            linear
            infinite;
        }

        @keyframes gasOne {
          0%,
          100% {
            transform:
              translate(-5%, -50%)
              rotate(4deg)
              scaleX(0.8);
            opacity: 0.15;
          }

          50% {
            transform:
              translate(-5%, -50%)
              rotate(4deg)
              scaleX(1.1);
            opacity: 0.65;
          }
        }

        @keyframes gasTwo {
          0%,
          100% {
            transform:
              translate(-5%, -50%)
              rotate(-8deg)
              scaleX(1);
            opacity: 0.2;
          }

          50% {
            transform:
              translate(-5%, -50%)
              rotate(-8deg)
              scaleX(0.75);
            opacity: 0.6;
          }
        }

        @keyframes gasThree {
          0%,
          100% {
            transform:
              translate(-5%, -50%)
              rotate(9deg)
              scaleX(0.75);
            opacity: 0.12;
          }

          50% {
            transform:
              translate(-5%, -50%)
              rotate(9deg)
              scaleX(1.15);
            opacity: 0.5;
          }
        }

        @keyframes gasFour {
          0%,
          100% {
            transform:
              translate(-5%, -50%)
              rotate(-13deg)
              scaleX(1);
            opacity: 0.12;
          }

          50% {
            transform:
              translate(-5%, -50%)
              rotate(-13deg)
              scaleX(0.7);
            opacity: 0.5;
          }
        }

        @keyframes gasFive {
          0%,
          100% {
            transform:
              translate(-5%, -50%)
              rotate(15deg)
              scaleX(0.75);
            opacity: 0.12;
          }

          50% {
            transform:
              translate(-5%, -50%)
              rotate(15deg)
              scaleX(1.1);
            opacity: 0.45;
          }
        }

        @keyframes gasSix {
          0%,
          100% {
            transform:
              translate(-5%, -50%)
              rotate(-18deg)
              scaleX(0.7);
            opacity: 0.1;
          }

          50% {
            transform:
              translate(-5%, -50%)
              rotate(-18deg)
              scaleX(1.2);
            opacity: 0.4;
          }
        }

        /* ========================================================
           WARPED LIGHT ABOVE BLACK HOLE
        ======================================================== */

        .black-hole-lens-top {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 330px;
          height: 180px;

          transform:
            translate(-50%, -72%);

          border-radius:
            50% 50% 35% 35%;

          background:
            radial-gradient(
              ellipse at center bottom,
              transparent 25%,
              rgba(255, 255, 255, 0.08) 34%,
              rgba(221, 214, 254, 0.18) 42%,
              rgba(167, 139, 250, 0.18) 49%,
              rgba(124, 58, 237, 0.07) 60%,
              transparent 72%
            );

          filter: blur(2px);

          animation:
            lensTop
            7s
            ease-in-out
            infinite;

          z-index: 7;
        }

        @keyframes lensTop {
          0%,
          100% {
            transform:
              translate(-50%, -72%)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -72%)
              scaleX(1.08);
          }
        }

        /* ========================================================
           EVENT HORIZON
        ======================================================== */

        .event-horizon {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 190px;
          height: 190px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #000 0%,
              #000 58%,
              #020104 68%,
              rgba(7, 3, 14, 0.98) 74%,
              transparent 79%
            );

          box-shadow:
            0 0 35px
            rgba(0, 0, 0, 1),

            0 0 70px
            rgba(0, 0, 0, 0.95),

            0 0 100px
            rgba(76, 29, 149, 0.12);

          z-index: 20;

          animation:
            eventHorizonPulse
            6s
            ease-in-out
            infinite;
        }

        .event-horizon-shadow {
          position: absolute;

          inset: -20px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              transparent 55%,
              rgba(0, 0, 0, 0.75) 65%,
              transparent 75%
            );

          filter: blur(5px);
        }

        .event-horizon-inner {
          position: absolute;

          inset: 20px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #000 0%,
              #000 78%,
              #020104 100%
            );

          box-shadow:
            inset 0 0 45px
            rgba(0, 0, 0, 1);
        }

        .black-hole-center {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 12px;
          height: 12px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background: #000;

          box-shadow:
            0 0 25px
            rgba(0, 0, 0, 1);
        }

        @keyframes eventHorizonPulse {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.025);
          }
        }

        /* ========================================================
           PHOTON RING
        ======================================================== */

        .photon-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          transform:
            translate(-50%, -50%);

          z-index: 19;
        }

        .photon-ring-one {
          width: 215px;
          height: 215px;

          border:
            2px solid
            rgba(221, 214, 254, 0.22);

          box-shadow:
            0 0 8px
            rgba(221, 214, 254, 0.16),

            0 0 25px
            rgba(139, 92, 246, 0.13);

          animation:
            photonOne
            5s
            ease-in-out
            infinite;
        }

        .photon-ring-two {
          width: 235px;
          height: 235px;

          border:
            1px solid
            rgba(139, 92, 246, 0.12);

          filter: blur(3px);

          animation:
            photonTwo
            8s
            ease-in-out
            infinite;
        }

        @keyframes photonOne {
          0%,
          100% {
            opacity: 0.35;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            opacity: 0.9;

            transform:
              translate(-50%, -50%)
              scale(1.035);
          }
        }

        @keyframes photonTwo {
          0%,
          100% {
            opacity: 0.2;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            opacity: 0.6;

            transform:
              translate(-50%, -50%)
              scale(1.06);
          }
        }

        /* ========================================================
           INNER HOT RING
        ======================================================== */

        .inner-hot-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 225px;
          height: 80px;

          transform:
            translate(-50%, -50%)
            rotate(-5deg);

          border-radius: 50%;

          border:
            2px solid
            rgba(255, 255, 255, 0.16);

          box-shadow:
            0 0 12px
            rgba(221, 214, 254, 0.16),

            0 0 30px
            rgba(124, 58, 237, 0.13);

          filter: blur(1px);

          z-index: 18;

          animation:
            innerHot
            4s
            linear
            infinite;
        }

        @keyframes innerHot {
          0% {
            transform:
              translate(-50%, -50%)
              rotate(-5deg)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(-5deg)
              scaleX(1.08);
          }

          100% {
            transform:
              translate(-50%, -50%)
              rotate(-5deg)
              scaleX(1);
          }
        }

        /* ========================================================
           LOWER GRAVITATIONAL LENS
        ======================================================== */

        .black-hole-lens-bottom {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 300px;
          height: 150px;

          transform:
            translate(-50%, -3%);

          border-radius:
            35% 35% 50% 50%;

          background:
            radial-gradient(
              ellipse at center top,
              transparent 25%,
              rgba(167, 139, 250, 0.12) 38%,
              rgba(124, 58, 237, 0.08) 50%,
              transparent 72%
            );

          filter: blur(3px);

          animation:
            lensBottom
            8s
            ease-in-out
            infinite;

          z-index: 6;
        }

        @keyframes lensBottom {
          0%,
          100% {
            transform:
              translate(-50%, -3%)
              scaleX(1);
          }

          50% {
            transform:
              translate(-50%, -3%)
              scaleX(1.07);
          }
        }

        /* ========================================================
           LIGHT STREAKS
        ======================================================== */

        .light-streak {
          position: absolute;

          left: 50%;
          top: 50%;

          height: 1px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(221, 214, 254, 0.25),
              transparent
            );

          filter: blur(1px);

          z-index: 8;
        }

        .streak-one {
          width: 450px;

          animation:
            streakOne
            5s
            ease-in-out
            infinite;
        }

        .streak-two {
          width: 350px;

          animation:
            streakTwo
            6s
            ease-in-out
            infinite;
        }

        .streak-three {
          width: 500px;

          animation:
            streakThree
            7s
            ease-in-out
            infinite;
        }

        @keyframes streakOne {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              rotate(-7deg)
              scaleX(0.7);

            opacity: 0.1;
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(-7deg)
              scaleX(1.1);

            opacity: 0.45;
          }
        }

        @keyframes streakTwo {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              rotate(8deg)
              scaleX(0.8);

            opacity: 0.08;
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(8deg)
              scaleX(1.15);

            opacity: 0.35;
          }
        }

        @keyframes streakThree {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              rotate(-13deg)
              scaleX(0.6);

            opacity: 0.05;
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(-13deg)
              scaleX(1.05);

            opacity: 0.3;
          }
        }

        /* ========================================================
           FLOATING CODE
        ======================================================== */

        .floating-code {
          animation-name: futuristicFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;

          will-change:
            transform,
            opacity;

          text-shadow:
            0 0 12px
            rgba(139, 92, 246, 0.15);
        }

        @keyframes futuristicFloat {
          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg)
              scale(1);
          }

          25% {
            transform:
              translate3d(
                calc(var(--drift-x) * 0.35),
                calc(var(--drift-y) * -0.5),
                0
              )
              rotate(calc(var(--rotation) * -0.4))
              scale(1.04);
          }

          50% {
            transform:
              translate3d(
                var(--drift-x),
                var(--drift-y),
                0
              )
              rotate(var(--rotation))
              scale(0.96);
          }

          75% {
            transform:
              translate3d(
                calc(var(--drift-x) * -0.3),
                calc(var(--drift-y) * 0.45),
                0
              )
              rotate(calc(var(--rotation) * 0.5))
              scale(1.03);
          }

          100% {
            transform:
              translate3d(0, 0, 0)
              rotate(0deg)
              scale(1);
          }
        }

        /* ========================================================
           FLOATING IMAGES
        ======================================================== */

        .futuristic-image {
          position: absolute;

          animation-name: futuristicFloat;

          animation-timing-function:
            ease-in-out;

          animation-iteration-count:
            infinite;

          will-change:
            transform;
        }

        /* ========================================================
           SCAN LINE
        ======================================================== */

        .scan-line {
          animation:
            scan
            4s
            linear
            infinite;
        }

        @keyframes scan {
          0% {
            transform:
              translateY(0);

            opacity: 0;
          }

          20% {
            opacity: 0.4;
          }

          80% {
            opacity: 0.4;
          }

          100% {
            transform:
              translateY(100px);

            opacity: 0;
          }
        }

        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 767px) {
          .black-hole-container {
            left: 50%;
            top: 72%;

            width: 460px;
            height: 340px;

            opacity: 0.6;
          }

          .black-hole-gravity {
            width: 430px;
            height: 270px;
          }

          .black-hole-haze {
            width: 430px;
            height: 250px;
          }

          .accretion-disk {
            width: 400px;
            height: 120px;
          }

          .ring-outer {
            width: 390px;
            height: 100px;
          }

          .ring-middle {
            width: 320px;
            height: 80px;
          }

          .ring-inner {
            width: 235px;
            height: 60px;
          }

          .event-horizon {
            width: 140px;
            height: 140px;
          }

          .photon-ring-one {
            width: 160px;
            height: 160px;
          }

          .photon-ring-two {
            width: 175px;
            height: 175px;
          }
        }

        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {
          .floating-code,
          .futuristic-image,
          .scan-line,
          .animate-purple-breathe,
          .animate-purple-orbit,
          .ambient-light,
          .black-hole-gravity,
          .black-hole-haze,
          .black-hole-lensing,
          .disk-back,
          .accretion-disk,
          .disk-energy,
          .accretion-ring,
          .gas-cloud,
          .gas-stream,
          .black-hole-lens-top,
          .event-horizon,
          .photon-ring,
          .inner-hot-ring,
          .black-hole-lens-bottom,
          .light-streak {
            animation: none !important;
          }
        }

      `}</style>
    </div>
  );
}