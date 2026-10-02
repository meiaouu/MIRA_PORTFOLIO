"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import AnimatedBackground from "@/components/AnimatedBackground";
import PixelStars from "@/components/PixelStars";
import ScrollTracer from "@/components/ScrollTracer";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/* =========================================================
   INTRO TIMING
========================================================= */

/*
 * At 2.65 seconds:
 *
 * 1. Intro starts sliding upward
 * 2. Main website mounts
 * 3. Hanging ID starts dropping
 *
 * This keeps both animations synchronized.
 */

const INTRO_DURATION = 2650;

export default function Home() {
  const [
    showIntro,
    setShowIntro,
  ] = useState(true);

  const [
    showSite,
    setShowSite,
  ] = useState(false);

  /* =======================================================
     INTRO TIMER
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    const timer =
      window.setTimeout(() => {
        /*
         * Mount site and remove intro
         * in the SAME render cycle.
         */

        setShowSite(true);
        setShowIntro(false);

        document.body.style.overflow =
          "";
      }, INTRO_DURATION);

    return () => {
      window.clearTimeout(
        timer
      );

      document.body.style.overflow =
        "";
    };
  }, []);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-x-clip
        bg-[#08050f]
      "
    >
      {/* =====================================================
          GLOBAL BACKGROUND
      ===================================================== */}

      <AnimatedBackground />

      <PixelStars />

      <ScrollTracer />

      {/* =====================================================
          WEBSITE

          It mounts exactly when the intro starts leaving.
          Because Hero mounts here, HangingIDCard's entrance
          animation also starts here.
      ===================================================== */}

      <AnimatePresence>
        {showSite && (
          <motion.div
            key="website"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <Navbar />

            <Hero />

            <About />

            <Skills />

            <Projects />

            <Experience />

            <Certificates />

            <Resume />

            <Contact />

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <AnimatePresence>
        {showIntro && (
          <motion.section
            key="intro"
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-center
              justify-center

              overflow-hidden

              bg-[#05030a]
            "
            initial={{
              y: "0%",
            }}
            animate={{
              y: "0%",
            }}

            /* ===============================================
               ENTIRE INTRO SLIDES UP
            =============================================== */

            exit={{
              y: "-100%",
            }}
            transition={{
              duration: 0.95,

              ease: [
                0.76,
                0,
                0.24,
                1,
              ],
            }}
          >
            {/* ===============================================
                PURPLE GLOW
            =============================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.1,
              }}
              className="
                pointer-events-none

                absolute
                left-1/2
                top-1/2

                h-[550px]
                w-[550px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                bg-violet-700/[0.09]

                blur-[150px]
              "
            />

            {/* ===============================================
                SMALL SECONDARY GLOW
            =============================================== */}

            <motion.div
              animate={{
                x: [
                  0,
                  30,
                  0,
                ],

                y: [
                  0,
                  -20,
                  0,
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none

                absolute
                left-[20%]
                top-[28%]

                h-[220px]
                w-[220px]

                rounded-full

                bg-fuchsia-500/[0.035]

                blur-[110px]
              "
            />

            {/* ===============================================
                SUBTLE GRID
            =============================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="
                pointer-events-none
                absolute
                inset-0
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(139,92,246,0.035) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(139,92,246,0.035) 1px,
                    transparent 1px
                  )
                `,

                backgroundSize:
                  "55px 55px",

                maskImage:
                  "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
              }}
            />

            {/* =================================================
                CENTER
            ================================================= */}

            <div
              className="
                relative
                z-10

                flex
                flex-col
                items-center

                px-6
                text-center
              "
            >
              {/* =============================================
                  MIRA
              ============================================= */}

              <motion.h1
                initial={{
                  opacity: 0,

                  y: 25,

                  filter:
                    "blur(12px)",

                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,

                  y: 0,

                  filter:
                    "blur(0px)",

                  scale: 1,
                }}
                transition={{
                  duration: 0.9,

                  delay: 0.15,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="
                  font-pixel

                  text-4xl

                  tracking-[0.08em]

                  text-white

                  drop-shadow-[0_0_20px_rgba(166,77,121,0.45)]

                  sm:text-5xl
                  md:text-6xl
                "
              >
                MIRA.
              </motion.h1>

              {/* =============================================
                  SMALL LABEL
              ============================================= */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                }}
                className="
                  mt-5

                  font-mono

                  text-[8px]

                  uppercase

                  tracking-[0.35em]

                  text-white/30

                  sm:text-[9px]
                "
              >
                portfolio loading
              </motion.p>

              {/* =============================================
                  SIMPLE LOADING BAR
              ============================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.65,
                }}
                className="
                  relative

                  mt-6

                  h-[2px]
                  w-[190px]

                  overflow-hidden

                  bg-white/[0.08]

                  sm:w-[230px]
                "
              >
                <motion.div
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 1.75,

                    delay: 0.7,

                    ease: [
                      0.4,
                      0,
                      0.2,
                      1,
                    ],
                  }}
                  style={{
                    transformOrigin:
                      "left center",
                  }}
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-r

                    from-[#6a1e55]
                    via-[#a64d79]
                    to-[#d58eb5]

                    shadow-[0_0_12px_rgba(166,77,121,0.7)]
                  "
                />
              </motion.div>

              {/* =============================================
                  SIMPLE LOADING DOTS
              ============================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.9,
                }}
                className="
                  mt-4

                  flex
                  gap-1.5
                "
              >
                {[0, 1, 2].map(
                  (index) => (
                    <motion.span
                      key={index}
                      animate={{
                        opacity: [
                          0.2,
                          0.9,
                          0.2,
                        ],

                        y: [
                          0,
                          -2,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 0.9,

                        repeat:
                          Infinity,

                        delay:
                          index *
                          0.15,
                      }}
                      className="
                        h-1
                        w-1

                        rounded-full

                        bg-mauve
                      "
                    />
                  )
                )}
              </motion.div>
            </div>

            {/* ===============================================
                BOTTOM FADE

                Makes the slide-up transition blend into
                your Hero background.
            =============================================== */}

            <div
              className="
                pointer-events-none

                absolute
                inset-x-0
                bottom-0

                h-28

                bg-gradient-to-t

                from-[#08050f]
                to-transparent
              "
            />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}