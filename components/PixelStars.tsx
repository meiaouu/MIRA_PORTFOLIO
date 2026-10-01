"use client";

import { useMemo } from "react";

const STAR_COUNT = 40;

/**
 * Tiny twinkling pixel dots + a couple of slow-drifting fog blobs.
 * Pure CSS animation (no per-frame JS), so it's essentially free
 * performance-wise. Deterministic layout — no Math.random — to avoid a
 * server/client hydration mismatch.
 */
export default function PixelStars() {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left: (i * 71) % 100,
      top: (i * 113) % 100,
      size: 1 + (i % 3), // 1px - 3px, keeps the "pixel" look
      duration: 2 + (i % 5), // 2s - 6s twinkle cycle
      delay: (i % 10) * 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute animate-pulseGlow rounded-none bg-glow"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            imageRendering: "pixelated",
          }}
        />
      ))}

      {/* Slow-drifting fog */}
      <div className="absolute -left-1/4 top-1/4 h-96 w-96 animate-floatSlow rounded-full bg-violet/10 blur-[100px]" />
      <div className="absolute -right-1/4 top-2/3 h-96 w-96 animate-float rounded-full bg-plum/10 blur-[100px]" />
    </div>
  );
}
