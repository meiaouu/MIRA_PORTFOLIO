"use client";

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import Reveal from "./Reveal";
import { profile } from "@/data/portfolio";

export default function Resume() {
  const [open, setOpen] = useState(false);

  return (
    <section id="resume" className="relative px-6 py-28 sm:py-36">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 className="font-pixel text-lg text-white sm:text-xl">
          Want the full story on paper?
        </h2>
        <p className="max-w-md text-white/60">
          Download my resume for a complete overview of my experience,
          skills, and education.
        </p>

        {/* Interactive pixel folder */}
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="relative mt-4 h-40 w-56 cursor-pointer"
        >
          {/* Paper, slides upward and peeks out on hover */}
          <div
            className="absolute inset-x-6 bottom-4 h-32 rounded-t-sm bg-gradient-to-b from-white/90 to-white/70 shadow-lg transition-transform duration-500 ease-out"
            style={{ transform: open ? "translateY(-2.2rem)" : "translateY(0)" }}
          >
            <div className="space-y-1.5 p-3">
              <div className="h-1.5 w-3/4 rounded bg-onyx/20" />
              <div className="h-1.5 w-1/2 rounded bg-onyx/20" />
              <div className="h-1.5 w-2/3 rounded bg-onyx/20" />
            </div>
          </div>

          {/* Folder back */}
          <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-md rounded-tr-md border border-mauve/30 bg-plum" />

          {/* Folder front flap, "opens" by rotating slightly + glow */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 origin-bottom rounded-b-md rounded-tr-md border border-mauve/40 bg-gradient-to-b from-violet to-plum shadow-[0_0_25px_-8px_rgba(166,77,121,0.7)] transition-transform duration-500 ease-out"
            style={{ transform: open ? "rotateX(-25deg)" : "rotateX(0deg)" }}
          >
            <span className="absolute left-1/2 top-3 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/70">
              resume.pdf
            </span>
          </div>
        </div>

        <a
          href={profile.resumeFile}
          download
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-mauve px-7 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(166,77,121,0.6)] transition-transform hover:scale-105"
        >
          <FiDownload /> Download Resume (PDF)
        </a>
      </Reveal>
    </section>
  );
}
