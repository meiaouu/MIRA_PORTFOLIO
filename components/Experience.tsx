"use client";

import { useRef, useState } from "react";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* =========================================================
   IMAGE STEPS

   IMPORTANT:
   Each photo has its OWN revealStart / revealEnd.

   The images are NOT waiting for the line.
========================================================= */

const MOMENTS = [
  {
    id: 1,

    year: "2024",

    title: "Freelancing Video Editing",

    caption: "2024 • Video Editing",

    image: "/experience/video-editing-1.jpg",

    position:
      "left-[5%] top-[18%] w-[24%] sm:left-[7%] sm:w-[19%] lg:left-[9%] lg:w-[17%]",

    rotation: -7,

    revealStart: 0.08,

    revealEnd: 0.18,
  },

  {
    id: 2,

    year: "2025",

    title: "Web Development",

    caption: "2025 • Web Developing",

    image: "/experience/web-dev-1.jpg",

    position:
      "right-[5%] top-[18%] w-[24%] sm:right-[7%] sm:w-[19%] lg:right-[9%] lg:w-[17%]",

    rotation: 7,

    revealStart: 0.32,

    revealEnd: 0.42,
  },

  {
    id: 3,

    year: "Present",

    title: "Web Development",

    caption: "Present • Still Building",

    image: "/experience/web-dev-2.jpg",

    position:
      "left-[9%] bottom-[7%] w-[25%] sm:left-[12%] sm:w-[20%] lg:left-[15%] lg:w-[18%]",

    rotation: -5,

    revealStart: 0.58,

    revealEnd: 0.68,
  },
];

/* =========================================================
   LINES

   Notice:

   Image 2 finishes appearing at 0.42
   THEN line 1 starts at 0.44.

   Image 3 finishes appearing at 0.68
   THEN line 2 starts at 0.70.

   So the line is FOLLOWING the images.
========================================================= */

const STRING_SEGMENTS = [
  {
    d: "M180 165 L825 165",

    start: 0.44,

    end: 0.52,
  },

  {
    d: "M825 165 L225 570",

    start: 0.70,

    end: 0.78,
  },
];

/* =========================================================
   EXPERIENCE
========================================================= */

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: ["start start", "end end"],
  });

  /*
    Smooth scroll progress.

    The overall scroll controls the photo steps,
    not the string.
  */

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,

    damping: 26,

    mass: 0.7,
  });

  /* =======================================================
     SUBTLE SCENE MOTION
  ======================================================= */

  const sceneScale = useTransform(
    progress,
    [0, 0.06, 0.94, 1],
    [0.97, 1, 1, 0.98]
  );

  const sceneY = useTransform(
    progress,
    [0, 1],
    [18, -10]
  );

  const hintOpacity = useTransform(
    progress,
    [0, 0.06, 0.14],
    [1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="
        relative

        h-[420vh]

        sm:h-[450vh]
      "
    >
      {/* =====================================================
          STICKY VIEW
      ===================================================== */}

      <div
        className="
          sticky
          top-0

          flex
          min-h-screen

          items-center
          justify-center

          px-3
          py-12

          sm:px-6
          sm:py-14

          lg:px-10
        "
      >
        <motion.div
          style={{
            scale: sceneScale,

            y: sceneY,
          }}
          className="
            relative

            h-[84vh]

            min-h-[670px]
            max-h-[880px]

            w-full
            max-w-[1450px]

            overflow-visible

            bg-transparent
          "
        >
          {/* =================================================
              TITLE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,

              y: -45,

              scale: 0.9,

              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,

              y: 0,

              scale: 1,

              filter: "blur(0px)",
            }}
            viewport={{
              once: true,

              amount: 0.5,
            }}
            transition={{
              duration: 0.8,

              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute

              left-1/2
              top-0

              z-[80]

              -translate-x-1/2

              whitespace-nowrap

              text-center
            "
          >
            <motion.p
              initial={{
                letterSpacing: "0.8em",

                opacity: 0,
              }}
              whileInView={{
                letterSpacing: "0.45em",

                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
              }}
              className="
                font-mono

                text-[8px]

                uppercase

                text-mauve/70

                sm:text-[10px]
              "
            >
              Experience
            </motion.p>

            <motion.h2
              initial={{
                opacity: 0,

                y: 24,
              }}
              whileInView={{
                opacity: 1,

                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.65,

                delay: 0.12,
              }}
              className="
          font-pixel
            text-lg
            leading-relaxed
            text-white
            sm:text-xl
            md:text-2xl
              "
            >
              My Journey
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,

                delay: 0.3,
              }}
              className="
                mt-2

                text-[10px]

                text-white/45

                sm:text-sm
              "
            >
          
            </motion.p>
          </motion.div>

          {/* =================================================
              SMALL LABEL
          ================================================= */}

        

          {/* =================================================
              FLOWING STRING

              The string is BELOW the content.

              It does NOT control image reveals.
          ================================================= */}

          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
            className="
              pointer-events-none

              absolute
              inset-0

              z-20

              h-full
              w-full
            "
          >
            <defs>
              {/* animated-looking multicolor string */}

              <linearGradient
                id="experienceFlow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#7c3aed"
                />

                <stop
                  offset="28%"
                  stopColor="#d946ef"
                />

                <stop
                  offset="52%"
                  stopColor="#fb7185"
                />

                <stop
                  offset="76%"
                  stopColor="#f97316"
                />

                <stop
                  offset="100%"
                  stopColor="#facc15"
                />
              </linearGradient>

              <filter
                id="experienceGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />

                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {STRING_SEGMENTS.map(
              (
                segment,
                index
              ) => (
                <FlowingTrace
                  key={
                    index
                  }
                  progress={
                    progress
                  }
                  start={
                    segment.start
                  }
                  end={
                    segment.end
                  }
                  d={
                    segment.d
                  }
                />
              )
            )}
          </svg>

          {/* =================================================
              EXPERIENCE TEXT

              Above string so text stays readable.
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,

              y: 40,

              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,

              y: 0,

              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,

              delay: 0.15,

              ease: "easeOut",
            }}
            className="
              absolute

              left-[57%]
              top-[59%]

              z-40

              w-[64%]
              max-w-[720px]

              -translate-x-1/2
              -translate-y-1/2

              overflow-hidden

              rounded-[28px]

              border
              border-black/[0.08]

              bg-[#f8f7f3]/95

              shadow-[0_25px_70px_rgba(0,0,0,.22)]

              backdrop-blur-xl

              sm:w-[57%]

              lg:left-[58%]
              lg:w-[52%]
            "
          >
            {/* PAPER HIGHLIGHT */}

            <div
              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-br

                from-white/60

                via-transparent

                to-[#ece7df]/35
              "
            />

            {/* =================================================
                INTRO
            ================================================= */}

          

            {/* =================================================
                2024
            ================================================= */}

            <div
              className="
                relative
                z-10

                border-b
                border-black/10

                px-5
                py-5

                sm:px-8
                sm:py-7

                lg:px-10
              "
            >
              <div
                className="
                  grid

                  grid-cols-[70px_1fr]

                  gap-4

                  sm:grid-cols-[105px_1fr]
                  sm:gap-6
                "
              >
                <div>
                  <p
                    className="
                      text-2xl
                      font-black

                      leading-none

                      text-black

                      sm:text-4xl

                      lg:text-5xl
                    "
                  >
                    2024
                  </p>

                  <p
                    className="
                      mt-2

                      font-mono

                      text-[6px]

                      uppercase

                      tracking-[0.2em]

                      text-black/35

                      sm:text-[8px]
                    "
                  >
                    Freelance
                  </p>
                </div>

                <div>
                  <h4
                    className="
                      text-[11px]
                      font-black

                      uppercase

                      tracking-[0.04em]

                      text-black

                      sm:text-base

                      lg:text-lg
                    "
                  >
                    Freelancing Video Editing
                  </h4>

                  <p
                    className="
                      mt-2

                      max-w-md

                      text-[9px]

                      leading-relaxed

                      text-black/55

                      sm:text-xs

                      lg:text-sm
                    "
                  >
                    Worked on freelance video editing projects,
                    creating engaging visual content through
                    transitions, timing, pacing, and storytelling.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                2025 - PRESENT
            ================================================= */}

            <div
              className="
                relative
                z-10

                px-5
                py-5

                sm:px-8
                sm:py-7

                lg:px-10
              "
            >
              <div
                className="
                  grid

                  grid-cols-[70px_1fr]

                  gap-4

                  sm:grid-cols-[105px_1fr]
                  sm:gap-6
                "
              >
                <div>
                  <p
                    className="
                      text-2xl
                      font-black

                      leading-none

                      text-black

                      sm:text-4xl

                      lg:text-5xl
                    "
                  >
                    2025
                  </p>

                  <p
                    className="
                      mt-2

                      font-mono

                      text-[6px]

                      uppercase

                      tracking-[0.2em]

                      text-black/40

                      sm:text-[8px]
                    "
                  >
                    Present
                  </p>
                </div>

                <div>
                  <h4
                    className="
                      text-[11px]
                      font-black

                      uppercase

                      tracking-[0.04em]

                      text-black

                      sm:text-base

                      lg:text-lg
                    "
                  >
                    Web Development
                  </h4>

                  <p
                    className="
                      mt-2

                      max-w-md

                      text-[9px]

                      leading-relaxed

                      text-black/55

                      sm:text-xs

                      lg:text-sm
                    "
                  >
                    Building responsive websites and full-stack
                    systems while improving frontend, backend,
                    database, UI design, and software development
                    skills.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              IMAGES

              THESE ARE THE MAIN SCROLL EVENTS.
          ================================================= */}

          {MOMENTS.map(
            (
              moment
            ) => (
              <ExperiencePhoto
                key={
                  moment.id
                }
                moment={
                  moment
                }
                progress={
                  progress
                }
              />
            )
          )}

          {/* =================================================
              FIREWORKS

              Only after image 3 has already appeared.
          ================================================= */}

          <Fireworks
            progress={
              progress
            }
          />

          {/* =================================================
              SCROLL HINT
          ================================================= */}

          <motion.div
            style={{
              opacity:
                hintOpacity,
            }}
            className="
              absolute

              bottom-5
              right-6

              z-[80]

              rounded-full

              border
              border-white/10

              bg-black/75

              px-4
              py-2

              font-mono

              text-[6px]

              uppercase

              tracking-[0.22em]

              text-white/70

              backdrop-blur-xl

              sm:bottom-7
              sm:right-8
              sm:text-[8px]
            "
          >
            scroll to reveal ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE PHOTO

   Every photo owns its own scroll reveal.
========================================================= */

function ExperiencePhoto({
  moment,
  progress,
}: {
  moment:
    (typeof MOMENTS)[number];

  progress:
    MotionValue<number>;
}) {
  const [
    failed,
    setFailed,
  ] =
    useState(false);

  /* =======================================================
     IMAGE-BASED REVEAL
  ======================================================= */

  const opacity =
    useTransform(
      progress,
      [
        moment.revealStart,
        moment.revealEnd,
      ],
      [0, 1]
    );

  const scale =
    useTransform(
      progress,
      [
        moment.revealStart,
        moment.revealEnd,
      ],
      [0.25, 1]
    );

  const y =
    useTransform(
      progress,
      [
        moment.revealStart,
        moment.revealEnd,
      ],
      [100, 0]
    );

  const x =
    useTransform(
      progress,
      [
        moment.revealStart,
        moment.revealEnd,
      ],
      [
        moment.id === 1
          ? -75
          : moment.id === 2
            ? 75
            : -25,

        0,
      ]
    );

  const rotate =
    useTransform(
      progress,
      [
        moment.revealStart,
        moment.revealEnd,
      ],
      [
        moment.rotation +
          (
            moment.id %
                2 ===
              0
              ? 16
              : -16
          ),

        moment.rotation,
      ]
    );

  const blur =
    useTransform(
      progress,
      [
        moment.revealStart,
        moment.revealEnd,
      ],
      [
        "blur(9px)",
        "blur(0px)",
      ]
    );

  return (
    <motion.div
      style={{
        opacity,

        scale,

        x,

        y,

        rotate,

        filter:
          blur,
      }}
      className={`
        absolute

        z-30

        ${moment.position}
      `}
    >
      {/* =================================================
          PIN
      ================================================= */}

      <motion.div
        initial={{
          scale: 0,
        }}
        whileInView={{
          scale: 1,
        }}
        transition={{
          type:
            "spring",

          stiffness:
            300,

          damping:
            15,
        }}
        className="
          absolute

          left-1/2
          top-[-8px]

          z-50

          h-4
          w-4

          -translate-x-1/2

          rounded-full

          bg-[#ce1711]

          shadow-[0_4px_10px_rgba(0,0,0,.35),0_0_10px_rgba(206,23,17,.35)]

          sm:h-[18px]
          sm:w-[18px]
        "
      >
        <span
          className="
            absolute

            left-[24%]
            top-[18%]

            h-[28%]
            w-[28%]

            rounded-full

            bg-white/45
          "
        />
      </motion.div>

      {/* =================================================
          POLAROID
      ================================================= */}

      <motion.div
        whileHover={{
          y: -12,

          scale: 1.055,

          rotate:
            moment.rotation *
            0.35,
        }}
        transition={{
          type:
            "spring",

          stiffness:
            250,

          damping:
            18,
        }}
        className="
          group

          relative

          bg-[#f5f1e9]

          p-2

          pb-8

          shadow-[0_14px_35px_rgba(0,0,0,.30)]

          sm:p-2.5

          sm:pb-10
        "
      >
        {/* PHOTO */}

        <div
          className="
            relative

            aspect-[4/5]

            overflow-hidden

            bg-[#ddd7cf]
          "
        >
          {!failed ? (
            <img
              src={
                moment.image
              }
              alt={
                moment.title
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

                transition-transform
                duration-500

                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex

                h-full
                w-full

                items-center
                justify-center

                bg-gradient-to-br

                from-[#17131e]

                to-[#09070d]

                px-3

                text-center

                font-mono

                text-[6px]

                uppercase

                tracking-[0.15em]

                text-white/35

                sm:text-[8px]
              "
            >
              Add
              <br />

              {moment.image}
            </div>
          )}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-br

              from-white/10

              via-transparent

              to-black/10
            "
          />
        </div>

        {/* CAPTION */}

        <div
          className="
            absolute

            inset-x-1
            bottom-1

            text-center
          "
        >
          <p
            className="
              font-serif

              text-[6px]
              italic

              text-black/65

              sm:text-[9px]
            "
          >
            {moment.caption}
          </p>
        </div>

        {/* HOVER INFO */}

        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[calc(100%+8px)]

            z-[100]

            w-max
            max-w-[220px]

            -translate-x-1/2
            translate-y-2

            rounded-xl

            border
            border-white/10

            bg-black/90

            px-3
            py-2

            text-center

            opacity-0

            shadow-[0_10px_30px_rgba(0,0,0,.45)]

            backdrop-blur-xl

            transition-all
            duration-200

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <p
            className="
              font-mono

              text-[6px]

              uppercase

              tracking-[0.2em]

              text-mauve

              sm:text-[7px]
            "
          >
            {moment.year}
          </p>

          <p
            className="
              mt-1

              text-[8px]
              font-semibold

              text-white

              sm:text-[10px]
            "
          >
            {moment.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   FLOWING TRACE

   This is SECONDARY.
   It only connects photos AFTER they have appeared.
========================================================= */

function FlowingTrace({
  progress,
  start,
  end,
  d,
}: {
  progress:
    MotionValue<number>;

  start:
    number;

  end:
    number;

  d:
    string;
}) {
  const pathLength =
    useTransform(
      progress,
      [start, end],
      [0, 1]
    );

  const opacity =
    useTransform(
      progress,
      [
        start - 0.015,
        start,
      ],
      [0, 1]
    );

  return (
    <>
      {/* GLOW */}

      <motion.path
        d={d}
        fill="none"
        stroke="#d946ef"
        strokeWidth="11"
        strokeLinecap="round"
        filter="url(#experienceGlow)"
        style={{
          pathLength,

          opacity: useTransform(
            opacity,
            [0, 1],
            [0, 0.22]
          ),
        }}
      />

      {/* COLORED STRING */}

      <motion.path
        d={d}
        fill="none"
        stroke="url(#experienceFlow)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,

          opacity,
        }}
      />

      {/* MOVING LIGHT */}

      <motion.path
        d={d}
        fill="none"

        stroke="rgba(255,255,255,.9)"

        strokeWidth="1.4"

        strokeLinecap="round"

        strokeDasharray="9 22"

        style={{
          pathLength,

          opacity,
        }}

        animate={{
          strokeDashoffset: [
            0,
            -62,
          ],
        }}

        transition={{
          duration: 1.15,

          repeat: Infinity,

          ease: "linear",
        }}
      />
    </>
  );
}

/* =========================================================
   FIREWORKS

   Starts only AFTER image 3 is completely revealed.
========================================================= */

const FIREWORK_PARTICLES = [
  {
    x: -110,
    y: -120,
    color: "#d946ef",
    delay: 0,
  },

  {
    x: -72,
    y: -165,
    color: "#f472b6",
    delay: 0.05,
  },

  {
    x: -28,
    y: -195,
    color: "#ffffff",
    delay: 0.1,
  },

  {
    x: 20,
    y: -205,
    color: "#facc15",
    delay: 0.15,
  },

  {
    x: 70,
    y: -170,
    color: "#fb7185",
    delay: 0.2,
  },

  {
    x: 112,
    y: -125,
    color: "#8b5cf6",
    delay: 0.25,
  },

  {
    x: -128,
    y: -70,
    color: "#38bdf8",
    delay: 0.3,
  },

  {
    x: 130,
    y: -68,
    color: "#e879f9",
    delay: 0.35,
  },

  {
    x: -45,
    y: -110,
    color: "#f97316",
    delay: 0.18,
  },

  {
    x: 48,
    y: -105,
    color: "#ffffff",
    delay: 0.22,
  },

  {
    x: 0,
    y: -145,
    color: "#f472b6",
    delay: 0.13,
  },

  {
    x: -90,
    y: -95,
    color: "#facc15",
    delay: 0.28,
  },
];

function Fireworks({
  progress,
}: {
  progress:
    MotionValue<number>;
}) {
  /*
    Image 3 ends at 0.68.

    Fireworks don't begin until 0.80.
  */

  const opacity =
    useTransform(
      progress,
      [0.78, 0.83],
      [0, 1]
    );

  const launchOpacity =
    useTransform(
      progress,
      [0.74, 0.8],
      [0, 1]
    );

  return (
    <motion.div
      style={{
        opacity,
      }}
      className="
        pointer-events-none

        absolute
        inset-0

        z-[65]
      "
    >
      {/* =================================================
          LAUNCH TRAILS FROM BOTTOM
      ================================================= */}

      <motion.div
        style={{
          opacity:
            launchOpacity,
        }}
        className="
          absolute

          bottom-[4%]
          left-[23%]

          h-[190px]
          w-[220px]

          -translate-x-1/2
        "
      >
        {[0, 1, 2].map(
          (
            item
          ) => (
            <motion.span
              key={
                item
              }
              className="
                absolute

                bottom-0

                h-20
                w-[2px]

                rounded-full

                bg-gradient-to-t

                from-transparent

                via-white

                to-transparent

                shadow-[0_0_10px_rgba(255,255,255,.7)]
              "
              style={{
                left:
                  `${
                    42 +
                    item *
                      8
                  }%`,
              }}
              animate={{
                y: [
                  40,
                  -80,
                  -150,
                ],

                opacity: [
                  0,
                  1,
                  0,
                ],

                scaleY: [
                  0.2,
                  1,
                  0.3,
                ],
              }}
              transition={{
                duration:
                  1.1,

                delay:
                  item *
                  0.12,

                repeat:
                  Infinity,

                repeatDelay:
                  1.2,

                ease:
                  "easeOut",
              }}
            />
          )
        )}

        {/* =================================================
            FIREWORK PARTICLES
        ================================================= */}

        {FIREWORK_PARTICLES.map(
          (
            particle,
            index
          ) => (
            <motion.span
              key={
                index
              }
              className="
                absolute

                bottom-[70%]
                left-1/2

                h-2
                w-2

                rounded-full
              "
              style={{
                backgroundColor:
                  particle.color,

                boxShadow:
                  `0 0 8px ${particle.color}, 0 0 18px ${particle.color}`,
              }}
              animate={{
                x: [
                  0,
                  particle.x,
                ],

                y: [
                  0,
                  particle.y,
                ],

                opacity: [
                  0,
                  1,
                  1,
                  0,
                ],

                scale: [
                  0.2,
                  1.25,
                  0.8,
                  0,
                ],
              }}
              transition={{
                duration:
                  1.45,

                delay:
                  particle.delay,

                repeat:
                  Infinity,

                repeatDelay:
                  0.9,

                ease:
                  "easeOut",
              }}
            />
          )
        )}
      </motion.div>

      {/* SECOND SMALL FIREWORK */}

      <div
        className="
          absolute

          bottom-[11%]
          left-[31%]

          h-20
          w-20
        "
      >
        {[
          [-45, -55],
          [0, -72],
          [44, -52],
          [-60, -10],
          [58, -8],
          [-30, 35],
          [30, 35],
        ].map(
          (
            point,
            index
          ) => (
            <motion.span
              key={
                index
              }
              className="
                absolute

                left-1/2
                top-1/2

                h-1.5
                w-1.5

                rounded-full

                bg-white

                shadow-[0_0_10px_rgba(217,70,239,.9)]
              "
              animate={{
                x: [
                  0,
                  point[0],
                ],

                y: [
                  0,
                  point[1],
                ],

                opacity: [
                  0,
                  1,
                  0,
                ],

                scale: [
                  0.3,
                  1,
                  0,
                ],
              }}
              transition={{
                duration:
                  1.3,

                delay:
                  0.25 +
                  index *
                    0.04,

                repeat:
                  Infinity,

                repeatDelay:
                  1.2,
              }}
            />
          )
        )}
      </div>
    </motion.div>
  );
}