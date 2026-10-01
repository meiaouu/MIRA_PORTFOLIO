"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "@/data/portfolio";

/**
 * Photo card that pops IN (scale + rotate spring + bounce) when scrolled
 * into view, then settles into a slow idle float. Pops OUT the same way
 * when scrolled past, in either direction. Tilts and glows toward the
 * cursor while hovered; hovering also crossfades between me1.png/me2.png.
 *
 * Add your own photos to /public/me1.png and /public/me2.png.
 */
export default function AboutPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  // amount: 0.4 -> triggers once 40% of the card is visible; re-fires
  // every time (no `once`), so it pops out again when scrolled away.
  const isInView = useInView(containerRef, { amount: 0.4 });
  const [hovered, setHovered] = useState(false);

  // Cursor tilt, smoothed with a spring.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springY, [-40, 40], [8, -8]);
  const rotateY = useTransform(springX, [-40, 40], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    tiltX.set(e.clientX - (rect.left + rect.width / 2));
    tiltY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    setHovered(false);
  };

  // Deterministic pixel particles behind the card — no Math.random.
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i * 53) % 100,
        top: (i * 37) % 100,
        size: 3 + (i % 3),
        delay: (i % 7) * 0.2,
      })),
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="relative aspect-square w-full max-w-sm"
      style={{ perspective: 900 }}
    >
      {/* Pixel particles behind the card */}
      <div className="pointer-events-none absolute -inset-6 -z-10" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute animate-pulseGlow bg-mauve/70"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {isInView && (
          <motion.div
            key="photo-pop"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className="absolute inset-0"
          >
            {/* Idle float lives on its own wrapper (plain CSS animation),
                separate from the tilt wrapper below (Framer Motion style)
                so the two don't fight over the `transform` property. */}
            <div className="h-full w-full animate-float">
              <motion.div
                style={{ rotateX, rotateY }}
                className="glass relative h-full w-full overflow-hidden rounded-3xl transition-shadow duration-300"
              >
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-3xl border-2 transition-colors duration-300"
                  style={{
                    borderColor: hovered ? "#C8ACD6" : "rgba(166,77,121,0.2)",
                    boxShadow: hovered
                      ? "0 0 40px -5px rgba(200,172,214,0.6)"
                      : "0 0 20px -8px rgba(166,77,121,0.3)",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={hovered ? "me2" : "me1"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={hovered ? "/2b2.jpg" : "/me1.jpg"}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 384px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
