import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: "#1A1A1D",   // base background
        plum: "#3B1C32",   // deep wine / secondary card border
        violet: "#6A1E55", // secondary accent
        mauve: "#A64D79",  // primary accent
        navy: "#021A54",   // deep blue accent (legacy, still used by RainBackground)
        card: "#2E073F",   // card surfaces
        glow: "#C8ACD6",   // hover / highlight glow
      },
      fontFamily: {
        display: ["var(--font-display)"],
        pixel: ["var(--font-pixel)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(166,77,121,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(166,77,121,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(24px) translateX(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        floatSlow: "floatSlow 12s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
