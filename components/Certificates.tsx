"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiX, FiExternalLink } from "react-icons/fi";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certificates } from "@/data/portfolio";

type Certificate = (typeof certificates)[number];

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Certificates" title="Credentials & courses" />

        <div className="grid gap-5 sm:grid-cols-2">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <button
                onClick={() => setSelected(cert)}
                className="glass group flex w-full items-start gap-4 rounded-2xl p-5 text-left transition-all hover:-translate-y-1 hover:border-mauve/50 hover:shadow-[0_0_30px_-10px_rgba(166,77,121,0.7)]"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-navy text-lg text-white">
                  <FiAward />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold leading-snug text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/50">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-onyx/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-w-sm rounded-2xl p-8 text-center"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 text-white/50 hover:text-white"
              >
                <FiX />
              </button>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-mauve text-2xl text-white">
                <FiAward />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {selected.title}
              </h3>
              <p className="mt-2 text-sm text-white/50">
                {selected.issuer} &middot; {selected.year}
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-mauve px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                <FiExternalLink /> View credential
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
