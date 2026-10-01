"use client";

import { useEffect, useState } from "react";

const TRAIL_LENGTH = 6;

/**
 * Small square pixel cursor with a fading trail. Grows slightly when
 * hovering anything interactive (links, buttons, inputs). Only rendered
 * on devices with a precise pointer (see the `pointer: fine` media query
 * in globals.css that hides the native cursor to match) — touch devices
 * are left alone entirely.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [{ x: e.clientX, y: e.clientY }, ...prev].slice(0, TRAIL_LENGTH));

      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, input, textarea, [role='button']"));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden="true"
    >
      {trail.map((p, i) => (
        <span
          key={i}
          className="absolute bg-mauve"
          style={{
            left: p.x,
            top: p.y,
            width: 6,
            height: 6,
            opacity: 1 - i / TRAIL_LENGTH,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <span
        className="absolute border-2 border-glow transition-[width,height] duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 20 : 10,
          height: hovering ? 20 : 10,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
