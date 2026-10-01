import { profile } from "@/data/portfolio";

// Deterministic building layout for the pixel skyline — no Math.random.
const BUILDINGS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  width: 24 + (i % 4) * 10,
  height: 40 + ((i * 37) % 90),
}));

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-16">
      {/* Moon + a few stars */}
      <div className="absolute right-10 top-6 h-10 w-10 rounded-full bg-glow/80 shadow-[0_0_40px_10px_rgba(200,172,214,0.5)]" />
      <span className="absolute right-24 top-4 h-1 w-1 animate-pulseGlow bg-white/70" />
      <span className="absolute right-32 top-12 h-1 w-1 animate-pulseGlow bg-white/50" />
      <span className="absolute right-16 top-16 h-1 w-1 animate-pulseGlow bg-white/60" />

      {/* Pixel skyline */}
      <div className="relative flex h-28 items-end justify-center gap-1 px-6">
        {BUILDINGS.map((b) => (
          <div
            key={b.id}
            className="bg-card"
            style={{ width: `${b.width}px`, height: `${b.height}px` }}
          />
        ))}

        {/* Tiny walking pixel character */}
        <div
          className="absolute bottom-0 h-4 w-3 bg-mauve"
          style={{ animation: "walk-across 8s linear infinite" }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/10 px-6 py-8 text-xs text-white/40 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
