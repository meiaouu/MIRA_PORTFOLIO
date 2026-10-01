"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/portfolio";

/**
 * Two decorative photo "stickers" pinned to the far left/right margins.
 * They slide in from off-screen when the About section scrolls into view,
 * and slide back out (same direction) when scrolled away.
 *
 * Only shows on wide screens (xl+) since laptops/tablets/phones don't have
 * enough margin space beside the content for this to look right.
 *
 * Reuses /public/me1.png (left) and /public/me2.png (right) — swap for
 * different files below if you'd rather use separate images.
 */
export default function AboutSideAccents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden xl:block"
      aria-hidden="true"
    >
      {/* Left accent photo */}
      <motion.div
        initial={{ x: -220, opacity: 0, rotate: -8 }}
        animate={
          isInView
            ? { x: 0, opacity: 1, rotate: -6 }
            : { x: -220, opacity: 0, rotate: -8 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="absolute left-4 top-1/3 h-40 w-32 -translate-y-1/2 2xl:left-10 2xl:h-48 2xl:w-36"
      >
        <div className="glass relative h-full w-full overflow-hidden rounded-2xl border border-mauve/25 shadow-[0_0_30px_-8px_rgba(166,77,121,0.5)]">
          <Image
            src="/me2.jpg"
            alt={profile.name}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </motion.div>

      {/* Right accent photo */}
      <motion.div
        initial={{ x: 220, opacity: 0, rotate: 8 }}
        animate={
          isInView
            ? { x: 0, opacity: 1, rotate: 6 }
            : { x: 220, opacity: 0, rotate: 8 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.08 }}
        className="absolute right-4 top-2/3 h-40 w-32 -translate-y-1/2 2xl:right-10 2xl:h-48 2xl:w-36"
      >
        <div className="glass relative h-full w-full overflow-hidden rounded-2xl border border-mauve/25 shadow-[0_0_30px_-8px_rgba(166,77,121,0.5)]">
          <Image
            src="/me3.jpg"
            alt={profile.name}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </motion.div>
    </div>
  );
}
