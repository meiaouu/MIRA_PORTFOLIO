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
        z-[5]
        h-full
        min-h-screen
        w-full
        overflow-hidden
      "
    >
      {/* =========================================
          DROP FROM TOP EFFECT
      ========================================= */}

      <motion.div
        initial={{
          y: -280,
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 12,
          mass: 1.15,

          // Your intro is about 3.2 seconds,
          // so the ID drops after the intro.
          delay: 3.35,
        }}
        className="
          pointer-events-auto
          absolute
          inset-0
          h-full
          min-h-screen
          w-full
        "
      >
        <LanyardDisplay />
      </motion.div>
    </div>
  );
}