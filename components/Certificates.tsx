"use client";

import { useRef } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import SectionHeading from "./SectionHeading";
import InfiniteMenu from "./InfiniteMenu";

import { certificates } from "@/data/portfolio";

/* =========================================================
   CERTIFICATE TYPE
========================================================= */

type Certificate =
  (typeof certificates)[number];

type DisplayCertificate =
  Certificate & {
    image: string;
    number: string;
  };

/* =========================================================
   CERTIFICATE IMAGES

   public/
   └── certificates/
       ├── cert-1.jpg
       ├── cert-2.jpg
       ├── cert-3.jpg
       └── ...
========================================================= */

const certificateItems: DisplayCertificate[] =
  certificates.map(
    (
      certificate,
      index
    ) => ({
      ...certificate,

      image:
        `/certificates/cert-${index + 1}.jpg`,

      number:
        String(
          index + 1
        ).padStart(
          2,
          "0"
        ),
    })
  );

/* =========================================================
   INFINITE MENU ITEMS
========================================================= */

const menuItems =
  certificateItems.map(
    certificate => ({
      image:
        certificate.image,

      link:
        certificate.url &&
        certificate.url !== "#"
          ? certificate.url
          : "",

      title:
        certificate.title,

      description:
        `${certificate.issuer} • ${certificate.year}`,
    })
  );

/* =========================================================
   CERTIFICATES
========================================================= */

export default function Certificates() {
  const sectionRef =
    useRef<HTMLElement>(
      null
    );

  /* =======================================================
     SCROLL PROGRESS

     0.00 = section is entering from below
     0.50 = section is centered in viewport
     1.00 = section is leaving above
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

  /* Smooth the scroll-linked animation. */
  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 85,
        damping: 25,
        mass: 0.7,
      }
    );

  /* =======================================================
     SPHERE / GALLERY ENTER + EXIT
  ======================================================= */

  const sphereOpacity =
    useTransform(
      smoothProgress,
      [
        0,
        0.12,
        0.82,
        1,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const sphereScale =
    useTransform(
      smoothProgress,
      [
        0,
        0.16,
        0.82,
        1,
      ],
      [
        0.82,
        1,
        1,
        0.9,
      ]
    );

  const sphereY =
    useTransform(
      smoothProgress,
      [
        0,
        0.16,
        0.82,
        1,
      ],
      [
        110,
        0,
        0,
        -110,
      ]
    );

  /* =======================================================
     HEADING ENTER + EXIT
  ======================================================= */

  const headingOpacity =
    useTransform(
      smoothProgress,
      [
        0.04,
        0.16,
        0.78,
        0.92,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const headingY =
    useTransform(
      smoothProgress,
      [
        0,
        0.18,
        0.78,
        1,
      ],
      [
        55,
        0,
        0,
        -55,
      ]
    );

  /* =======================================================
     SIDE LABELS
  ======================================================= */

  const sideOpacity =
    useTransform(
      smoothProgress,
      [
        0.08,
        0.2,
        0.78,
        0.9,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const leftLabelX =
    useTransform(
      smoothProgress,
      [
        0,
        0.2,
        0.8,
        1,
      ],
      [
        -35,
        0,
        0,
        -35,
      ]
    );

  const rightLabelX =
    useTransform(
      smoothProgress,
      [
        0,
        0.2,
        0.8,
        1,
      ],
      [
        35,
        0,
        0,
        35,
      ]
    );

  /* =======================================================
     BOTTOM HELPER
  ======================================================= */

  const helperOpacity =
    useTransform(
      smoothProgress,
      [
        0.12,
        0.24,
        0.74,
        0.88,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const helperY =
    useTransform(
      smoothProgress,
      [
        0,
        0.24,
        0.76,
        1,
      ],
      [
        25,
        0,
        0,
        25,
      ]
    );

  /* =======================================================
     BACKGROUND GLOW
  ======================================================= */

  const glowOpacity =
    useTransform(
      smoothProgress,
      [
        0,
        0.18,
        0.82,
        1,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const glowScale =
    useTransform(
      smoothProgress,
      [
        0,
        0.22,
        0.8,
        1,
      ],
      [
        0.75,
        1,
        1,
        1.2,
      ]
    );

  /* =======================================================
     CIRCLE REVEAL / HIDE

     ENTER:
     small circle -> expands to reveal whole section

     EXIT:
     full section -> closes back into a circle
  ======================================================= */

  const circleClip =
    useTransform(
      smoothProgress,
      [
        0,
        0.18,
        0.82,
        1,
      ],
      [
        "circle(0% at 50% 50%)",
        "circle(150% at 50% 50%)",
        "circle(150% at 50% 50%)",
        "circle(0% at 50% 50%)",
      ]
    );

  const ringScale =
    useTransform(
      smoothProgress,
      [
        0,
        0.18,
        0.82,
        1,
      ],
      [
        0.25,
        3.7,
        3.7,
        0.25,
      ]
    );

  const ringOpacity =
    useTransform(
      smoothProgress,
      [
        0,
        0.07,
        0.22,
        0.78,
        0.93,
        1,
      ],
      [
        0,
        0.75,
        0.15,
        0.15,
        0.75,
        0,
      ]
    );

  return (
    <section
      ref={
        sectionRef
      }
      id="certificates"
      className="
        relative
        isolate
        z-10

        h-[100svh]
        min-h-[720px]
        w-full

        overflow-hidden

        bg-transparent
      "
    >
      {/* =================================================
          CIRCULAR IN / OUT REVEAL
      ================================================= */}

      <motion.div
        style={{
          clipPath:
            circleClip,
          WebkitClipPath:
            circleClip,
        }}
        className="
          absolute
          inset-0

          h-full
          w-full

          overflow-hidden

          bg-[#050506]

          will-change-[clip-path]
        "
      >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-20

          bg-[#050506]
        "
      />

      {/* =================================================
          CENTER VIOLET ATMOSPHERE
      ================================================= */}

      <motion.div
        aria-hidden="true"
        style={{
          opacity:
            glowOpacity,

          scale:
            glowScale,
        }}
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2
          -z-10

          h-[65vw]
          max-h-[900px]
          min-h-[500px]

          w-[65vw]
          max-w-[900px]
          min-w-[500px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[#3b2558]/[0.08]

          blur-[180px]

          will-change-transform
        "
      />

      {/* =================================================
          SECONDARY GLOWS
      ================================================= */}

      <motion.div
        aria-hidden="true"
        style={{
          opacity:
            glowOpacity,
        }}
        className="
          pointer-events-none

          absolute
          -left-[150px]
          top-[30%]
          -z-10

          h-[450px]
          w-[450px]

          rounded-full

          bg-white/[0.018]

          blur-[150px]
        "
      />

      <motion.div
        aria-hidden="true"
        style={{
          opacity:
            glowOpacity,
        }}
        className="
          pointer-events-none

          absolute
          -right-[160px]
          bottom-[10%]
          -z-10

          h-[500px]
          w-[500px]

          rounded-full

          bg-[#3b2558]/[0.05]

          blur-[160px]
        "
      />

      {/* =================================================
          CIRCLE EDGE / PORTAL RING

          This makes the circular reveal visible even on
          an already-dark page.
      ================================================= */}

      <motion.div
        aria-hidden="true"
        style={{
          scale:
            ringScale,

          opacity:
            ringOpacity,
        }}
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2
          z-[9]

          h-[34vmin]
          w-[34vmin]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-white/15

          shadow-[0_0_35px_rgba(255,255,255,0.06),0_0_90px_rgba(59,37,88,0.22),inset_0_0_50px_rgba(117,82,158,0.06)]

          will-change-transform
        "
      />

      <motion.div
        aria-hidden="true"
        style={{
          scale:
            ringScale,

          opacity:
            ringOpacity,
        }}
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2
          z-[8]

          h-[30vmin]
          w-[30vmin]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-[#75529e]/20

          blur-[0.2px]

          will-change-transform
        "
      />

      {/* =================================================
          FULL-SCREEN SPHERE

          ENTER:
          moves upward + grows + fades in

          EXIT:
          moves upward + shrinks + fades out
      ================================================= */}

      <motion.div
        style={{
          opacity:
            sphereOpacity,

          scale:
            sphereScale,

          y:
            sphereY,
        }}
        className="
          absolute
          inset-0
          z-10

          h-full
          w-full

          origin-center

          will-change-transform
        "
      >
        <InfiniteMenu
          items={
            menuItems
          }
          scale={1.08}
          imageFit="contain"
          backgroundColor="#050506"
        />
      </motion.div>

      {/* =================================================
          HEADING
      ================================================= */}

      <motion.div
        style={{
          opacity:
            headingOpacity,

          y:
            headingY,
        }}
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-30

          px-5
          pt-20

          sm:px-8
          sm:pt-24

          md:px-10

          lg:px-14

          will-change-transform
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
          "
        >
          <SectionHeading
            eyebrow="Certificates"
            title="Credentials & courses"
          />

          <p
            className="
              mx-auto
              -mt-3

              max-w-xl

              text-center

              font-mono
              text-[8px]

              uppercase
              tracking-[0.22em]

              text-white/30

              sm:text-[9px]

              md:text-[10px]
            "
          >
            Drag to explore my certificates
          </p>
        </div>
      </motion.div>

      {/* =================================================
          ARCHIVE LABEL
      ================================================= */}

      <motion.div
        style={{
          opacity:
            sideOpacity,

          x:
            leftLabelX,
        }}
        className="
          pointer-events-none

          absolute
          left-5
          top-[190px]
          z-30

          hidden

          items-center
          gap-2

          font-mono
          text-[8px]

          uppercase
          tracking-[0.22em]

          text-white/20

          md:flex

          lg:left-10

          will-change-transform
        "
      >
        <span
          className="
            h-1.5
            w-1.5

            rounded-full

            bg-[#75529e]

            shadow-[0_0_12px_rgba(117,82,158,0.6)]
          "
        />

        Interactive archive
      </motion.div>

      {/* =================================================
          CERTIFICATE COUNTER
      ================================================= */}

      <motion.div
        style={{
          opacity:
            sideOpacity,

          x:
            rightLabelX,
        }}
        className="
          pointer-events-none

          absolute
          right-5
          top-[190px]
          z-30

          hidden

          font-mono
          text-[8px]

          uppercase
          tracking-[0.2em]

          text-white/20

          md:block

          lg:right-10

          will-change-transform
        "
      >
        {String(
          certificateItems.length
        ).padStart(
          2,
          "0"
        )}{" "}
        certificates
      </motion.div>

      {/* =================================================
          BOTTOM HELP
      ================================================= */}

      <motion.div
        style={{
          opacity:
            helperOpacity,

          y:
            helperY,
        }}
        className="
          pointer-events-none

          absolute
          bottom-5
          left-1/2
          z-30

          -translate-x-1/2

          whitespace-nowrap

          rounded-full

          border
          border-white/[0.08]

          bg-black/50

          px-4
          py-2

          font-mono
          text-[7px]

          uppercase
          tracking-[0.18em]

          text-white/35

          shadow-[0_12px_40px_rgba(0,0,0,0.5)]

          backdrop-blur-xl

          sm:bottom-7
          sm:px-5
          sm:text-[8px]

          will-change-transform
        "
      >
        drag / swipe to rotate
        &nbsp; • &nbsp;
        click to preview
      </motion.div>

      {/* =================================================
          TOP FADE
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-20

          h-[190px]

          bg-gradient-to-b
          from-[#050506]
          via-[#050506]/75
          to-transparent
        "
      />

      {/* =================================================
          BOTTOM FADE
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-20

          h-[90px]

          bg-gradient-to-t
          from-[#050506]
          via-[#050506]/50
          to-transparent
        "
      />

      {/* =================================================
          EDGE LINES
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-30

          h-px

          bg-white/[0.05]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-30

          h-px

          bg-white/[0.05]
        "
      />
      </motion.div>
    </section>
  );
}
