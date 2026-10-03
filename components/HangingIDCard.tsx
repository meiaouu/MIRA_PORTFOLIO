"use client";

import { motion } from "framer-motion";
import LanyardDisplay from "./LanyardDisplay";

export default function HangingIDCard() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        min-h-screen
        w-full
        overflow-hidden

        md:z-[5]
      "
    >
      {/* =====================================================
          MOBILE BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-100px]
          top-[20%]
          z-0
          h-[380px]
          w-[380px]
          rounded-full
          bg-mauve/10
          blur-[90px]

          md:hidden
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-[40%]
          z-0
          h-[300px]
          w-[300px]
          rounded-full
          bg-violet/10
          blur-[100px]

          md:hidden
        "
      />

      {/* =====================================================
          DROP FROM TOP
      ===================================================== */}

      <motion.div
        initial={{
          y: "-78vh",
        }}
        animate={{
          y: "0vh",
        }}
        transition={{
          type: "spring",
          stiffness: 52,
          damping: 10,
          mass: 1.35,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          h-full
          min-h-screen
          w-full

          md:pointer-events-auto
        "
      >
        {/* ===================================================
            RESPONSIVE LANYARD WRAPPER

            MOBILE:
            - smaller
            - darker
            - faded
            - background appearance
            - cannot block buttons

            DESKTOP:
            - normal size
            - full brightness
            - interactive
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            origin-top

            scale-[0.82]
            translate-y-[5vh]
            translate-x-[5vw]

            opacity-[0.58]

            [filter:brightness(.75)_saturate(.85)]

            md:translate-x-0
            md:translate-y-0
            md:scale-100
            md:opacity-100
            md:[filter:none]
          "
        >
          <LanyardDisplay />
        </div>
      </motion.div>

      {/* =====================================================
          MOBILE SOFT OVERLAY

          Helps your Hero text remain readable over the ID.
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20

          bg-gradient-to-r
          from-[#08050f]/80
          via-[#08050f]/25
          to-transparent

          md:hidden
        "
      />

      {/* =====================================================
          MOBILE BOTTOM FADE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-20
          h-[28%]

          bg-gradient-to-t
          from-[#08050f]
          via-[#08050f]/55
          to-transparent

          md:hidden
        "
      />
    </div>
  );
}