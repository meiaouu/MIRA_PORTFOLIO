"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";

import {
  motion,
  useInView,
} from "framer-motion";

import * as SiIcons from "react-icons/si";

import {
  FiBox,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiServer,
  FiSmartphone,
  FiTool,
} from "react-icons/fi";

/* =========================================================
   TYPES
========================================================= */

type Tool = {
  name: string;
  icon: string;
  color: string;
  fallback?: IconType;
};

/* =========================================================
   SAFE ICON LOADER
========================================================= */

function getToolIcon(
  iconName: string,
  fallback: IconType = FiCode
): IconType {
  const icons = SiIcons as unknown as Record<
    string,
    IconType | undefined
  >;

  return icons[iconName] ?? fallback;
}

/* =========================================================
   ALL TOOLS
========================================================= */

const TOOLS: Tool[] = [
  /* FRONTEND */

  {
    name: "HTML5",
    icon: "SiHtml5",
    color: "#E34F26",
    fallback: FiCode,
  },

  {
    name: "CSS3",
    icon: "SiCss3",
    color: "#1572B6",
    fallback: FiCode,
  },

  {
    name: "JavaScript",
    icon: "SiJavascript",
    color: "#F7DF1E",
    fallback: FiCode,
  },

  {
    name: "TypeScript",
    icon: "SiTypescript",
    color: "#3178C6",
    fallback: FiCode,
  },

  {
    name: "React",
    icon: "SiReact",
    color: "#61DAFB",
    fallback: FiCode,
  },

  {
    name: "Next.js",
    icon: "SiNextdotjs",
    color: "#FFFFFF",
    fallback: FiCode,
  },

  {
    name: "Angular",
    icon: "SiAngular",
    color: "#DD0031",
    fallback: FiCode,
  },

  {
    name: "Tailwind CSS",
    icon: "SiTailwindcss",
    color: "#06B6D4",
    fallback: FiCode,
  },

  {
    name: "Bootstrap",
    icon: "SiBootstrap",
    color: "#7952B3",
    fallback: FiCode,
  },

  {
    name: "Framer Motion",
    icon: "SiFramer",
    color: "#BB4BFF",
    fallback: FiLayers,
  },

  /* MOBILE */

  {
    name: "Ionic",
    icon: "SiIonic",
    color: "#3880FF",
    fallback: FiSmartphone,
  },

  {
    name: "Capacitor",
    icon: "SiCapacitor",
    color: "#119EFF",
    fallback: FiSmartphone,
  },

  {
    name: "Android Studio",
    icon: "SiAndroidstudio",
    color: "#3DDC84",
    fallback: FiSmartphone,
  },

  {
    name: "Flutter",
    icon: "SiFlutter",
    color: "#54C5F8",
    fallback: FiSmartphone,
  },

  {
    name: "Xcode",
    icon: "SiXcode",
    color: "#147EFB",
    fallback: FiSmartphone,
  },

  /* BACKEND */

  {
    name: "PHP",
    icon: "SiPhp",
    color: "#777BB4",
    fallback: FiCode,
  },

  {
    name: "Laravel",
    icon: "SiLaravel",
    color: "#FF2D20",
    fallback: FiCode,
  },

  {
    name: "Node.js",
    icon: "SiNodedotjs",
    color: "#5FA04E",
    fallback: FiServer,
  },

  {
    name: "Express",
    icon: "SiExpress",
    color: "#FFFFFF",
    fallback: FiServer,
  },

  {
    name: "Python",
    icon: "SiPython",
    color: "#3776AB",
    fallback: FiCode,
  },

  {
    name: "Flask",
    icon: "SiFlask",
    color: "#FFFFFF",
    fallback: FiServer,
  },

  {
    name: "SQLAlchemy",
    icon: "SiSqlalchemy",
    color: "#D71F00",
    fallback: FiDatabase,
  },

  {
    name: "Jinja",
    icon: "SiJinja",
    color: "#B41717",
    fallback: FiCode,
  },

  {
    name: "APScheduler",
    icon: "SiPython",
    color: "#7EB26D",
    fallback: FiCpu,
  },

  /* DATABASE */

  {
    name: "MySQL",
    icon: "SiMysql",
    color: "#4479A1",
    fallback: FiDatabase,
  },

  {
    name: "PostgreSQL",
    icon: "SiPostgresql",
    color: "#4169E1",
    fallback: FiDatabase,
  },

  {
    name: "MongoDB",
    icon: "SiMongodb",
    color: "#47A248",
    fallback: FiDatabase,
  },

  {
    name: "Firebase",
    icon: "SiFirebase",
    color: "#FFCA28",
    fallback: FiDatabase,
  },

  {
    name: "GraphQL",
    icon: "SiGraphql",
    color: "#E10098",
    fallback: FiDatabase,
  },

  {
    name: "phpMyAdmin",
    icon: "SiPhpmyadmin",
    color: "#6C78AF",
    fallback: FiDatabase,
  },

  /* API */

  {
    name: "REST API",
    icon: "SiFastapi",
    color: "#9B7BFF",
    fallback: FiGlobe,
  },

  {
    name: "Postman",
    icon: "SiPostman",
    color: "#FF6C37",
    fallback: FiTool,
  },

  /* DEVELOPMENT */

  {
    name: "Git",
    icon: "SiGit",
    color: "#F05032",
    fallback: FiTool,
  },

  {
    name: "GitHub",
    icon: "SiGithub",
    color: "#FFFFFF",
    fallback: FiTool,
  },

  {
    name: "VS Code",
    icon: "SiVisualstudiocode",
    color: "#23A9F2",
    fallback: FiMonitor,
  },

  {
    name: "npm",
    icon: "SiNpm",
    color: "#CB3837",
    fallback: FiBox,
  },

  {
    name: "Vite",
    icon: "SiVite",
    color: "#646CFF",
    fallback: FiCode,
  },

  /* DEPLOYMENT / SERVER */

  {
    name: "Docker",
    icon: "SiDocker",
    color: "#2496ED",
    fallback: FiBox,
  },

  {
    name: "Vercel",
    icon: "SiVercel",
    color: "#FFFFFF",
    fallback: FiServer,
  },

  {
    name: "Linux",
    icon: "SiLinux",
    color: "#FCC624",
    fallback: FiCpu,
  },

  {
    name: "Apache",
    icon: "SiApache",
    color: "#D22128",
    fallback: FiServer,
  },

  {
    name: "XAMPP",
    icon: "SiXampp",
    color: "#FB7A24",
    fallback: FiServer,
  },

  {
    name: "WAMP",
    icon: "SiWampserver",
    color: "#E85B9E",
    fallback: FiServer,
  },

  /* DESIGN / CMS */

  {
    name: "Figma",
    icon: "SiFigma",
    color: "#F24E1E",
    fallback: FiLayers,
  },

  {
    name: "WordPress",
    icon: "SiWordpress",
    color: "#21759B",
    fallback: FiLayers,
  },

  {
    name: "Elementor",
    icon: "SiElementor",
    color: "#92003B",
    fallback: FiLayers,
  },

  {
    name: "Wix",
    icon: "SiWix",
    color: "#FFFFFF",
    fallback: FiLayers,
  },

  /* AI */

  {
    name: "Ollama",
    icon: "SiOllama",
    color: "#FFFFFF",
    fallback: FiCpu,
  },

  {
    name: "RAG",
    icon: "SiOpenai",
    color: "#C8ACD6",
    fallback: FiCpu,
  },
];

/* =========================================================
   TOOL CARD
========================================================= */

function ToolCard({
  tool,
  index,
  visible,
}: {
  tool: Tool;
  index: number;
  visible: boolean;
}) {
  const Icon = getToolIcon(
    tool.icon,
    tool.fallback
  );

  const fromLeft =
    index % 2 === 0;

  const throwDistance =
    110 + (index % 6) * 20;

  const throwY =
    index % 4 === 0
      ? -30
      : index % 4 === 1
        ? 25
        : index % 4 === 2
          ? -16
          : 18;

  const rotation =
    index % 5 === 0
      ? -5
      : index % 5 === 1
        ? 4
        : index % 5 === 2
          ? -3
          : index % 5 === 3
            ? 4
            : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,

        x: fromLeft
          ? -throwDistance
          : throwDistance,

        y: throwY,

        scale: 0.4,

        rotate: fromLeft
          ? rotation - 35
          : rotation + 35,
      }}
      animate={
        visible
          ? {
              opacity: 1,

              x: [
                fromLeft
                  ? -throwDistance
                  : throwDistance,

                fromLeft
                  ? 20
                  : -20,

                fromLeft
                  ? -8
                  : 8,

                fromLeft
                  ? 3
                  : -3,

                0,
              ],

              y: [
                throwY,
                -8,
                4,
                -2,
                0,
              ],

              scale: [
                0.4,
                1.1,
                0.95,
                1.03,
                1,
              ],

              rotate: [
                fromLeft
                  ? rotation - 35
                  : rotation + 35,

                fromLeft
                  ? rotation + 8
                  : rotation - 8,

                fromLeft
                  ? rotation - 3
                  : rotation + 3,

                rotation,
              ],
            }
          : {
              opacity: 0,

              x: fromLeft
                ? -throwDistance
                : throwDistance,

              y: throwY,

              scale: 0.4,
            }
      }
      transition={{
        duration: 0.9,

        delay:
          (index % 14) * 0.035,

        times: [
          0,
          0.58,
          0.78,
          0.9,
          1,
        ],

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        group
        relative
      "
    >
      <motion.div
        animate={{
          y: [
            0,
            -4,
            1,
            0,
          ],
        }}
        transition={{
          duration:
            4 +
            (index % 5) * 0.35,

          repeat: Infinity,

          ease: "easeInOut",

          delay:
            -(index % 7) * 0.2,
        }}
        whileHover={{
          y: -7,
          scale: 1.07,
          rotate: rotation,

          transition: {
            duration: 0.18,
          },
        }}
        className="
          relative

          flex
          min-h-[88px]

          flex-col

          items-center
          justify-center

          overflow-hidden

          rounded-2xl

          border
          border-mauve/15

          bg-[#160b17]/72

          px-2
          py-4

          shadow-[0_10px_26px_rgba(0,0,0,.20)]

          backdrop-blur-lg

          transition-all
          duration-300

          hover:border-mauve/55

          hover:bg-[#21101f]/88

          sm:min-h-[96px]
        "
      >
        {/* COLORED GLOW */}

        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[38%]

            h-16
            w-16

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            opacity-[0.07]

            blur-2xl

            transition-opacity
            duration-300

            group-hover:opacity-35
          "
          style={{
            backgroundColor:
              tool.color,
          }}
        />

        {/* LOGO */}

        <Icon
          className="
            relative
            z-10

            h-7
            w-7

            transition-transform
            duration-300

            group-hover:scale-110

            sm:h-8
            sm:w-8
          "
          style={{
            color:
              tool.color,

            filter: `drop-shadow(
              0 0 8px ${tool.color}55
            )`,
          }}
        />

        {/* NAME */}

        <span
          className="
            relative
            z-10

            mt-3

            max-w-full

            text-center

            font-mono

            text-[6.5px]

            leading-tight

            text-white/40

            transition-colors
            duration-300

            group-hover:text-white/80

            sm:text-[8px]
          "
        >
          {tool.name}
        </span>

        {/* BOTTOM LIGHT */}

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

            group-hover:w-[70%]
          "
        />

        {/* PIXEL CORNERS */}

        <span
          className="
            pointer-events-none

            absolute

            left-1.5
            top-1.5

            h-1
            w-1

            bg-mauve/50

            opacity-0

            transition-opacity

            group-hover:opacity-100
          "
        />

        <span
          className="
            pointer-events-none

            absolute

            bottom-1.5
            right-1.5

            h-1
            w-1

            bg-violet/50

            opacity-0

            transition-opacity

            group-hover:opacity-100
          "
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SkillsSideLogos() {
  const ref =
    useRef<HTMLDivElement>(null);

  const visible =
    useInView(ref, {
      amount: 0.08,
      once: false,
    });

  return (
    <div
      ref={ref}
      className="
        relative

        mx-auto

        w-full

        max-w-6xl

        px-1

        sm:px-2
      "
    >
      <div
        className="
          grid

          grid-cols-3

          gap-2.5

          sm:grid-cols-4
          sm:gap-3

          md:grid-cols-5
          md:gap-4

          lg:grid-cols-6

          xl:grid-cols-8

          2xl:grid-cols-9
        "
      >
        {TOOLS.map(
          (
            tool,
            index
          ) => (
            <ToolCard
              key={
                tool.name
              }

              tool={
                tool
              }

              index={
                index
              }

              visible={
                visible
              }
            />
          )
        )}
      </div>

      {/* DECORATION */}

      <span
        className="
          tools-star

          pointer-events-none

          absolute

          -left-3

          top-[20%]

          hidden

          text-lg

          text-mauve/35

          lg:block
        "
      >
        ✦
      </span>

      <span
        className="
          tools-star

          pointer-events-none

          absolute

          -right-3

          top-[55%]

          hidden

          text-lg

          text-violet/35

          lg:block
        "
      >
        ✧
      </span>

      <style jsx>{`
        .tools-star {
          animation:
            toolStarFloat
            4s
            ease-in-out
            infinite;
        }

        .tools-star:nth-of-type(2) {
          animation-delay:
            -2s;
        }

        @keyframes toolStarFloat {
          0%,
          100% {
            opacity: 0.2;

            transform:
              translateY(0)
              rotate(0deg)
              scale(0.85);
          }

          50% {
            opacity: 0.8;

            transform:
              translateY(-8px)
              rotate(12deg)
              scale(1.15);
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .tools-star {
            animation:
              none !important;
          }
        }
      `}</style>
    </div>
  );
}