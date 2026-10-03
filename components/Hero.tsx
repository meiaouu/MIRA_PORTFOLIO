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
    useSpring(
      mouseX,
      {
        stiffness: 120,
        damping: 20,
      }
    );

  const springY =
    useSpring(
      mouseY,
      {
        stiffness: 120,
        damping: 20,
      }
    );

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

  const letters =
    profile.name.split("");

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
        min-h-screen
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        px-6
        pt-24
        text-center
      "
    >
      {/* =====================================================
          ID / LANYARD

          This stays BEHIND the Hero content.
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          z-0
        "
      >
        <HangingIDCard />
      </div>

      {/* =====================================================
          HERO CONTENT

          z-20 keeps everything above the ID.

          pointer-events-none allows desktop lanyard dragging
          through empty spaces.

          Individual links/buttons turn pointer events back on.
      ===================================================== */}

      <div
        className="
          pointer-events-none
          relative
          z-20
          flex
          w-full
          flex-col
          items-center
          justify-center
        "
      >
        {/* =================================================
            NAME
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
            flex-wrap
            justify-center
          "
        >
          {letters.map(
            (
              letter,
              i
            ) => (
              <motion.span
                key={
                  i
                }
                initial={{
                  y: 160,
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
                    1,

                  delay:
                    0.4 +
                    i *
                      0.05,

                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="
                  inline-block
                "
              >
                <span
                  className="
                    inline-block
                    animate-float
                    font-pixel
                    text-3xl
                    text-white
                    drop-shadow-[0_0_12px_rgba(166,77,121,0.6)]

                    sm:text-4xl

                    md:text-5xl
                  "
                  style={{
                    animationDelay:
                      `${i * 0.15}s`,

                    whiteSpace:
                      letter ===
                      " "
                        ? "pre"
                        : "normal",
                  }}
                >
                  {
                    letter
                  }
                </span>
              </motion.span>
            )
          )}
        </motion.div>

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
            mt-8
            font-mono
            text-lg
            text-mauve

            sm:text-xl
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
            mt-6
            max-w-xl
            text-base
            text-white/60

            sm:text-lg
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

            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
          "
        >
          <a
            href="#projects"
            className="
              rounded-sm
              bg-mauve
              px-7
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_0_30px_-5px_rgba(166,77,121,0.6)]
              transition-transform

              hover:scale-105
              hover:bg-glow
              hover:text-onyx
            "
          >
            View my work
          </a>

          <a
            href="#contact"
            className="
              rounded-sm
              border
              border-white/15
              px-7
              py-3
              text-sm
              font-semibold
              text-white/80
              transition-colors

              hover:border-mauve/60
              hover:text-white
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
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration:
              0.6,
            delay:
              1.7,
          }}
          className="
            pointer-events-auto

            mt-10
            flex
            items-center
            justify-center
            gap-5
            text-xl
            text-white/50
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
              transition-colors
              hover:text-mauve
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
              transition-colors
              hover:text-mauve
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
              transition-colors
              hover:text-mauve
            "
          >
            <FiTwitter />
          </a>
        </motion.div>
      </div>

      {/* =====================================================
          SCROLL ARROW
      ===================================================== */}

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{
          y: [
            0,
            10,
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
          bottom-10
          z-30

          text-2xl
          text-white/40

          hover:text-mauve
        "
      >
        <FiArrowDown />
      </motion.a>
    </section>
  );
}