import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ToolsExplode from "./ToolsExplode";

import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden
        px-4
        py-24

        sm:px-6
        sm:py-28

        lg:py-32
      "
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="relative z-30 mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tools of the trade"
          description="A stack chosen for speed of iteration and long-term maintainability."
        />
      </div>

      {/* =====================================================
          CARDS + FLOATING TOOLS
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          mt-10

          w-full
          max-w-7xl

          sm:mt-14
        "
      >
        <div
          className="
            relative

            min-h-[780px]

            sm:min-h-[850px]

            lg:min-h-[920px]

            xl:min-h-[980px]
          "
        >
          {/* =================================================
              FLOATING TOOL LOGOS

              z-50 means ABOVE the cards
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-50

              overflow-visible
            "
          >
            <ToolsExplode />
          </div>

          {/* =================================================
              CENTER CARDS

              Lower z-index than tool logos.
          ================================================= */}

          <div
            className="
              relative
              z-20

              mx-auto

              max-w-4xl

              px-1

              pt-[190px]
              pb-[200px]

              sm:px-3
              sm:pt-[215px]
              sm:pb-[220px]

              lg:pt-[235px]
              lg:pb-[235px]
            "
          >
            <div
              className="
                grid
                gap-5

                sm:grid-cols-2
                sm:gap-6
              "
            >
              {skills.map((group, i) => (
                <Reveal
                  key={group.category}
                  delay={i * 0.1}
                  className="
                    glass
                    group
                    relative

                    min-h-[135px]

                    overflow-hidden

                    rounded-2xl

                    p-5

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:rotate-[0.25deg]

                    hover:shadow-[0_0_35px_-10px_rgba(166,77,121,0.7)]

                    sm:min-h-[145px]
                    sm:p-6
                  "
                >
                  {/* CARD GLOW */}

                  <div
                    className="
                      pointer-events-none

                      absolute

                      -right-16
                      -top-16

                      h-40
                      w-40

                      rounded-full

                      bg-mauve/[0.035]

                      blur-[45px]

                      transition-all
                      duration-500

                      group-hover:bg-mauve/[0.09]
                    "
                  />

                  {/* PIXEL CORNERS */}

                  <span className="absolute left-2 top-2 h-1.5 w-1.5 bg-mauve/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute right-2 top-2 h-1.5 w-1.5 bg-mauve/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute bottom-2 left-2 h-1.5 w-1.5 bg-mauve/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute bottom-2 right-2 h-1.5 w-1.5 bg-mauve/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* CATEGORY */}

                  <div
                    className="
                      relative
                      z-10

                      mb-4

                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <h3
                      className="
                        font-display

                        text-base
                        font-semibold

                        text-white

                        sm:text-lg
                      "
                    >
                      {group.category}
                    </h3>

                    <span
                      className="
                        font-mono
                        text-[9px]

                        text-mauve/25

                        transition-colors
                        duration-300

                        group-hover:text-mauve/70
                      "
                    >
                      ✦
                    </span>
                  </div>

                  {/* SKILLS */}

                  <div
                    className="
                      relative
                      z-10

                      flex
                      flex-wrap

                      gap-2
                    "
                  >
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="
                          rounded-full

                          border
                          border-mauve/25

                          bg-violet/10

                          px-3
                          py-1.5

                          text-[10px]
                          font-medium

                          text-white/75

                          transition-all
                          duration-300

                          hover:-translate-y-0.5
                          hover:border-mauve/60
                          hover:bg-mauve/10
                          hover:text-white

                          sm:text-xs
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* BOTTOM GLOW */}

                  <span
                    className="
                      pointer-events-none

                      absolute
                      bottom-0
                      left-1/2

                      h-px
                      w-0

                      -translate-x-1/2

                      bg-gradient-to-r
                      from-transparent
                      via-mauve
                      to-transparent

                      transition-all
                      duration-500

                      group-hover:w-[75%]
                    "
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[250px]
          top-[30%]
          z-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-mauve/[0.025]
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[250px]
          top-[30%]
          z-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet/[0.025]
          blur-[150px]
        "
      />
    </section>
  );
}