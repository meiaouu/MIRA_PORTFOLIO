"use client";

import { useRef } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

import { profile } from "@/data/portfolio";

import TypingText from "./TypingText";
import HangingIDCard from "./HangingIDCard";

export default function Hero() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     MOUSE TILT
  ========================================================= */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const springX =
    useSpring(mouseX, {
      stiffness: 120,
      damping: 20,
    });

  const springY =
    useSpring(mouseY, {
      stiffness: 120,
      damping: 20,
    });

  const rotateX =
    useTransform(
      springY,
      [-40, 40],
      [4, -4]
    );

  const rotateY =
    useTransform(
      springX,
      [-40, 40],
      [-4, 4]
    );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      e.clientX -
        (
          rect.left +
          rect.width / 2
        )
    );

    mouseY.set(
      e.clientY -
        (
          rect.top +
          rect.height / 2
        )
    );
  };

  const handleMouseLeave =
    () => {
      mouseX.set(0);
      mouseY.set(0);
    };

  const nameWords =
    profile.name.split(" ");

  return (
    <section
      id="home"
      ref={
        containerRef
      }
      onMouseMove={
        handleMouseMove
      }
      onMouseLeave={
        handleMouseLeave
      }
      className="
        relative

        flex
        min-h-[100svh]
        w-full

        items-center
        justify-center

        overflow-hidden

        px-5
        pb-24
        pt-24

        text-center

        sm:px-6

        md:min-h-screen
        md:pb-20
        md:pt-24
      "
    >
      {/* =====================================================
          SUBTLE DARK VIOLET GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          left-1/2
          top-[38%]

          z-0

          h-[440px]
          w-[440px]

          -translate-x-1/2

          rounded-full

          bg-[#3b2558]/[0.035]

          blur-[150px]

          md:h-[650px]
          md:w-[650px]
        "
      />

      {/* =====================================================
          LANYARD
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          z-[1]
        "
      >
        <HangingIDCard />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          pointer-events-none

          relative
          z-20

          flex
          w-full
          max-w-6xl

          flex-col
          items-center
          justify-center
        "
      >
        {/* =================================================
            MOBILE NAME

            Always:
            Marjorie
            Pulmones
        ================================================= */}

        <motion.div
          style={{
            rotateX,
            rotateY,
            perspective:
              800,
          }}
          className="
            mx-auto

            flex
            w-full

            flex-col
            items-center
            justify-center

            gap-y-2

            md:hidden
          "
        >
          {nameWords.map(
            (
              word,
              wordIndex
            ) => (
              <motion.span
                key={
                  wordIndex
                }
                initial={{
                  y: 70,
                  opacity:
                    0,
                }}
                animate={{
                  y: 0,
                  opacity:
                    1,
                }}
                transition={{
                  duration:
                    0.9,

                  delay:
                    0.35 +
                    wordIndex *
                      0.12,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="
                  whitespace-nowrap

                  font-pixel

                  text-[22px]

                  leading-[1.35]

                  text-white

                  drop-shadow-[0_0_12px_rgba(255,255,255,0.14)]

                  sm:text-3xl
                "
              >
                {
                  word
                }
              </motion.span>
            )
          )}
        </motion.div>

        {/* =================================================
            DESKTOP NAME

            One line only.
            No flex-wrap.
            No per-letter layout.
        ================================================= */}

        <motion.h1
          style={{
            rotateX,
            rotateY,
            perspective:
              800,
          }}
          initial={{
            y: 70,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration:
              1,

            delay:
              0.4,

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            hidden

            whitespace-nowrap

            font-pixel

            leading-none

            text-white

            drop-shadow-[0_0_14px_rgba(255,255,255,0.14)]

            md:block
            md:text-[4px]
lg:text-[1px]
xl:text-[40px]
          "
        >
          {
            profile.name
          }
        </motion.h1>

        {/* =================================================
            MOBILE DIVIDER
        ================================================= */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: 74,
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.7,
          }}
          className="
            mt-5

            h-px

            bg-gradient-to-r
            from-transparent
            via-white/45
            to-transparent

            md:hidden
          "
        />

        {/* =================================================
            ROLE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              0.6,
            delay:
              1.2,
          }}
          className="
            mt-5

            min-h-[28px]

            font-mono

            text-sm

            text-[#c9c7cf]

            sm:text-base

            md:mt-8
            md:text-lg

            lg:text-xl
          "
        >
          <TypingText
            words={
              profile.roles
            }
          />
        </motion.p>

        {/* =================================================
            TAGLINE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              0.6,
            delay:
              1.4,
          }}
          className="
            mx-auto

            mt-4

            max-w-[360px]

            text-[13px]
            leading-6

            text-white/50

            sm:max-w-md
            sm:text-sm

            md:mt-6
            md:max-w-xl
            md:text-base
            md:leading-relaxed

            lg:text-lg
          "
        >
          {
            profile.tagline
          }
        </motion.p>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              0.6,
            delay:
              1.55,
          }}
          className="
            pointer-events-auto

            mt-7

            flex
            w-full
            max-w-[320px]

            flex-col
            items-center
            justify-center

            gap-3

            sm:max-w-none
            sm:flex-row

            md:mt-9
            md:gap-4
          "
        >
          <a
            href="#projects"
            className="
              group

              relative

              flex
              w-full

              items-center
              justify-center

              overflow-hidden

              rounded-lg

              bg-white

              px-7
              py-3.5

              text-sm
              font-semibold

              text-black

              shadow-[0_12px_34px_-14px_rgba(255,255,255,0.30)]

              transition-all
              duration-300

              active:scale-[0.98]

              hover:scale-[1.03]
              hover:bg-[#3b2558]
              hover:text-white

              sm:w-auto
              sm:rounded-sm
              sm:py-3
            "
          >
            <span
              className="
                relative
                z-10
              "
            >
              View my work
            </span>

            <span
              className="
                pointer-events-none

                absolute
                -left-12
                top-0

                h-full
                w-10

                -skew-x-12

                bg-white/25

                blur-sm

                transition-transform
                duration-700

                group-hover:translate-x-[360px]
              "
            />
          </a>

          <a
            href="#contact"
            className="
              flex
              w-full

              items-center
              justify-center

              rounded-lg

              border
              border-white/15

              bg-black/20

              px-7
              py-3.5

              text-sm
              font-semibold

              text-white/75

              backdrop-blur-md

              transition-all
              duration-300

              active:scale-[0.98]

              hover:border-white/40
              hover:bg-white/[0.06]
              hover:text-white

              sm:w-auto
              sm:rounded-sm
              sm:py-3
            "
          >
            Get in touch
          </a>
        </motion.div>

        {/* =================================================
            SOCIAL LINKS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration:
              0.6,
            delay:
              1.7,
          }}
          className="
            pointer-events-auto

            mt-7

            flex
            items-center
            justify-center

            gap-2

            text-lg
            text-white/45

            md:mt-9
            md:gap-5
            md:text-xl
          "
        >
          <a
            href={
              profile
                .socials
                .github
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.06]

              bg-black/20

              transition-all

              hover:border-white/20
              hover:bg-white/[0.05]
              hover:text-white

              md:h-auto
              md:w-auto
              md:border-0
              md:bg-transparent
            "
          >
            <FiGithub />
          </a>

          <a
            href={
              profile
                .socials
                .linkedin
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.06]

              bg-black/20

              transition-all

              hover:border-white/20
              hover:bg-white/[0.05]
              hover:text-white

              md:h-auto
              md:w-auto
              md:border-0
              md:bg-transparent
            "
          >
            <FiLinkedin />
          </a>

          <a
            href={
              profile
                .socials
                .twitter
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.06]

              bg-black/20

              transition-all

              hover:border-white/20
              hover:bg-white/[0.05]
              hover:text-white

              md:h-auto
              md:w-auto
              md:border-0
              md:bg-transparent
            "
          >
            <FiTwitter />
          </a>
        </motion.div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{
          y: [
            0,
            8,
            0,
          ],
        }}
        transition={{
          duration:
            1.8,

          repeat:
            Infinity,

          ease:
            "easeInOut",
        }}
        className="
          pointer-events-auto

          absolute

          bottom-6
          left-1/2

          z-30

          flex
          h-9
          w-9

          -translate-x-1/2

          items-center
          justify-center

          rounded-full

          border
          border-white/[0.08]

          bg-black/20

          text-base
          text-white/35

          backdrop-blur-md

          transition-colors

          hover:text-white

          md:bottom-10
          md:h-auto
          md:w-auto
          md:border-0
          md:bg-transparent
          md:text-2xl
          md:backdrop-blur-none
        "
      >
        <FiArrowDown />
      </motion.a>
    </section>
  );
}