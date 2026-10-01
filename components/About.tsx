"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import Reveal from "./Reveal";
import { about, profile } from "@/data/portfolio";

/* =========================================================
   CONTENT
========================================================= */

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
  "Laravel",
  "MySQL",
  "Python",
  "React",
];

const interests = [
  "Web Development",
  "UI Design",
  "Creative Coding",
  "System Building",
  "Designing Interfaces",
];

const funFacts = [
  "I enjoy making websites look cute but functional.",
  "I like turning simple ideas into interactive systems.",
  "I prefer clean, modern, and slightly playful designs.",
  "I enjoy both frontend and backend development.",
];

const stars = [
  { left: "4%", top: "12%", size: 4, delay: "0s" },
  { left: "8%", top: "21%", size: 7, delay: "1s" },
  { left: "12%", top: "37%", size: 4, delay: "2s" },
  { left: "7%", top: "55%", size: 6, delay: ".5s" },
  { left: "14%", top: "72%", size: 4, delay: "1.5s" },
  { left: "18%", top: "88%", size: 7, delay: ".8s" },

  { left: "89%", top: "16%", size: 5, delay: ".3s" },
  { left: "93%", top: "29%", size: 7, delay: "1.8s" },
  { left: "87%", top: "43%", size: 4, delay: ".7s" },
  { left: "94%", top: "60%", size: 5, delay: "2.2s" },
  { left: "88%", top: "76%", size: 7, delay: "1.2s" },
  { left: "92%", top: "90%", size: 4, delay: ".4s" },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Pin({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`
        absolute
        z-30
        h-4
        w-4
        rounded-full
        border-2
        border-white/70
        bg-[#bd5d91]
        shadow-[0_3px_10px_rgba(0,0,0,.4)]
        ${className}
      `}
    />
  );
}

function Sticker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        border-2
        border-[#3d2a48]
        bg-[#ead9ef]
        px-3
        py-2
        text-center
        font-mono
        text-[10px]
        font-bold
        uppercase
        tracking-wide
        text-[#2d2133]
        shadow-[4px_4px_0_#89699c]
        transition
        duration-300
        hover:rotate-0
        hover:scale-110
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ABOUT
========================================================= */

export default function About() {
  const paperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: paperRef,
    offset: ["start 95%", "end 5%"],
  });

  /* =======================================================
     CRUMPLED BALL → OPEN PAPER → CRUMPLED BALL
  ======================================================= */

  /*
    ENTERING:

    0.00  = crushed paper ball outside left/bottom
    0.18  = bouncing toward screen
    0.38  = completely open

    LEAVING:

    0.62  = still open
    0.84  = crumpling again
    1.00  = thrown away right/top
  */

  /* =======================================================
     THROW MOVEMENT
  ======================================================= */

  const throwXRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22, 0.38, 0.62, 0.78, 0.88, 1],
    [
      -420,
      -220,
      35,
      0,

      0,
      -35,
      220,
      420,
    ]
  );

  const throwYRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22, 0.38, 0.62, 0.78, 0.88, 1],
    [
      240,
      100,
      -25,
      0,

      0,
      25,
      -100,
      -240,
    ]
  );

  /* =======================================================
     CRUMPLE SIZE

     Strong values = paper becomes very small like a ball.
  ======================================================= */

  const scaleXRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24, 0.38, 0.62, 0.76, 0.88, 1],
    [
      0.13,
      0.24,
      0.6,
      1,

      1,
      0.6,
      0.24,
      0.13,
    ]
  );

  const scaleYRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24, 0.38, 0.62, 0.76, 0.88, 1],
    [
      0.1,
      0.2,
      0.53,
      1,

      1,
      0.53,
      0.2,
      0.1,
    ]
  );

  /* =======================================================
     ROTATION / DISTORTION
  ======================================================= */

  const rotateRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.24, 0.38, 0.62, 0.76, 0.88, 1],
    [
      -55,
      -30,
      7,
      0,

      0,
      -7,
      30,
      55,
    ]
  );

  const skewXRaw = useTransform(
    scrollYProgress,
    [0, 0.18, 0.38, 0.62, 0.82, 1],
    [-24, -12, 0, 0, 12, 24]
  );

  const skewYRaw = useTransform(
    scrollYProgress,
    [0, 0.18, 0.38, 0.62, 0.82, 1],
    [18, 7, 0, 0, -7, -18]
  );

  /* =======================================================
     SPRINGS
     LOW DAMPING = THROW / BOUNCE
  ======================================================= */

  const throwX = useSpring(throwXRaw, {
    stiffness: 190,
    damping: 11,
    mass: 0.9,
  });

  const throwY = useSpring(throwYRaw, {
    stiffness: 190,
    damping: 11,
    mass: 0.9,
  });

  const rotate = useSpring(rotateRaw, {
    stiffness: 170,
    damping: 11,
    mass: 0.85,
  });

  /*
    Scale has higher damping so it doesn't bounce
    into a negative/inverted size.
  */

  const scaleX = useSpring(scaleXRaw, {
    stiffness: 150,
    damping: 18,
    mass: 0.8,
  });

  const scaleY = useSpring(scaleYRaw, {
    stiffness: 150,
    damping: 18,
    mass: 0.8,
  });

  const skewX = useSpring(skewXRaw, {
    stiffness: 150,
    damping: 14,
  });

  const skewY = useSpring(skewYRaw, {
    stiffness: 150,
    damping: 14,
  });

  /* =======================================================
     CRUMPLED SHAPE

     Every polygon has the SAME NUMBER of points so
     Framer Motion can interpolate smoothly.
  ======================================================= */

  const crumpledBall = `
    polygon(
      42% 0%,
      55% 4%,
      67% 7%,
      79% 15%,
      90% 27%,
      97% 40%,
      100% 52%,
      96% 65%,
      91% 77%,
      81% 89%,
      68% 96%,
      53% 100%,
      39% 97%,
      25% 92%,
      13% 83%,
      5% 71%,
      0% 57%,
      3% 43%,
      8% 29%,
      18% 16%,
      29% 8%,
      35% 4%,
      39% 1%,
      42% 0%
    )
  `;

  const halfCrumpled = `
    polygon(
      6% 4%,
      18% 1%,
      31% 4%,
      44% 0%,
      57% 4%,
      70% 1%,
      84% 5%,
      96% 12%,
      100% 27%,
      97% 43%,
      100% 59%,
      95% 76%,
      88% 91%,
      73% 97%,
      58% 100%,
      43% 97%,
      27% 100%,
      13% 94%,
      4% 83%,
      0% 68%,
      4% 51%,
      0% 34%,
      3% 18%,
      6% 4%
    )
  `;

  const flatPaper = `
    polygon(
      0% 0%,
      14% 0%,
      28% 0%,
      42% 0%,
      56% 0%,
      70% 0%,
      84% 0%,
      100% 0%,
      100% 17%,
      100% 34%,
      100% 51%,
      100% 68%,
      100% 85%,
      100% 100%,
      84% 100%,
      68% 100%,
      52% 100%,
      36% 100%,
      20% 100%,
      0% 100%,
      0% 80%,
      0% 60%,
      0% 40%,
      0% 20%
    )
  `;

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.62, 0.8, 1],
    [
      crumpledBall,
      halfCrumpled,
      flatPaper,
      flatPaper,
      halfCrumpled,
      crumpledBall,
    ]
  );

  /* =======================================================
     ROUNDED CRUSHED SHAPE
  ======================================================= */

  const paperRadius = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.62, 0.8, 1],
    [
      "42% 36% 44% 38% / 38% 46% 35% 48%",
      "18% 14% 17% 13% / 14% 19% 13% 17%",
      "6px 6px 6px 6px / 6px 6px 6px 6px",
      "6px 6px 6px 6px / 6px 6px 6px 6px",
      "18% 14% 17% 13% / 14% 19% 13% 17%",
      "42% 36% 44% 38% / 38% 46% 35% 48%",
    ]
  );

  /* =======================================================
     WRINKLES
  ======================================================= */

  const wrinkleOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.34, 0.42, 0.58, 0.66, 0.84, 1],
    [
      1,
      0.95,
      0.35,
      0.08,

      0.08,
      0.35,
      0.95,
      1,
    ]
  );

  const wrinkleScale = useTransform(
    scrollYProgress,
    [0, 0.38, 0.62, 1],
    [2.3, 1, 1, 2.3]
  );

  const wrinkleRotate = useTransform(
    scrollYProgress,
    [0, 0.38, 0.62, 1],
    [-12, 0, 0, 12]
  );

  /* =======================================================
     PAPER LIGHT / DARK
  ======================================================= */

  const paperFilter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.62, 0.8, 1],
    [
      "brightness(.52) contrast(1.35) saturate(.75)",
      "brightness(.72) contrast(1.18) saturate(.85)",
      "brightness(1) contrast(1) saturate(1)",
      "brightness(1) contrast(1) saturate(1)",
      "brightness(.72) contrast(1.18) saturate(.85)",
      "brightness(.52) contrast(1.35) saturate(.75)",
    ]
  );

  const paperShadow = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.62, 0.8, 1],
    [
      "0 45px 55px rgba(0,0,0,.9)",
      "0 55px 100px rgba(0,0,0,.72)",
      "0 30px 70px rgba(0,0,0,.38)",
      "0 30px 70px rgba(0,0,0,.38)",
      "0 55px 100px rgba(0,0,0,.72)",
      "0 45px 55px rgba(0,0,0,.9)",
    ]
  );

  /*
    Extra dark center when compressed.
  */

  const crushShadowOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.4, 0.6, 0.78, 1],
    [0.85, 0.55, 0, 0, 0.55, 0.85]
  );

  /* =======================================================
     BACKGROUND PARALLAX
  ======================================================= */

  const sideY1 = useTransform(
    scrollYProgress,
    [0, 1],
    [80, -80]
  );

  const sideY2 = useTransform(
    scrollYProgress,
    [0, 1],
    [-70, 80]
  );

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* ===================================================
          GALAXY BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* LEFT NEBULA */}

        <motion.div
          style={{ y: sideY1 }}
          className="
            nebula
            nebula-left
            absolute
            -left-[160px]
            top-[18%]
            h-[520px]
            w-[520px]
            rounded-full
            blur-[100px]
          "
        />

        {/* RIGHT NEBULA */}

        <motion.div
          style={{ y: sideY2 }}
          className="
            nebula
            nebula-right
            absolute
            -right-[170px]
            top-[45%]
            h-[570px]
            w-[570px]
            rounded-full
            blur-[110px]
          "
        />

        {/* GALAXY STREAM */}

        <div
          className="
            galaxy-stream
            absolute
            left-[-15%]
            top-[42%]
            h-[180px]
            w-[130%]
            rotate-[-12deg]
            blur-[55px]
          "
        />

        {/* STARS */}

        {stars.map((star, index) => (
          <span
            key={index}
            className="star-dot absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}

        {/* LEFT SPARKLES */}

        <motion.div
          style={{ y: sideY1 }}
          className="absolute left-[5%] top-[18%] hidden lg:block"
        >
          <span className="sparkle block text-3xl text-[#dcbcff]">
            ✦
          </span>

          <span className="sparkle ml-16 mt-20 block text-xl text-[#ba81d4]">
            ✧
          </span>

          <span className="sparkle -ml-4 mt-24 block text-2xl text-[#f0d7ff]">
            ★
          </span>
        </motion.div>

        {/* RIGHT SPARKLES */}

        <motion.div
          style={{ y: sideY2 }}
          className="absolute right-[5%] top-[52%] hidden lg:block"
        >
          <span className="sparkle block text-3xl text-[#d6a8e7]">
            ✦
          </span>

          <span className="sparkle -ml-12 mt-20 block text-xl text-[#b774b5]">
            ☆
          </span>

          <span className="sparkle ml-10 mt-24 block text-xl text-[#edd2ff]">
            ✧
          </span>
        </motion.div>

        {/* SHOOTING STARS */}

        <div className="shooting-star absolute left-[8%] top-[15%]" />

        <div
          className="shooting-star absolute right-[10%] top-[56%]"
          style={{
            animationDelay: "3.5s",
          }}
        />
      </div>

      {/* ===================================================
          ABOUT PAPER
      =================================================== */}

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div
            ref={paperRef}
            className="relative"
          >
  

            {/* =================================================
                CRUMPLED / THROWN PAPER
            ================================================= */}

            <motion.div
              style={{
                x: throwX,
                y: throwY,

                scaleX,
                scaleY,

                rotate,
                skewX,
                skewY,

                clipPath,
                borderRadius: paperRadius,

                boxShadow: paperShadow,
                filter: paperFilter,

                transformOrigin: "50% 50%",
                willChange:
                  "transform, clip-path, filter, border-radius",
              }}
              className="relative"
            >
              <div
                className="
                  paper-card
                  relative
                  overflow-hidden
                  bg-[#f0ebf2]
                  p-5
                  text-[#221828]
                  sm:p-8
                  lg:p-10
                "
              >
                {/* =============================================
                    PAPER GRAIN
                ============================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.06]
                  "
                  style={{
                    backgroundImage:
                      "radial-gradient(#000 0.7px, transparent 0.7px)",
                    backgroundSize: "6px 6px",
                  }}
                />

                {/* =============================================
                    DARK CRUSH CENTER

                    Makes the tiny paper ball look more dense.
                ============================================= */}

                <motion.div
                  style={{
                    opacity: crushShadowOpacity,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    inset-[8%]
                    z-40
                    rounded-[45%]
                    bg-[radial-gradient(circle_at_50%_50%,rgba(25,17,29,.48),rgba(71,49,78,.2)_38%,transparent_72%)]
                    blur-[8px]
                  "
                />

                {/* =============================================
                    STRONG CRUMPLE WRINKLES
                ============================================= */}

                <motion.div
                  style={{
                    opacity: wrinkleOpacity,
                    scale: wrinkleScale,
                    rotate: wrinkleRotate,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-40
                    origin-center
                  "
                >
                  {/* MAIN DARK FOLD */}

                  <div
                    className="
                      absolute
                      left-[-5%]
                      top-[12%]
                      h-[5px]
                      w-[70%]
                      rotate-[24deg]
                      bg-gradient-to-r
                      from-transparent
                      via-black/50
                      to-transparent
                      blur-[1px]
                    "
                  />

                  {/* MAIN HIGHLIGHT */}

                  <div
                    className="
                      absolute
                      left-[-4%]
                      top-[13%]
                      h-[15px]
                      w-[70%]
                      rotate-[24deg]
                      bg-gradient-to-b
                      from-white/35
                      to-transparent
                      blur-[4px]
                    "
                  />

                  {/* RIGHT DARK FOLD */}

                  <div
                    className="
                      absolute
                      right-[-7%]
                      top-[22%]
                      h-[5px]
                      w-[66%]
                      rotate-[-27deg]
                      bg-gradient-to-r
                      from-transparent
                      via-black/50
                      to-transparent
                      blur-[1px]
                    "
                  />

                  <div
                    className="
                      absolute
                      right-[-5%]
                      top-[23%]
                      h-[12px]
                      w-[66%]
                      rotate-[-27deg]
                      bg-gradient-to-b
                      from-white/30
                      to-transparent
                      blur-[3px]
                    "
                  />

                  {/* CENTER CREASE */}

                  <div
                    className="
                      absolute
                      left-[3%]
                      top-[45%]
                      h-[5px]
                      w-[93%]
                      rotate-[11deg]
                      bg-gradient-to-r
                      from-transparent
                      via-black/45
                      to-transparent
                      blur-[1px]
                    "
                  />

                  <div
                    className="
                      absolute
                      left-[7%]
                      top-[46%]
                      h-[13px]
                      w-[85%]
                      rotate-[11deg]
                      bg-gradient-to-b
                      from-white/30
                      to-transparent
                      blur-[3px]
                    "
                  />

                  {/* LOWER RIGHT */}

                  <div
                    className="
                      absolute
                      right-[-6%]
                      top-[61%]
                      h-[5px]
                      w-[75%]
                      rotate-[-17deg]
                      bg-gradient-to-r
                      from-transparent
                      via-black/50
                      to-transparent
                      blur-[1px]
                    "
                  />

                  {/* BOTTOM LEFT */}

                  <div
                    className="
                      absolute
                      bottom-[14%]
                      left-[-8%]
                      h-[5px]
                      w-[78%]
                      rotate-[20deg]
                      bg-gradient-to-r
                      from-transparent
                      via-black/45
                      to-transparent
                      blur-[1px]
                    "
                  />

                  {/* VERTICAL CRUSH */}

                  <div
                    className="
                      absolute
                      left-[43%]
                      top-[-8%]
                      h-[110%]
                      w-[5px]
                      rotate-[7deg]
                      bg-gradient-to-b
                      from-transparent
                      via-black/45
                      to-transparent
                      blur-[1px]
                    "
                  />

                  <div
                    className="
                      absolute
                      right-[25%]
                      top-[-5%]
                      h-[105%]
                      w-[4px]
                      rotate-[-13deg]
                      bg-gradient-to-b
                      from-transparent
                      via-black/35
                      to-transparent
                      blur-[1px]
                    "
                  />

                  {/* FACET 1 */}

                  <div
                    className="
                      absolute
                      left-[8%]
                      top-[20%]
                      h-[120px]
                      w-[170px]
                      rotate-[15deg]
                      bg-[linear-gradient(135deg,rgba(255,255,255,.32),rgba(40,26,47,.14),transparent_72%)]
                      [clip-path:polygon(0_10%,100%_0,67%_100%,13%_77%)]
                    "
                  />

                  {/* FACET 2 */}

                  <div
                    className="
                      absolute
                      right-[5%]
                      top-[31%]
                      h-[140px]
                      w-[200px]
                      rotate-[-17deg]
                      bg-[linear-gradient(145deg,rgba(34,22,40,.15),rgba(255,255,255,.28),transparent_75%)]
                      [clip-path:polygon(12%_0,100%_21%,81%_100%,0_72%)]
                    "
                  />

                  {/* FACET 3 */}

                  <div
                    className="
                      absolute
                      bottom-[11%]
                      left-[23%]
                      h-[150px]
                      w-[220px]
                      rotate-[10deg]
                      bg-[linear-gradient(155deg,rgba(255,255,255,.28),rgba(39,25,46,.16),transparent_70%)]
                      [clip-path:polygon(8%_7%,93%_0,100%_68%,30%_100%)]
                    "
                  />

                  {/* FACET 4 */}

                  <div
                    className="
                      absolute
                      right-[20%]
                      top-[7%]
                      h-[110px]
                      w-[150px]
                      rotate-[21deg]
                      bg-[linear-gradient(120deg,rgba(255,255,255,.35),rgba(36,24,43,.16),transparent_73%)]
                      [clip-path:polygon(0_21%,75%_0,100%_77%,25%_100%)]
                    "
                  />

                  {/* CRUSHED DARK SPOTS */}

                  <div
                    className="
                      absolute
                      left-[18%]
                      top-[30%]
                      h-28
                      w-28
                      rounded-full
                      bg-black/15
                      blur-2xl
                    "
                  />

                  <div
                    className="
                      right-[13%]
                      top-[47%]
                      absolute
                      h-32
                      w-32
                      rounded-full
                      bg-black/15
                      blur-2xl
                    "
                  />

                  {/* HIGHLIGHT SPOTS */}

                  <div
                    className="
                      absolute
                      left-[37%]
                      top-[11%]
                      h-28
                      w-32
                      rounded-full
                      bg-white/25
                      blur-2xl
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-[7%]
                      left-[39%]
                      h-24
                      w-40
                      rounded-full
                      bg-white/20
                      blur-2xl
                    "
                  />
                </motion.div>

                {/* =============================================
                    PERMANENT LIGHT PAPER TEXTURE
                ============================================= */}

                <div
                  className="
                    paper-wrinkles
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-25
                  "
                />

                {/* =============================================
                    DECORATIONS
                ============================================= */}

                <span
                  className="
                    absolute
                    left-5
                    top-4
                    rotate-[-15deg]
                    text-xl
                    text-[#a6578b]
                  "
                >
                  ✦
                </span>

                <span
                  className="
                    absolute
                    right-7
                    top-6
                    rotate-[15deg]
                    text-2xl
                    text-[#b96797]
                  "
                >
                  ★
                </span>

                <span
                  className="
                    absolute
                    right-24
                    top-12
                    text-sm
                    text-[#8c5aaa]
                  "
                >
                  ✧
                </span>

                {/* =============================================
                    HEADER
                ============================================= */}

                <div
                  className="
                    relative
                    mb-8
                    flex
                    flex-col
                    items-start
                    justify-between
                    gap-4
                    border-b
                    border-[#2d2230]/20
                    pb-5
                    sm:flex-row
                    sm:items-end
                  "
                >
                  <div>
                    <p
                      className="
                        mb-2
                        rotate-[-2deg]
                        font-mono
                        text-xs
                        text-[#9c5f8d]
                      "
                    >
                      hi, i'm
                    </p>

                    <h2
                      className="
                        font-display
                        text-5xl
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.05em]
                        sm:text-6xl
                        lg:text-[4.5rem]
                      "
                    >
                      MARJORIE
                    </h2>

                    <p
                      className="
                        mt-2
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-[#6b5873]
                        sm:text-xs
                      "
                    >
                      FULL STACK DEVELOPER
                    </p>
                  </div>

                  <Sticker className="rotate-[4deg]">
                    ABOUT ME ✦
                  </Sticker>
                </div>

                {/* =============================================
                    PROFILE
                ============================================= */}

                <div
                  className="
                    grid
                    gap-8
                    lg:grid-cols-[0.88fr_1.25fr]
                  "
                >
                  {/* PHOTO */}

                  <div className="relative">
                    <div
                      className="
                        relative
                        mx-auto
                        max-w-[310px]
                        rotate-[-2deg]
                        rounded-[20px]
                        border-2
                        border-[#3a2a45]
                        bg-[#dbcbe6]
                        p-4
                        shadow-[8px_10px_0_rgba(92,63,107,.25)]
                        transition
                        duration-500
                        hover:rotate-0
                      "
                    >
                      <Pin
                        className="
                          -top-2
                          left-1/2
                          -translate-x-1/2
                        "
                      />

                      <div
                        className="
                          relative
                          aspect-[4/5]
                          overflow-hidden
                          border-[5px]
                          border-white
                          bg-white
                          shadow-md
                        "
                      >
                        <Image
                          src="/IDme.png"
                          alt={profile.name}
                          fill
                          className="object-cover"
                          sizes="300px"
                          priority
                        />
                      </div>

                      <p
                        className="
                          mt-3
                          text-center
                          font-mono
                          text-xs
                          font-bold
                        "
                      >
                        {profile.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-center
                          font-mono
                          text-[10px]
                          text-black/50
                        "
                      >
                        developer • designer • creator
                      </p>
                    </div>

                    <Sticker
                      className="
                        absolute
                        -left-2
                        top-10
                        rotate-[-8deg]
                      "
                    >
                      &lt;/&gt;
                    </Sticker>

                    <Sticker
                      className="
                        absolute
                        -right-3
                        top-[35%]
                        rotate-[8deg]
                      "
                    >
                      CODE
                    </Sticker>

                    <Sticker
                      className="
                        absolute
                        bottom-5
                        left-0
                        rotate-[6deg]
                      "
                    >
                      ✦ CREATE
                    </Sticker>
                  </div>

                  {/* ABOUT TEXT */}

                  <div className="space-y-5">
                    <div
                      className="
                        relative
                        border-2
                        border-[#3b2b46]
                        bg-white/50
                        p-5
                        shadow-[5px_5px_0_rgba(130,103,147,.12)]
                      "
                    >
                      <Pin className="-top-2 right-5" />

                      <h3
                        className="
                          font-display
                          text-2xl
                          font-black
                          uppercase
                        "
                      >
                        WHO AM I?
                      </h3>

                      <p
                        className="
                          mt-3
                          font-mono
                          text-sm
                          leading-8
                          text-black/70
                        "
                      >
                        {about.intro}
                      </p>

                      <span
                        className="
                          absolute
                          bottom-3
                          right-4
                          text-lg
                          text-[#a3619c]
                        "
                      >
                        ✦
                      </span>
                    </div>

                    <div
                      className="
                        relative
                        rotate-[0.5deg]
                        border
                        border-[#b69ec2]
                        bg-[#e3d6ea]
                        p-5
                        shadow-[5px_5px_0_rgba(79,57,89,.12)]
                      "
                    >
                      <p
                        className="
                          font-mono
                          text-sm
                          leading-8
                          text-[#3b3040]
                        "
                      >
                        {about.paragraphs[0]}
                      </p>

                      <p
                        className="
                          mt-4
                          font-mono
                          text-sm
                          leading-8
                          text-[#3b3040]
                        "
                      >
                        {about.paragraphs[1]}
                      </p>

                      <span
                        className="
                          absolute
                          -bottom-3
                          right-6
                          rotate-[8deg]
                          font-mono
                          text-xs
                          text-[#92598a]
                        "
                      >
                        ★ just me being creative
                      </span>
                    </div>
                  </div>
                </div>

                {/* =============================================
                    SKILLS
                ============================================= */}

                <div
                  className="
                    relative
                    mt-8
                    border-2
                    border-[#3b2b46]
                    bg-white/35
                    p-5
                  "
                >
                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <h3
                      className="
                        font-display
                        text-2xl
                        font-black
                        uppercase
                      "
                    >
                      MY SKILLS
                    </h3>

                    <span
                      className="
                        font-mono
                        text-sm
                        text-[#975a8a]
                      "
                    >
                      ✦﹏﹏✦
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <Sticker
                        key={skill}
                        className={
                          index % 2 === 0
                            ? "rotate-[-2deg]"
                            : "rotate-[2deg]"
                        }
                      >
                        {skill}
                      </Sticker>
                    ))}
                  </div>
                </div>

                {/* =============================================
                    THINGS I LIKE / RANDOM FACTS
                ============================================= */}

                <div
                  className="
                    mt-6
                    grid
                    gap-6
                    md:grid-cols-2
                  "
                >
                  {/* THINGS I LIKE */}

                  <div
                    className="
                      relative
                      rotate-[-1deg]
                      border-2
                      border-[#3b2b46]
                      bg-[#f7f1f8]
                      p-5
                    "
                  >
                    <Pin className="-top-2 left-6" />

                    <h3
                      className="
                        font-display
                        text-xl
                        font-black
                        uppercase
                      "
                    >
                      THINGS I LIKE
                    </h3>

                    <ul
                      className="
                        mt-4
                        space-y-3
                        font-mono
                        text-sm
                        text-[#34273a]
                      "
                    >
                      {interests.map((item) => (
                        <li
                          key={item}
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <span className="text-[#9353aa]">
                            ✦
                          </span>

                          {item}
                        </li>
                      ))}
                    </ul>

                    <span
                      className="
                        absolute
                        bottom-3
                        right-4
                        rotate-12
                        text-xl
                        text-[#aa719e]
                      "
                    >
                      ☆
                    </span>
                  </div>

                  {/* RANDOM FACTS */}

                  <div
                    className="
                      relative
                      rotate-[1deg]
                      border-2
                      border-[#3b2b46]
                      bg-[#ddcce5]
                      p-5
                    "
                  >
                    <Pin className="-top-2 right-8" />

                    <h3
                      className="
                        font-display
                        text-xl
                        font-black
                        uppercase
                      "
                    >
                      RANDOM FACTS
                    </h3>

                    <ul
                      className="
                        mt-4
                        space-y-3
                        font-mono
                        text-xs
                        leading-7
                        text-[#34273a]
                      "
                    >
                      {funFacts.map((fact) => (
                        <li
                          key={fact}
                          className="flex gap-2"
                        >
                          <span className="text-[#9353aa]">
                            ★
                          </span>

                          <span>
                            {fact}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* =============================================
                    HIGHLIGHTS
                ============================================= */}

                <div
                  className="
                    mt-6
                    grid
                    grid-cols-3
                    border-2
                    border-[#3b2b46]
                    bg-white/40
                  "
                >
                  {about.highlights.map(
                    (item, index) => (
                      <div
                        key={item.label}
                        className={`
                          p-3
                          text-center
                          sm:p-4
                          ${
                            index !==
                            about.highlights.length - 1
                              ? "border-r-2 border-[#3b2b46]"
                              : ""
                          }
                        `}
                      >
                        <p
                          className="
                            font-display
                            text-xl
                            font-black
                            text-[#9353aa]
                            sm:text-3xl
                          "
                        >
                          {item.value}
                        </p>

                        <p
                          className="
                            mt-1
                            font-mono
                            text-[7px]
                            uppercase
                            tracking-wide
                            text-black/50
                            sm:text-[9px]
                          "
                        >
                          {item.label}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* =============================================
                    BOTTOM STICKERS
                ============================================= */}

                <div
                  className="
                    relative
                    mt-7
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div className="flex flex-wrap gap-3">
                    <Sticker className="rotate-[-3deg]">
                      BUILD
                    </Sticker>

                    <Sticker className="rotate-[2deg]">
                      DESIGN
                    </Sticker>

                    <Sticker className="rotate-[-1deg]">
                      CREATE
                    </Sticker>
                  </div>

                  <p
                    className="
                      rotate-[-2deg]
                      font-mono
                      text-xs
                      text-[#975a8a]
                    "
                  >
                    code • create • repeat ✦
                  </p>
                </div>

                <span
                  className="
                    pointer-events-none
                    absolute
                    bottom-4
                    right-5
                    text-xl
                    text-[#9f6bb7]/70
                  "
                >
                  ✦ ☆ ✧
                </span>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}

      <style jsx>{`
        .paper-card {
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* ===============================================
           PERMANENT PAPER WRINKLES
        =============================================== */

        .paper-wrinkles {
          background:
            linear-gradient(
              117deg,
              transparent 19%,
              rgba(0, 0, 0, 0.045) 19.6%,
              transparent 20.2%
            ),
            linear-gradient(
              72deg,
              transparent 37%,
              rgba(255, 255, 255, 0.15) 37.6%,
              transparent 38.3%
            ),
            linear-gradient(
              156deg,
              transparent 57%,
              rgba(0, 0, 0, 0.05) 57.6%,
              transparent 58.2%
            ),
            linear-gradient(
              32deg,
              transparent 72%,
              rgba(255, 255, 255, 0.15) 72.6%,
              transparent 73.2%
            ),
            linear-gradient(
              141deg,
              transparent 46%,
              rgba(0, 0, 0, 0.035) 46.5%,
              transparent 47%
            );
        }

        /* ===============================================
           GALAXY
        =============================================== */

        .nebula-left {
          background: radial-gradient(
            circle,
            rgba(185, 117, 245, 0.2),
            rgba(117, 65, 164, 0.1) 38%,
            transparent 72%
          );

          animation: nebulaMove 16s ease-in-out infinite;
        }

        .nebula-right {
          background: radial-gradient(
            circle,
            rgba(201, 103, 168, 0.18),
            rgba(139, 72, 192, 0.11) 38%,
            transparent 72%
          );

          animation: nebulaMove 20s ease-in-out infinite reverse;
        }

        .galaxy-stream {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(138, 75, 177, 0.03),
            rgba(196, 108, 175, 0.1),
            rgba(159, 91, 199, 0.12),
            rgba(192, 102, 167, 0.07),
            transparent
          );

          animation: galaxyMove 12s ease-in-out infinite;
        }

        /* ===============================================
           STARS
        =============================================== */

        .star-dot {
          background: #f2d8ff;

          box-shadow:
            0 0 5px rgba(236, 198, 255, 0.8),
            0 0 12px rgba(184, 118, 218, 0.4);

          animation: starBlink 3s ease-in-out infinite;
        }

        .sparkle {
          filter: drop-shadow(
            0 0 7px rgba(225, 182, 255, 0.55)
          );

          animation: sparkle 3.5s ease-in-out infinite;
        }

        /* ===============================================
           SHOOTING STAR
        =============================================== */

        .shooting-star {
          width: 130px;
          height: 2px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 227, 255, 0.95),
            transparent
          );

          opacity: 0;

          transform: rotate(-27deg);

          box-shadow:
            0 0 8px rgba(255, 210, 255, 0.5),
            0 0 15px rgba(169, 100, 206, 0.25);

          animation: shoot 8s linear infinite;
        }

        /* ===============================================
           STAR ANIMATION
        =============================================== */

        @keyframes starBlink {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.7);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.85) rotate(0deg);
          }

          50% {
            opacity: 1;
            transform: scale(1.25) rotate(15deg);
          }
        }

        /* ===============================================
           GALAXY MOVEMENT
        =============================================== */

        @keyframes nebulaMove {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(20px, -25px) scale(1.08);
          }
        }

        @keyframes galaxyMove {
          0%,
          100% {
            opacity: 0.4;
            transform: translateX(-3%);
          }

          50% {
            opacity: 0.9;
            transform: translateX(3%);
          }
        }

        /* ===============================================
           SHOOTING STAR
        =============================================== */

        @keyframes shoot {
          0% {
            opacity: 0;

            transform:
              translate(-100px, -50px)
              rotate(-27deg)
              scaleX(0.3);
          }

          8% {
            opacity: 1;
          }

          30% {
            opacity: 0.8;
          }

          48% {
            opacity: 0;

            transform:
              translate(300px, 150px)
              rotate(-27deg)
              scaleX(1);
          }

          100% {
            opacity: 0;

            transform:
              translate(300px, 150px)
              rotate(-27deg)
              scaleX(1);
          }
        }

        /* ===============================================
           ACCESSIBILITY
        =============================================== */

        @media (prefers-reduced-motion: reduce) {
          .nebula,
          .galaxy-stream,
          .star-dot,
          .sparkle,
          .shooting-star {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}