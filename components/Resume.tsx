"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiFileText,
} from "react-icons/fi";

import Reveal from "./Reveal";
import { profile } from "@/data/portfolio";

export default function Resume() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="resume"
      className="
        relative
        overflow-hidden
        px-4
        py-28
        sm:px-6
        sm:py-36
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#a64d79]/10
          blur-[140px]
        "
      />

      <Reveal
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-4xl
          flex-col
          items-center
          text-center
        "
      >
        {/* TITLE */}
        <p
          className="
            mb-3
            font-mono
            text-[9px]
            uppercase
            tracking-[0.35em]
            text-mauve/70
          "
        >
          my resume
        </p>

        <h2
          className="
            font-pixel
            text-lg
            leading-relaxed
            text-white
            sm:text-xl
            md:text-2xl
          "
        >
          Want the full story on paper?
        </h2>

        <p
          className="
            mt-5
            max-w-lg
            text-sm
            leading-relaxed
            text-white/50
            sm:text-base
          "
        >
          Take a peek at my resume or download the full
          PDF for my experience, skills, education,
          and projects.
        </p>

        {/* DOWNLOAD BUTTON */}
        <motion.a
          href={profile.resumeFile}
          download
          whileHover={{
            y: -3,
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            mt-8
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-[#d97bac]/40
            bg-gradient-to-r
            from-[#6a1e55]
            to-[#a64d79]
            px-6
            py-3
            font-mono
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-white
            shadow-[0_10px_40px_-10px_rgba(166,77,121,0.65)]
            transition
          "
        >
          <FiDownload className="text-base" />
          Download Resume
        </motion.a>

        {/* FOLDER AREA */}
        <div
          className="
            relative
            mt-12
            h-[360px]
            w-full
            max-w-[520px]
            cursor-pointer
            sm:h-[440px]
            sm:max-w-[620px]
            md:h-[500px]
            md:max-w-[700px]
          "
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen((value) => !value)}
          tabIndex={0}
          role="button"
          aria-label="Preview resume"
        >
          {/* SHADOW */}
          <motion.div
            animate={{
              opacity: open ? 0.55 : 0.3,
              scale: open ? 1.04 : 1,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-[100px]
              w-[82%]
              -translate-x-1/2
              rounded-full
              bg-black/60
              blur-[35px]
            "
          />

          {/* FOLDER BACK */}
          <div
            className="
              absolute
              inset-x-[5%]
              bottom-0
              h-[70%]
              rounded-[18px]
              border
              border-[#f3aac9]/25
              bg-gradient-to-br
              from-[#8e3766]
              via-[#a94a76]
              to-[#6d254e]
              shadow-[0_30px_80px_rgba(0,0,0,0.35)]
            "
          >
            {/* TAB */}
            <div
              className="
                absolute
                -top-8
                left-0
                h-12
                w-[42%]
                rounded-t-[18px]
                border-x
                border-t
                border-[#f3aac9]/25
                bg-[#9b416d]
              "
            />

            {/* LABEL */}
            <div
              className="
                absolute
                left-6
                top-5
                flex
                items-center
                gap-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/45
              "
            >
              <FiFileText />
              resume.pdf
            </div>
          </div>

          {/* RESUME PAPER */}
          <motion.div
            animate={{
              y: open ? -145 : 40,
              rotate: open ? -1.5 : 0,
              scale: open ? 1.01 : 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 18,
              mass: 0.85,
            }}
            className="
              absolute
              bottom-[55px]
              left-1/2
              z-10
              h-[290px]
              w-[205px]
              -translate-x-1/2
              overflow-hidden
              rounded-[4px]
              border
              border-white/30
              bg-white
              shadow-[0_18px_45px_rgba(0,0,0,0.38)]
              sm:h-[370px]
              sm:w-[262px]
              md:h-[420px]
              md:w-[297px]
            "
          >
            <Image
              src="/resume/resume-preview.png"
              alt="Resume preview"
              fill
              draggable={false}
              sizes="
                (max-width: 640px) 205px,
                (max-width: 768px) 262px,
                297px
              "
              className="
                object-cover
                object-top
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-br
                from-white/20
                via-transparent
                to-black/5
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                h-px
                bg-white/70
              "
            />
          </motion.div>

          {/* LEFT DECORATION */}
          <motion.div
            animate={{
              rotate: open ? -12 : -8,
              y: open ? -4 : 0,
            }}
            className="
              pointer-events-none
              absolute
              left-[2%]
              top-[37%]
              z-20
              hidden
              h-16
              w-20
              rounded-sm
              border
              border-white/20
              bg-[#d1c5ce]/90
              shadow-lg
              sm:block
            "
          >
            <div
              className="
                absolute
                inset-2
                border
                border-black/10
              "
            />

            <div
              className="
                absolute
                left-3
                top-4
                font-pixel
                text-[7px]
                text-[#8e3766]
              "
            >
              CV
            </div>
          </motion.div>

          {/* STAR */}
          <motion.div
            animate={{
              rotate: open ? 20 : 0,
              scale: open ? 1.15 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 15,
            }}
            className="
              pointer-events-none
              absolute
              right-[9%]
              top-[21%]
              z-20
              font-pixel
              text-xl
              text-[#e978a9]
              sm:text-2xl
            "
          >
            ★
          </motion.div>

          {/* SPARK */}
          <motion.div
            animate={{
              rotate: open ? -25 : 0,
              y: open ? -8 : 0,
            }}
            className="
              pointer-events-none
              absolute
              left-[18%]
              top-[17%]
              z-20
              font-pixel
              text-lg
              text-[#f2a2c4]
            "
          >
            ✦
          </motion.div>

          {/* FRONT POCKET */}
          <motion.div
            animate={{
              rotateX: open ? -14 : 0,
              y: open ? 5 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformOrigin: "bottom center",
              transformPerspective: 1000,
            }}
            className="
              absolute
              inset-x-[2%]
              bottom-0
              z-20
              h-[48%]
              overflow-hidden
              rounded-b-[22px]
              border
              border-[#f4a7c7]/30
              bg-gradient-to-br
              from-[#464047]
              via-[#332e34]
              to-[#221e23]
              shadow-[0_-10px_35px_rgba(0,0,0,0.22),0_25px_60px_rgba(0,0,0,0.35)]
            "
          >
            {/* FABRIC TEXTURE */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.17]
              "
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,.25) 0px,
                    rgba(255,255,255,.25) 1px,
                    transparent 1px,
                    transparent 4px
                  )
                `,
              }}
            />

            {/* CURVED CUTOUT */}
            <div
              className="
                absolute
                left-1/2
                top-[-55px]
                h-[90px]
                w-[46%]
                -translate-x-1/2
                rounded-[50%]
                bg-[#08050f]
              "
            />

            {/* STITCHING */}
            <div
              className="
                absolute
                inset-x-4
                top-3
                border-t-2
                border-dashed
                border-[#d56f9e]/75
              "
            />

            {/* LABEL */}
            <div
              className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                font-mono
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-white/40
              "
            >
              Marjorie • Resume
            </div>
          </motion.div>

          {/* HOVER HINT */}
          <motion.p
            animate={{
              opacity: open ? 0 : 1,
              y: open ? 5 : 0,
            }}
            className="
              pointer-events-none
              absolute
              -bottom-9
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              font-mono
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/25
            "
          >
            hover to peek ↑
          </motion.p>
        </div>
      </Reveal>
    </section>
  );
}