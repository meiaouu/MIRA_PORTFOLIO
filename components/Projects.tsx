"use client";

import { useRef, useState } from "react";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { FiExternalLink } from "react-icons/fi";

import ProjectLogoRail from "./ProjectLogoRail";
import SectionHeading from "./SectionHeading";

import { projects } from "@/data/portfolio";

/* =========================================================
   POTION PARTICLES
========================================================= */

const POTION_ORBS = [
  { left: "6%", size: 8, delay: 0, duration: 8 },
  { left: "14%", size: 14, delay: 1.1, duration: 10 },
  { left: "25%", size: 7, delay: 2.1, duration: 8.5 },
  { left: "36%", size: 12, delay: 0.5, duration: 9 },
  { left: "48%", size: 16, delay: 1.8, duration: 11 },
  { left: "59%", size: 8, delay: 2.7, duration: 8 },
  { left: "69%", size: 13, delay: 0.9, duration: 10 },
  { left: "79%", size: 9, delay: 2, duration: 8.5 },
  { left: "89%", size: 15, delay: 1.3, duration: 10.5 },
  { left: "95%", size: 7, delay: 2.5, duration: 9 },
];

/* =========================================================
   PROJECTS
========================================================= */

export default function Projects() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start end",
      "end start",
    ],
  });

  /* =======================================================
     PARALLAX
  ======================================================= */

  const gridYRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [-120, 120]
    );

  const leftGlowYRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [-210, 220]
    );

  const rightGlowYRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [190, -230]
    );

  const leftXRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [-100, 110]
    );

  const rightXRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [110, -100]
    );

  const meteorYRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [-240, 310]
    );

  const meteorRotateRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [-22, 26]
    );

  const gridY =
    useSpring(gridYRaw, {
      stiffness: 70,
      damping: 22,
    });

  const leftGlowY =
    useSpring(
      leftGlowYRaw,
      {
        stiffness: 65,
        damping: 23,
      }
    );

  const rightGlowY =
    useSpring(
      rightGlowYRaw,
      {
        stiffness: 65,
        damping: 23,
      }
    );

  const leftX =
    useSpring(leftXRaw, {
      stiffness: 65,
      damping: 24,
    });

  const rightX =
    useSpring(
      rightXRaw,
      {
        stiffness: 65,
        damping: 24,
      }
    );

  const meteorY =
    useSpring(
      meteorYRaw,
      {
        stiffness: 75,
        damping: 20,
      }
    );

  const meteorRotate =
    useSpring(
      meteorRotateRaw,
      {
        stiffness: 60,
        damping: 22,
      }
    );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        isolate

        px-2

        pt-20
        pb-3

        sm:px-4
        sm:pt-24
        sm:pb-4

        lg:px-6
        lg:pt-28
        lg:pb-5
      "
    >
      {/* =====================================================
          ROUNDED BLACK GLASS BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          inset-x-2
          inset-y-0

          -z-50

          overflow-hidden

          rounded-[34px]

          border
          border-white/[0.08]

          bg-black/75

          shadow-[0_30px_100px_rgba(0,0,0,.60),inset_0_1px_0_rgba(255,255,255,.06)]

          backdrop-blur-[28px]

          sm:inset-x-4
          sm:rounded-[46px]

          lg:inset-x-6
          lg:rounded-[60px]
        "
      >
        {/* GLASS REFLECTION */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br

            from-white/[0.025]
            via-transparent
            to-violet/[0.04]
          "
        />

        {/* TOP SHINE */}

        <div
          className="
            absolute

            left-[7%]
            right-[7%]
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
          "
        />

        {/* =================================================
            GRID
        ================================================= */}

        <motion.div
          style={{
            y: gridY,
          }}
          className="
            absolute

            -inset-[180px]

            opacity-[0.09]

            bg-[linear-gradient(rgba(166,77,121,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(166,77,121,.14)_1px,transparent_1px)]

            bg-[size:60px_60px]
          "
        />

        {/* LEFT GLOW */}

        <motion.div
          style={{
            y: leftGlowY,
            x: leftX,
          }}
          className="
            absolute

            -left-[270px]
            top-[8%]

            h-[650px]
            w-[650px]

            rounded-full

            bg-[#9b54c9]/14

            blur-[150px]
          "
        />

        {/* RIGHT GLOW */}

        <motion.div
          style={{
            y: rightGlowY,
            x: rightX,
          }}
          className="
            absolute

            -right-[280px]
            top-[42%]

            h-[700px]
            w-[700px]

            rounded-full

            bg-[#5848be]/14

            blur-[160px]
          "
        />

        {/* CENTER HAZE */}

        <motion.div
          style={{
            y: gridY,
          }}
          className="
            absolute

            left-1/2
            top-[24%]

            h-[300px]
            w-[70%]

            -translate-x-1/2

            rounded-full

            bg-mauve/[0.05]

            blur-[120px]
          "
        />

        {/* =================================================
            LEFT METEOR
        ================================================= */}

        <motion.div
          style={{
            y: meteorY,
            rotate:
              meteorRotate,
          }}
          animate={{
            x: [
              0,
              25,
              -8,
              0,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            left-[4%]
            top-[22%]

            hidden

            h-[190px]
            w-[190px]

            md:block
          "
        >
          <div
            className="
              absolute

              left-[-135px]
              top-1/2

              h-12
              w-[200px]

              -translate-y-1/2

              rotate-[8deg]

              rounded-full

              bg-gradient-to-r
              from-transparent
              via-violet/10
              to-mauve/25

              blur-2xl
            "
          />

          <div
            className="
              absolute
              inset-5

              rounded-[42%_58%_63%_37%/48%_38%_62%_52%]

              border
              border-white/[0.05]

              bg-gradient-to-br
              from-[#42304e]
              via-[#211726]
              to-[#0c0910]

              opacity-45

              shadow-[0_0_80px_rgba(142,82,198,.18),inset_10px_10px_25px_rgba(255,255,255,.03),inset_-14px_-12px_30px_rgba(0,0,0,.45)]
            "
          >
            <span className="absolute left-[25%] top-[22%] h-8 w-10 rounded-full bg-black/25" />

            <span className="absolute bottom-[22%] right-[19%] h-5 w-6 rounded-full bg-black/30" />

            <span className="absolute bottom-[30%] left-[22%] h-4 w-4 rounded-full bg-white/[0.04]" />
          </div>
        </motion.div>

        {/* =================================================
            RIGHT METEOR
        ================================================= */}

        <motion.div
          style={{
            y: rightGlowY,
            rotate:
              meteorRotate,
          }}
          animate={{
            x: [
              0,
              -30,
              6,
              0,
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            right-[2%]
            top-[58%]

            hidden

            h-[220px]
            w-[220px]

            md:block
          "
        >
          <div
            className="
              absolute

              right-[-135px]
              top-1/2

              h-14
              w-[220px]

              -translate-y-1/2

              rotate-[-10deg]

              rounded-full

              bg-gradient-to-l
              from-transparent
              via-violet/10
              to-[#8360d3]/20

              blur-3xl
            "
          />

          <div
            className="
              absolute
              inset-6

              rounded-[55%_45%_41%_59%/43%_58%_42%_57%]

              border
              border-white/[0.04]

              bg-gradient-to-br
              from-[#332943]
              via-[#19141f]
              to-[#08060b]

              opacity-35

              shadow-[0_0_100px_rgba(89,78,187,.2),inset_10px_8px_25px_rgba(255,255,255,.03),inset_-15px_-10px_35px_rgba(0,0,0,.5)]
            "
          />
        </motion.div>

        {/* =================================================
            POTION BUBBLES
        ================================================= */}

        {POTION_ORBS.map(
          (
            orb,
            index
          ) => (
            <motion.span
              key={
                index
              }
              initial={{
                y: 140,
                opacity:
                  0,
                scale:
                  0.4,
              }}
              animate={{
                y: [
                  140,
                  -150,
                  -450,
                  -800,
                ],

                x: [
                  0,
                  index %
                      2 ===
                    0
                    ? 16
                    : -16,
                  index %
                      3 ===
                    0
                    ? -12
                    : 12,
                  0,
                ],

                opacity: [
                  0,
                  0.45,
                  0.25,
                  0,
                ],

                scale: [
                  0.4,
                  1,
                  1.2,
                  0.8,
                ],
              }}
              transition={{
                duration:
                  orb.duration,

                delay:
                  orb.delay,

                repeat:
                  Infinity,

                ease:
                  "easeOut",
              }}
              className="
                absolute

                bottom-0

                rounded-full

                bg-mauve/60

                shadow-[0_0_20px_rgba(209,125,196,.55),0_0_45px_rgba(132,83,190,.2)]
              "
              style={{
                left:
                  orb.left,

                width:
                  orb.size,

                height:
                  orb.size,
              }}
            />
          )
        )}

        {/* =================================================
            RISING LIGHTS
        ================================================= */}

        {Array.from(
          {
            length: 7,
          },
          (
            _,
            index
          ) => (
            <motion.div
              key={
                index
              }
              animate={{
                y: [
                  200,
                  -800,
                ],

                opacity: [
                  0,
                  0.12,
                  0,
                ],
              }}
              transition={{
                duration:
                  7 +
                  index *
                    0.7,

                delay:
                  index *
                  0.8,

                repeat:
                  Infinity,

                ease:
                  "linear",
              }}
              className="
                absolute

                bottom-[-200px]

                w-px

                bg-gradient-to-t

                from-transparent
                via-mauve/25
                to-transparent

                blur-[1px]
              "
              style={{
                left:
                  `${
                    9 +
                    index *
                      14
                  }%`,

                height:
                  `${
                    140 +
                    (
                      index %
                      3
                    ) *
                      80
                  }px`,
              }}
            />
          )
        )}

        {/* CODE DECOR */}

        <motion.span
          style={{
            y:
              gridY,
          }}
          className="
            absolute

            left-[8%]
            top-[42%]

            hidden

            font-mono

            text-xs

            text-mauve/15

            md:block
          "
        >
          {"</>"}
        </motion.span>

        <motion.span
          style={{
            y:
              meteorY,
          }}
          className="
            absolute

            right-[9%]
            top-[25%]

            hidden

            font-mono

            text-sm

            text-white/10

            md:block
          "
        >
          {"{ }"}
        </motion.span>
      </div>

      {/* =====================================================
          HEADING
      ===================================================== */}

      <div
        className="
          relative

          z-20

          mx-auto

          mb-14

          max-w-6xl

          pt-12

          sm:mb-16
          sm:pt-16

          lg:mb-20
        "
      >
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description=""
        />
      </div>

      {/* =====================================================
          STICKY STACK
      ===================================================== */}

      <div
        className="
          relative

          mx-auto

          max-w-6xl

          [--stack-top:70px]

          sm:[--stack-top:82px]

          lg:[--stack-top:92px]
        "
      >
        {projects.map(
          (
            project,
            index
          ) => (
            <StickyProject
              key={
                project.title
              }
              project={
                project
              }
              index={
                index
              }
            />
          )
        )}

        {/* MUCH SMALLER FINAL SPACER */}

        <div
          className="
            h-[6vh]

            sm:h-[8vh]

            lg:h-[10vh]
          "
        />
      </div>

      {/* =====================================================
          PROJECT TECHNOLOGIES

          Close to bottom.
      ===================================================== */}

      <div
        className="
          relative

          z-20

          mx-auto

          mt-0

          max-w-[calc(100%-1.5rem)]

          pb-2

          sm:max-w-[calc(100%-3rem)]
          sm:pb-3

          lg:max-w-[calc(100%-5rem)]
          lg:pb-4
        "
      >
        <ProjectLogoRail />
      </div>
    </section>
  );
}

/* =========================================================
   STICKY PROJECT
========================================================= */

function StickyProject({
  project,
  index,
}: {
  project:
    (typeof projects)[number];

  index:
    number;
}) {
  const cardRef =
    useRef<HTMLElement>(
      null
    );

  const [
    hovered,
    setHovered,
  ] =
    useState(false);

  const {
    scrollYProgress,
  } = useScroll({
    target:
      cardRef,

    offset: [
      "start 95%",
      "start 25%",
    ],
  });

  const cardScaleRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0.95, 1]
    );

  const cardOpacityRaw =
    useTransform(
      scrollYProgress,
      [0, 0.4, 1],
      [
        0.45,
        0.85,
        1,
      ]
    );

  const imageYRaw =
    useTransform(
      scrollYProgress,
      [0, 1],
      [40, -40]
    );

  const cardScale =
    useSpring(
      cardScaleRaw,
      {
        stiffness:
          120,

        damping:
          23,
      }
    );

  const cardOpacity =
    useSpring(
      cardOpacityRaw,
      {
        stiffness:
          120,

        damping:
          23,
      }
    );

  const imageY =
    useSpring(
      imageYRaw,
      {
        stiffness:
          90,

        damping:
          23,
      }
    );

  const number =
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );

  /*
    IMPORTANT:

    Normal cards still need enough margin for stacking.

    Only the LAST project gets a small margin so there is
    no giant empty section before the technology logos.
  */

  const isLast =
    index ===
    projects.length - 1;

  return (
    <motion.article
      ref={cardRef}
      onMouseEnter={() =>
        setHovered(
          true
        )
      }
      onMouseLeave={() =>
        setHovered(
          false
        )
      }
      style={{
        top:
          `calc(var(--stack-top) + ${
            index *
            56
          }px)`,

        zIndex:
          30 +
          index,

        scale:
          cardScale,

        opacity:
          cardOpacity,
      }}
      className={`
        sticky

        overflow-hidden

        rounded-[28px]

        border
        border-white/[0.16]

        bg-black/72

        shadow-[0_28px_100px_rgba(0,0,0,.70),inset_0_1px_0_rgba(255,255,255,.06)]

        backdrop-blur-[28px]
        backdrop-saturate-150

        ${
          isLast
            ? `
              mb-[5vh]
              sm:mb-[6vh]
              lg:mb-[7vh]
            `
            : `
              mb-[50vh]
              sm:mb-[56vh]
              lg:mb-[60vh]
            `
        }
      `}
    >
      {/* =================================================
          GLASS REFLECTION
      ================================================= */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          z-0

          bg-gradient-to-br

          from-white/[0.035]
          via-transparent
          to-mauve/[0.035]
        "
      />

      {/* TOP SHINE */}

      <div
        className="
          pointer-events-none

          absolute

          left-[7%]
          right-[7%]
          top-0

          z-20

          h-px

          bg-gradient-to-r

          from-transparent
          via-white/30
          to-transparent
        "
      />

      {/* HOVER GLOW */}

      <motion.div
        animate={{
          opacity:
            hovered
              ? 0.3
              : 0.1,

          scale:
            hovered
              ? 1.15
              : 1,
        }}
        transition={{
          duration:
            0.45,
        }}
        className="
          pointer-events-none

          absolute

          -right-[10%]
          -top-[18%]

          z-0

          h-[340px]
          w-[340px]

          rounded-full

          bg-mauve/20

          blur-[120px]
        "
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          relative

          z-30

          flex

          min-h-[68px]

          items-center
          justify-between

          gap-3

          border-b
          border-white/[0.09]

          bg-black/50

          px-5

          backdrop-blur-xl

          sm:px-6
        "
      >
        <div
          className="
            flex

            min-w-0

            items-center

            gap-4
          "
        >
          <span
            className="
              font-display

              text-2xl
              font-black

              text-white

              sm:text-3xl
            "
          >
            {number}
          </span>

          <div className="min-w-0">
            <h3
              className="
                truncate

                font-display

                text-sm
                font-semibold

                uppercase

                tracking-[0.10em]

                text-white

                sm:text-base
              "
            >
              {project.title}
            </h3>

            <p
              className="
                truncate

                text-[9px]

                uppercase

                tracking-[0.12em]

                text-white/40

                sm:text-[10px]
              "
            >
              {project.tags?.[0] ??
                "Featured Project"}
            </p>
          </div>
        </div>

        <a
          href={
            project.liveUrl
          }
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex

            shrink-0

            items-center

            gap-2

            rounded-full

            border
            border-white/20

            bg-black/55

            px-3
            py-2

            font-mono

            text-[7px]

            uppercase

            tracking-[0.12em]

            text-white

            transition-all
            duration-300

            hover:border-mauve/60
            hover:bg-mauve/10

            sm:px-5
            sm:text-[9px]
          "
        >
          Live Project

          <FiExternalLink />
        </a>
      </div>

      {/* =================================================
          PROJECT BODY
      ================================================= */}

      <div
        className="
          relative

          z-10

          p-3

          sm:p-4

          lg:p-5
        "
      >
        <div className="relative">
          <ProjectPreview
            src={
              project.image
            }
            title={
              project.title
            }
            imageY={
              imageY
            }
          />

          {/* DARK BOTTOM */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              z-10

              rounded-[24px]

              bg-gradient-to-t

              from-black/90

              via-black/10

              to-transparent
            "
          />

          {/* PROJECT INFO */}

          <div
            className="
              absolute

              bottom-0
              left-0

              z-20

              max-w-2xl

              p-5

              sm:p-6

              lg:p-7
            "
          >
            <p
              className="
                max-w-xl

                text-xs

                leading-relaxed

                text-white/75

                sm:text-sm
              "
            >
              {
                project.description
              }
            </p>

            <div
              className="
                mt-4

                flex
                flex-wrap

                gap-2
              "
            >
              {project.tags.map(
                (
                  tag
                ) => (
                  <span
                    key={
                      tag
                    }
                    className="
                      rounded-full

                      border
                      border-white/15

                      bg-black/50

                      px-2.5
                      py-1

                      font-mono

                      text-[8px]

                      text-white/70

                      backdrop-blur-md

                      sm:text-[9px]
                    "
                  >
                    {
                      tag
                    }
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          HOVER SHINE
      ================================================= */}

      <motion.div
        animate={{
          x:
            hovered
              ? "175%"
              : "-175%",
        }}
        transition={{
          duration:
            0.9,

          ease:
            "easeInOut",
        }}
        className="
          pointer-events-none

          absolute

          inset-y-0

          left-[-35%]

          z-50

          w-[18%]

          rotate-[15deg]

          bg-gradient-to-r

          from-transparent
          via-white/[0.045]
          to-transparent

          blur-xl
        "
      />
    </motion.article>
  );
}

/* =========================================================
   PROJECT PREVIEW
========================================================= */

function ProjectPreview({
  src,
  title,
  imageY,
}: {
  src:
    string;

  title:
    string;

  imageY:
    MotionValue<number>;
}) {
  const [
    failed,
    setFailed,
  ] =
    useState(false);

  return (
    <div
      className="
        group/image

        relative

        min-h-[340px]

        overflow-hidden

        rounded-[24px]

        border
        border-white/[0.08]

        bg-black/60

        shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_16px_45px_rgba(0,0,0,.45)]

        sm:min-h-[430px]

        lg:min-h-[510px]
      "
    >
      {/* FALLBACK */}

      <div
        className="
          absolute
          inset-0

          flex

          items-center
          justify-center

          px-6

          text-center

          font-display

          text-sm

          text-white/15
        "
      >
        {title}
      </div>

      {/* SCREENSHOT */}

      {!failed && (
        <motion.div
          style={{
            y:
              imageY,
          }}
          className="
            absolute

            -inset-y-[60px]

            inset-x-0
          "
        >
          <img
            src={src}
            alt={
              title
            }
            onError={() =>
              setFailed(
                true
              )
            }
            className="
              h-full
              w-full

              object-cover

              opacity-90

              transition-all
              duration-700

              group-hover/image:scale-[1.04]

              group-hover/image:opacity-100
            "
          />
        </motion.div>
      )}

      {/* GLASS TINT */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-br

          from-white/[0.02]

          via-transparent

          to-mauve/[0.06]
        "
      />

      {/* TOP SHINE */}

      <div
        className="
          pointer-events-none

          absolute

          left-[10%]
          right-[10%]
          top-0

          h-px

          bg-gradient-to-r

          from-transparent
          via-white/20
          to-transparent
        "
      />
    </div>
  );
}