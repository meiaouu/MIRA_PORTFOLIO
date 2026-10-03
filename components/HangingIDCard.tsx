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
      {/* =========================================
          DROP FROM TOP EFFECT
      ========================================= */}

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
    h-full
    min-h-screen
    w-full

    md:pointer-events-auto
  "
>
  <LanyardDisplay />
</motion.div>
    </div>
  );
}