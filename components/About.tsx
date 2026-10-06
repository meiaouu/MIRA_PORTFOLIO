"use client";

import Image from "next/image";

import CrumpleSnapshot from "./CrumpleSnapshot";

import {
  about,
  profile,
} from "@/data/portfolio";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "PHP",
  "Laravel",
  "Python",
  "MySQL",
];

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#050506]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[860px]
          w-[860px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#3b2558]/[0.10]
          blur-[200px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[180px]
          top-[20%]
          -z-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-white/[0.025]
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[160px]
          bottom-[10%]
          -z-10
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#513574]/[0.08]
          blur-[170px]
        "
      />

      {/* =====================================================
          ABOUT PAPER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1480px]
        "
      >
        <CrumpleSnapshot>
          <article
            className="
              relative
              overflow-hidden
              rounded-[28px]

              border
              border-white/[0.22]

              bg-[rgba(238,234,226,0.48)]
              backdrop-blur-[16px]

              px-5
              py-7

              text-[#161319]

              shadow-[0_30px_100px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.30),inset_0_-1px_0_rgba(59,37,88,0.06)]

              sm:px-8
              sm:py-9

              lg:px-10
              lg:py-10
            "
          >
            {/* =================================================
                PAPER GRAIN
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                opacity-[0.15]
                mix-blend-multiply
              "
              style={{
                backgroundImage:
                  "radial-gradient(rgba(26,22,30,.18) .55px, transparent .55px)",
                backgroundSize: "5px 5px",
              }}
            />

            {/* =================================================
                PAPER FIBERS
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                opacity-[0.18]
                mix-blend-multiply
              "
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    3deg,
                    rgba(28,22,31,.025) 0px,
                    rgba(28,22,31,.025) 1px,
                    transparent 1px,
                    transparent 5px
                  )
                `,
              }}
            />

            {/* =================================================
                GLASS SHEEN
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                bg-[linear-gradient(135deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.10)_20%,transparent_45%,rgba(59,37,88,0.035)_76%,rgba(255,255,255,0.08)_100%)]
              "
            />

            {/* =================================================
                LIGHT PAPER CREASES
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                opacity-35
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    119deg,
                    transparent 22%,
                    rgba(34,29,38,.04) 22.4%,
                    rgba(255,255,255,.14) 23%,
                    transparent 23.7%
                  ),
                  linear-gradient(
                    62deg,
                    transparent 60%,
                    rgba(34,29,38,.03) 60.4%,
                    rgba(255,255,255,.11) 61%,
                    transparent 61.7%
                  ),
                  linear-gradient(
                    151deg,
                    transparent 76%,
                    rgba(34,29,38,.025) 76.4%,
                    rgba(255,255,255,.09) 77%,
                    transparent 77.7%
                  )
                `,
              }}
            />

            {/* =================================================
                INNER GLASS EDGE
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-[1px]
                z-0
                rounded-[27px]
                ring-1
                ring-inset
                ring-white/[0.15]
              "
            />

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="relative z-10">
              {/* =============================================
                  HEADER
              ============================================= */}

              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-4
                  border-b
                  border-black/[0.12]
                  pb-6
                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      mb-2
                      font-mono
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.24em]
                      text-[#4a2f67]
                      sm:text-[11px]
                    "
                  >
                    01 / about me
                  </p>

                  <h2
                    className="
                      font-display
                      text-5xl
                      font-black
                      uppercase
                      leading-[0.95]
                      tracking-[-0.05em]
                      text-[#111014]
                      sm:text-6xl
                      lg:text-7xl
                    "
                  >
                    Hi, I&apos;m Marjorie.
                  </h2>

                  <p
                    className="
                      mt-3
                      font-mono
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-black/65
                      sm:text-[11px]
                      lg:text-xs
                    "
                  >
                    Full Stack Developer
                    {" • "}
                    BS Information Technology
                  </p>
                </div>

                <div
                  className="
                    w-fit
                    rotate-[2deg]
                    rounded-lg
                    border
                    border-white/[0.30]
                    bg-white/[0.30]
                    px-4
                    py-2
                    font-mono
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#352044]
                    shadow-[inset_0_1px_0_rgba(255,255,255,.38)]
                    backdrop-blur-[9px]
                    sm:text-[10px]
                  "
                >
                  hold + drag to crumple ✦
                </div>
              </div>

              {/* =============================================
                  PROFILE + ABOUT
              ============================================= */}

              <div
                className="
                  grid
                  gap-8
                  lg:grid-cols-[0.82fr_1.18fr]
                  lg:gap-10
                "
              >
                {/* PHOTO */}

                <div
                  className="
                    relative
                    mx-auto
                    w-full
                    max-w-[330px]
                    self-start
                    rotate-[-1.5deg]
                    rounded-[20px]
                    border
                    border-white/[0.38]
                    bg-white/[0.32]
                    p-3
                    shadow-[7px_8px_0_rgba(59,37,88,.08),inset_0_1px_0_rgba(255,255,255,.42)]
                    backdrop-blur-[9px]
                  "
                >
                  <div
                    className="
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      rounded-[13px]
                      border-[5px]
                      border-white/80
                      bg-white/70
                    "
                  >
                    <Image
                      src="/IDme.png"
                      alt={profile.name}
                      fill
                      className="object-cover"
                      sizes="330px"
                      priority
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-white/10
                        via-transparent
                        to-[#3b2558]/[0.04]
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-3
                      text-center
                      font-mono
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.11em]
                      text-black/70
                    "
                  >
                    {profile.name}
                  </p>

                  <p
                    className="
                      mt-1
                      text-center
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.11em]
                      text-black/50
                    "
                  >
                    developer • designer • creator
                  </p>
                </div>

                {/* TEXT */}

                <div className="space-y-5">
                  <div
                    className="
                      rounded-[20px]
                      border
                      border-white/[0.34]
                      bg-white/[0.30]
                      p-5
                      shadow-[inset_0_1px_0_rgba(255,255,255,.38),0_12px_32px_rgba(59,37,88,.045)]
                      backdrop-blur-[10px]
                      sm:p-6
                    "
                  >
                    <p
                      className="
                        mb-2
                        font-mono
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.20em]
                        text-[#4a2f67]
                        sm:text-[11px]
                      "
                    >
                      Who am I?
                    </p>

                    <h3
                      className="
                        font-display
                        text-3xl
                        font-black
                        uppercase
                        leading-tight
                        text-[#111014]
                        sm:text-4xl
                      "
                    >
                      Developer, designer & builder.
                    </h3>

                    <p
                      className="
                        mt-4
                        text-[15px]
                        font-medium
                        leading-8
                        text-black/80
                        sm:text-base
                        lg:text-[17px]
                      "
                    >
                      {about.intro}
                    </p>
                  </div>

                  {about.paragraphs?.[0] && (
                    <p
                      className="
                        rounded-[18px]
                        border
                        border-white/[0.28]
                        bg-white/[0.27]
                        p-5
                        text-[15px]
                        font-medium
                        leading-8
                        text-black/78
                        shadow-[inset_0_1px_0_rgba(255,255,255,.28)]
                        backdrop-blur-[9px]
                        sm:text-base
                        lg:text-[17px]
                      "
                    >
                      {about.paragraphs[0]}
                    </p>
                  )}

                  {about.paragraphs?.[1] && (
                    <p
                      className="
                        rounded-[18px]
                        border
                        border-white/[0.28]
                        bg-white/[0.27]
                        p-5
                        text-[15px]
                        font-medium
                        leading-8
                        text-black/78
                        shadow-[inset_0_1px_0_rgba(255,255,255,.28)]
                        backdrop-blur-[9px]
                        sm:text-base
                        lg:text-[17px]
                      "
                    >
                      {about.paragraphs[1]}
                    </p>
                  )}
                </div>
              </div>

              {/* =============================================
                  SKILLS
              ============================================= */}

              <div className="mt-8">
                <p
                  className="
                    mb-3
                    font-mono
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.20em]
                    text-black/55
                    sm:text-[11px]
                  "
                >
                  Current toolbox
                </p>

                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        border-white/[0.35]
                        bg-white/[0.30]
                        px-3
                        py-1.5
                        font-mono
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.10em]
                        text-[#2d2135]
                        shadow-[inset_0_1px_0_rgba(255,255,255,.32)]
                        backdrop-blur-[6px]
                        sm:text-[10px]
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* =============================================
                  HIGHLIGHTS
              ============================================= */}

              <div
                className="
                  mt-8
                  grid
                  grid-cols-1
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-white/[0.30]
                  bg-white/[0.25]
                  shadow-[inset_0_1px_0_rgba(255,255,255,.30)]
                  backdrop-blur-[9px]
                  sm:grid-cols-3
                "
              >
                {about.highlights.map(
                  (item, index) => (
                    <div
                      key={item.label}
                      className={`
                        p-4
                        text-center
                        sm:p-5
                        ${
                          index !==
                          about.highlights.length - 1
                            ? "border-b border-black/[0.10] sm:border-b-0 sm:border-r"
                            : ""
                        }
                      `}
                    >
                      <p
                        className="
                          font-display
                          text-3xl
                          font-black
                          text-[#4a2f67]
                          sm:text-4xl
                        "
                      >
                        {item.value}
                      </p>

                      <p
                        className="
                          mt-1
                          font-mono
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]
                          text-black/55
                          sm:text-[10px]
                        "
                      >
                        {item.label}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* =============================================
                  FOOTER
              ============================================= */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                  border-t
                  border-black/[0.10]
                  pt-5
                "
              >
                <p
                  className="
                    font-mono
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-black/50
                    sm:text-[10px]
                  "
                >
                  code • create • improve • repeat
                </p>

                <span
                  className="
                    rotate-[-2deg]
                    font-mono
                    text-[10px]
                    font-semibold
                    text-[#4a2f67]/80
                  "
                >
                  ✦ entire sheet crumples
                </span>
              </div>
            </div>
          </article>
        </CrumpleSnapshot>
      </div>
    </section>
  );
}
