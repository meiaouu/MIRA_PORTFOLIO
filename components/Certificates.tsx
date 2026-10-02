"use client";

import {
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  FiAward,
  FiExternalLink,
  FiX,
} from "react-icons/fi";

import SectionHeading from "./SectionHeading";

import {
  certificates,
} from "@/data/portfolio";

type Certificate =
  (typeof certificates)[number];

type DisplayCertificate =
  Certificate & {
    image: string;
    number: string;
  };

/* =========================================================
   CERTIFICATE IMAGES

   Put your certificate screenshots here:

   public/
   └── certificates/
       ├── cert-1.png
       ├── cert-2.png
       └── cert-3.png
========================================================= */

const certificateItems: DisplayCertificate[] =
  certificates.map(
    (certificate, index) => ({
      ...certificate,

      image:
        `/certificates/cert-${index + 1}.png`,

      number: String(
        index + 1
      ).padStart(
        2,
        "0"
      ),
    })
  );

/* =========================================================
   REPEAT ITEMS

   There are only a few certificates right now,
   so we repeat them to create a long horizontal gallery.
========================================================= */

const topRow = [
  ...certificateItems,
  ...certificateItems,
];

const bottomRow = [
  ...[...certificateItems].reverse(),
  ...[...certificateItems].reverse(),
];

/* =========================================================
   CERTIFICATES
========================================================= */

export default function Certificates() {
  const sectionRef =
    useRef<HTMLElement>(
      null
    );

  const [
    selected,
    setSelected,
  ] =
    useState<DisplayCertificate | null>(
      null
    );

  /* =======================================================
     SCROLL
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target:
      sectionRef,

    offset: [
      "start end",
      "end start",
    ],
  });

  /*
   * Smooths the movement.
   *
   * Lower stiffness = slower / smoother.
   * This is intentionally medium speed.
   */

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 65,
        damping: 24,
        mass: 0.85,
      }
    );

  /* =======================================================
     TOP ROW → LEFT
  ======================================================= */

  const topX =
    useTransform(
      smoothProgress,
      [0, 1],

      [
        "8%",
        "-32%",
      ]
    );

  /* =======================================================
     BOTTOM ROW → RIGHT
  ======================================================= */

  const bottomX =
    useTransform(
      smoothProgress,
      [0, 1],

      [
        "-32%",
        "8%",
      ]
    );

  /* =======================================================
     SMALL PARALLAX
  ======================================================= */

  const headingY =
    useTransform(
      smoothProgress,
      [0, 1],

      [35, -35]
    );

  const glowX =
    useTransform(
      smoothProgress,
      [0, 1],

      [-80, 80]
    );

  return (
    <>
      <section
        ref={
          sectionRef
        }
        id="certificates"
        className="
          relative
          h-[185vh]
          sm:h-[200vh]
          lg:h-[215vh]
        "
      >
        {/* =================================================
            STICKY SCREEN
        ================================================= */}

        <div
          className="
            sticky
            top-0

            flex
            min-h-screen
            w-full
            flex-col
            justify-center

            overflow-hidden

            py-20
            sm:py-24
          "
        >
          {/* ===============================================
              BACKGROUND GLOW
          =============================================== */}

          <motion.div
            style={{
              x: glowX,
            }}
            className="
              pointer-events-none

              absolute
              left-1/2
              top-1/2

              h-[550px]
              w-[750px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-[#8f4d91]/10

              blur-[150px]
            "
          />

          {/* ===============================================
              TOP GLOW
          =============================================== */}

          <div
            className="
              pointer-events-none

              absolute
              left-[10%]
              top-[10%]

              h-[260px]
              w-[260px]

              rounded-full

              bg-purple-500/[0.07]

              blur-[100px]
            "
          />

          {/* ===============================================
              HEADING
          =============================================== */}

          <motion.div
            style={{
              y: headingY,
            }}
            className="
              relative
              z-20

              mx-auto
              mb-10

              w-full
              max-w-6xl

              px-6

              sm:mb-12
            "
          >
            <SectionHeading
              eyebrow="Certificates"
              title="Credentials & courses"
            />

            <p
              className="
                mx-auto
                -mt-5
                max-w-xl

                text-center

                font-mono
                text-[9px]
                uppercase
                tracking-[0.25em]

                text-white/30

                sm:text-[10px]
              "
            >
            </p>
          </motion.div>

          {/* =================================================
              TOP ROW — MOVES LEFT
          ================================================= */}

          <div
            className="
              relative
              z-10

              mb-4

              w-full

              overflow-visible

              sm:mb-6
            "
          >
            <motion.div
              style={{
                x: topX,
              }}
              className="
                flex
                w-max

                items-stretch

                gap-3

                will-change-transform

                sm:gap-5
                lg:gap-6
              "
            >
              {topRow.map(
                (
                  cert,
                  index
                ) => (
                  <CertificateCard
                    key={`top-${cert.title}-${index}`}
                    cert={
                      cert
                    }
                    row="top"
                    onClick={() =>
                      setSelected(
                        cert
                      )
                    }
                  />
                )
              )}
            </motion.div>
          </div>

          {/* =================================================
              BOTTOM ROW — MOVES RIGHT
          ================================================= */}

          <div
            className="
              relative
              z-10

              w-full

              overflow-visible
            "
          >
            <motion.div
              style={{
                x: bottomX,
              }}
              className="
                flex
                w-max

                items-stretch

                gap-3

                will-change-transform

                sm:gap-5
                lg:gap-6
              "
            >
              {bottomRow.map(
                (
                  cert,
                  index
                ) => (
                  <CertificateCard
                    key={`bottom-${cert.title}-${index}`}
                    cert={
                      cert
                    }
                    row="bottom"
                    onClick={() =>
                      setSelected(
                        cert
                      )
                    }
                  />
                )
              )}
            </motion.div>
          </div>

          {/* ===============================================
              SIDE FADES
          =============================================== */}

          <div
            className="
              pointer-events-none

              absolute
              inset-y-0
              left-0

              z-20

              w-[6vw]

              bg-gradient-to-r

              from-[#08050f]
              to-transparent

              sm:w-[10vw]
            "
          />

          <div
            className="
              pointer-events-none

              absolute
              inset-y-0
              right-0

              z-20

              w-[6vw]

              bg-gradient-to-l

              from-[#08050f]
              to-transparent

              sm:w-[10vw]
            "
          />

          {/* ===============================================
              SCROLL INDICATOR
          =============================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: false,
            }}
            className="
              pointer-events-none

              absolute
              bottom-8
              left-1/2

              z-30

              -translate-x-1/2

              font-mono

              text-[8px]

              uppercase

              tracking-[0.28em]

              text-white/20
            "
          >
            scroll
            &nbsp;↓
          </motion.div>
        </div>
      </section>

      {/* =================================================
          MODAL
      ================================================= */}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelected(
                null
              )
            }
            className="
              fixed
              inset-0

              z-[100]

              flex
              items-center
              justify-center

              bg-[#08050f]/90

              p-4

              backdrop-blur-xl

              sm:p-8
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 25,
              }}
              transition={{
                type:
                  "spring",

                stiffness:
                  220,

                damping:
                  22,
              }}
              onClick={(
                event
              ) =>
                event.stopPropagation()
              }
              className="
                relative

                w-full
                max-w-3xl

                overflow-hidden

                rounded-2xl

                border
                border-white/10

                bg-[#100b18]

                shadow-[0_40px_120px_rgba(0,0,0,.7)]
              "
            >
              {/* CLOSE */}

              <button
                onClick={() =>
                  setSelected(
                    null
                  )
                }
                aria-label="Close"
                className="
                  absolute
                  right-4
                  top-4

                  z-30

                  flex
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-black/40

                  text-white/60

                  backdrop-blur-md

                  transition

                  hover:bg-white/10
                  hover:text-white
                "
              >
                <FiX />
              </button>

              {/* CERTIFICATE IMAGE */}

              <div
                className="
                  relative

                  aspect-[16/10]

                  w-full

                  overflow-hidden

                  bg-[#0c0811]
                "
              >
                <img
                  src={
                    selected.image
                  }
                  alt={
                    selected.title
                  }
                  className="
                    h-full
                    w-full

                    object-contain

                    p-3

                    sm:p-6
                  "
                />

                <div
                  className="
                    pointer-events-none

                    absolute
                    inset-0

                    bg-gradient-to-t

                    from-[#100b18]
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              {/* DETAILS */}

              <div
                className="
                  relative

                  p-6

                  sm:p-8
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <span
                    className="
                      flex
                      h-11
                      w-11

                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      bg-gradient-to-br

                      from-violet
                      to-mauve

                      text-xl
                      text-white
                    "
                  >
                    <FiAward />
                  </span>

                  <div>
                    <h3
                      className="
                        font-display

                        text-lg
                        font-semibold

                        text-white

                        sm:text-2xl
                      "
                    >
                      {
                        selected.title
                      }
                    </h3>

                    <p
                      className="
                        mt-2

                        font-mono

                        text-[10px]

                        uppercase

                        tracking-[0.18em]

                        text-white/40
                      "
                    >
                      {
                        selected.issuer
                      }

                      {" • "}

                      {
                        selected.year
                      }
                    </p>
                  </div>
                </div>

                <a
                  href={
                    selected.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-7

                    inline-flex

                    items-center
                    gap-2

                    rounded-full

                    border
                    border-mauve/50

                    bg-mauve/10

                    px-5
                    py-2.5

                    font-mono

                    text-[10px]

                    uppercase

                    tracking-[0.15em]

                    text-white

                    transition

                    hover:bg-mauve/25
                  "
                >
                  <FiExternalLink />

                  View credential
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   CERTIFICATE CARD
========================================================= */

function CertificateCard({
  cert,
  row,
  onClick,
}: {
  cert: DisplayCertificate;

  row:
    | "top"
    | "bottom";

  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={
        onClick
      }
      whileHover={{
        y: -7,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative

        h-[175px]
        w-[260px]

        shrink-0

        overflow-hidden

        rounded-xl

        border
        border-white/[0.09]

        bg-[#100b18]

        text-left

        shadow-[0_18px_45px_rgba(0,0,0,.35)]

        sm:h-[210px]
        sm:w-[330px]

        md:h-[225px]
        md:w-[360px]

        lg:h-[240px]
        lg:w-[390px]

        xl:h-[250px]
        xl:w-[420px]
      "
    >
      {/* ===============================================
          IMAGE
      =============================================== */}

      <div
        className="
          absolute
          inset-0

          overflow-hidden

          bg-gradient-to-br

          from-[#21152d]
          via-[#120c19]
          to-[#08050d]
        "
      >
        <img
          src={
            cert.image
          }
          alt=""
          draggable={
            false
          }
          className="
            h-full
            w-full

            object-cover

            opacity-80

            transition

            duration-700

            group-hover:scale-105
            group-hover:opacity-100
          "
        />
      </div>

      {/* DARK OVERLAY */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t

          from-black/90
          via-black/20
          to-black/5
        "
      />

      {/* PURPLE GLOW */}

      <div
        className="
          pointer-events-none

          absolute
          -right-16
          -top-16

          h-40
          w-40

          rounded-full

          bg-mauve/20

          blur-[60px]

          opacity-0

          transition-opacity

          duration-500

          group-hover:opacity-100
        "
      />

      {/* ===============================================
          NUMBER
      =============================================== */}

      <span
        className="
          absolute
          left-4
          top-4

          font-mono

          text-[8px]

          uppercase

          tracking-[0.3em]

          text-white/40
        "
      >
        {
          cert.number
        }
      </span>

      {/* DIRECTION LABEL */}

      <span
        className="
          absolute
          right-4
          top-4

          font-mono

          text-[8px]

          uppercase

          tracking-[0.18em]

          text-white/25
        "
      >
        {row ===
        "top"
          ? "←"
          : "→"}
      </span>

      {/* ===============================================
          DETAILS
      =============================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          z-10

          p-4

          sm:p-5
        "
      >
        <div
          className="
            mb-2

            flex
            items-center
            gap-2
          "
        >
          <FiAward
            className="
              text-mauve
            "
          />

          <span
            className="
              font-mono

              text-[8px]

              uppercase

              tracking-[0.2em]

              text-mauve
            "
          >
            {
              cert.year
            }
          </span>
        </div>

        <h3
          className="
            max-w-[90%]

            font-display

            text-sm

            font-semibold

            leading-snug

            text-white

            sm:text-base
          "
        >
          {
            cert.title
          }
        </h3>

        <p
          className="
            mt-2

            font-mono

            text-[8px]

            uppercase

            tracking-[0.15em]

            text-white/40

            sm:text-[9px]
          "
        >
          {
            cert.issuer
          }
        </p>
      </div>

      {/* BORDER HIGHLIGHT */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-xl

          border
          border-mauve/0

          transition-all

          duration-300

          group-hover:border-mauve/50

          group-hover:shadow-[inset_0_0_25px_rgba(166,77,121,.08)]
        "
      />
    </motion.button>
  );
}