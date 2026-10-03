"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AnimatedBackground from "@/components/AnimatedBackground";
import PixelStars from "@/components/PixelStars";
import ScrollTracer from "@/components/ScrollTracer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { profile } from "@/data/portfolio";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIntroFinished(true);
      document.body.style.overflow = "";
    }, 3200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050506]">
      {/* Website background */}
      <AnimatedBackground />
      <PixelStars />
      <ScrollTracer />

      {/* Main website */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 1.1,
          delay: introFinished ? 0.15 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Resume />
        <Contact />
        <Footer />
      </motion.div>

      {/* Intro screen */}
      <AnimatePresence>
        {!introFinished && (
          <motion.section
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030304]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.15,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Very subtle dark-violet atmosphere */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b2558]/[0.055] blur-[160px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Neutral secondary glow */}
            <motion.div
              className="pointer-events-none absolute left-[20%] top-[25%] h-[220px] w-[220px] rounded-full bg-white/[0.018] blur-[110px]"
              animate={{
                x: [0, 40, 0],
                y: [0, -25, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Grid */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,0.028) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,0.028) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "55px 55px",
                maskImage:
                  "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Center content */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              exit={{
                y: -35,
                scale: 0.92,
                opacity: 0,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <motion.div
                className="mb-6 font-mono text-[9px] uppercase tracking-[0.5em] text-white/30 sm:text-xs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Initializing portfolio
              </motion.div>

              {/* Name */}
              <motion.h1
                className="relative px-6 text-center font-pixel text-3xl tracking-wide text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.14)] sm:text-4xl md:text-5xl lg:text-6xl"
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.9,
                  filter: "blur(14px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -55,
                  scale: 1.08,
                  filter: "blur(6px)",
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {profile.name}

                <motion.span
                  className="pointer-events-none absolute inset-0 -z-10 bg-[#3b2558]/[0.045] blur-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.25] }}
                  exit={{ opacity: 0, scale: 1.4 }}
                  transition={{ duration: 1.8, delay: 0.5 }}
                />
              </motion.h1>

              {/* White line */}
              <motion.div
                className="mt-7 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 230, opacity: 1 }}
                exit={{ width: 340, opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Title */}
              <motion.div
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.38em] text-white/40 sm:text-xs"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.8,
                  delay: 1.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Full-Stack Developer
              </motion.div>
            </motion.div>

            {/* Loading */}
            <motion.div
              className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3 font-mono text-[8px] uppercase tracking-[0.35em] text-white/28 sm:text-[9px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 1.65, duration: 0.7 }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-white/70"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.75, 1.25, 0.75],
                  boxShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 10px rgba(255,255,255,0.55)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              Loading
            </motion.div>

            {/* Soft white transition light */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.035, 0] }}
              transition={{
                duration: 3.2,
                times: [0, 0.72, 0.9, 1],
                ease: "easeInOut",
              }}
            />

            {/* Exit light sweep */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[20vw] -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0_0_30px_8px_rgba(255,255,255,0.20)]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.65, 0],
              }}
              transition={{
                duration: 1.2,
                delay: 2.45,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Bottom transition shadow */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050506] to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
