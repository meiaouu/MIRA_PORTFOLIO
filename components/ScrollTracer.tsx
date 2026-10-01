"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { navLinks } from "@/data/portfolio";

/**
 * Simple pixel-style scroll tracer: a vertical bar on the right edge that
 * fills from top to bottom as you scroll the whole page, made of chunky
 * blocks instead of a smooth gradient, plus one tick per section that
 * lights up once you've scrolled past it.
 */
export default function ScrollTracer() {
  const { scrollYProgress } = useScroll();
  const fillHeight = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden h-[60vh] w-3 -translate-y-1/2 sm:block">
      {/* Track */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Pixelated fill, grows downward as you scroll */}
      <motion.div
        style={{ height: fillHeight }}
        className="absolute top-0 left-0 w-full overflow-hidden"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #A64D79 0px, #A64D79 6px, transparent 6px, transparent 10px)",
            imageRendering: "pixelated",
          }}
        />
      </motion.div>

      {/* One tick per section, lights up once scrolled past its position */}
      {navLinks.map((link, i) => {
        const position = i / (navLinks.length - 1); // evenly spaced, 0 to 1
        return (
          <SectionTick key={link.href} progress={scrollYProgress} position={position} />
        );
      })}
    </div>
  );
}

function SectionTick({
  progress,
  position,
}: {
  progress: MotionValue<number>;
  position: number;
}) {
  const color = useTransform(progress, (p) => (p >= position ? "#A64D79" : "#1A1A1D"));

  return (
    <motion.span
      style={{ top: `${position * 100}%`, backgroundColor: color }}
      className="absolute -right-1 h-2 w-2 -translate-y-1/2 border border-white/20"
    />
  );
}
