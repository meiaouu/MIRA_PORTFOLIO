"use client";

import { useMemo, useRef } from "react";

import type { IconType } from "react-icons";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import * as SiIcons from "react-icons/si";

import {
  FiCode,
  FiCpu,
  FiGlobe,
} from "react-icons/fi";

import { projects } from "@/data/portfolio";

/* =========================================================
   SAFE ICON LOADER

   Prevents build errors when a Simple Icon does not exist
   in your installed react-icons version.
========================================================= */

function getSiIcon(
  iconName: string,
  fallback: IconType = FiCode
): IconType {
  const icons =
    SiIcons as unknown as Record<string, IconType | undefined>;

  return icons[iconName] ?? fallback;
}

/* =========================================================
   TOOL DEFINITIONS

   These are only POSSIBLE mappings.

   The rail will NOT show all of these.
   It only shows tools actually found in project.tags.
========================================================= */

const TOOL_MAP: Record<
  string,
  {
    label: string;
    icon: string;
    fallback?: IconType;
  }
> = {
  /* FRONTEND */

  react: {
    label: "React",
    icon: "SiReact",
  },

  nextjs: {
    label: "Next.js",
    icon: "SiNextdotjs",
  },

  next: {
    label: "Next.js",
    icon: "SiNextdotjs",
  },

  typescript: {
    label: "TypeScript",
    icon: "SiTypescript",
  },

  javascript: {
    label: "JavaScript",
    icon: "SiJavascript",
  },

  javascriptes6: {
    label: "JavaScript",
    icon: "SiJavascript",
  },

  html: {
    label: "HTML5",
    icon: "SiHtml5",
  },

  html5: {
    label: "HTML5",
    icon: "SiHtml5",
  },

  css: {
    label: "CSS3",
    icon: "SiCss3",
  },

  css3: {
    label: "CSS3",
    icon: "SiCss3",
  },

  tailwind: {
    label: "Tailwind CSS",
    icon: "SiTailwindcss",
  },

  tailwindcss: {
    label: "Tailwind CSS",
    icon: "SiTailwindcss",
  },

  bootstrap: {
    label: "Bootstrap",
    icon: "SiBootstrap",
  },

  angular: {
    label: "Angular",
    icon: "SiAngular",
  },

  ionic: {
    label: "Ionic",
    icon: "SiIonic",
  },

  capacitor: {
    label: "Capacitor",
    icon: "SiCapacitor",
  },

  flutter: {
    label: "Flutter",
    icon: "SiFlutter",
  },

  framer: {
    label: "Framer Motion",
    icon: "SiFramer",
  },

  framermotion: {
    label: "Framer Motion",
    icon: "SiFramer",
  },

  threejs: {
    label: "Three.js",
    icon: "SiThreedotjs",
  },

  /* BACKEND */

  nodejs: {
    label: "Node.js",
    icon: "SiNodedotjs",
  },

  node: {
    label: "Node.js",
    icon: "SiNodedotjs",
  },

  express: {
    label: "Express",
    icon: "SiExpress",
  },

  php: {
    label: "PHP",
    icon: "SiPhp",
  },

  laravel: {
    label: "Laravel",
    icon: "SiLaravel",
  },

  python: {
    label: "Python",
    icon: "SiPython",
  },

  flask: {
    label: "Flask",
    icon: "SiFlask",
  },

  /* DATABASE */

  mysql: {
    label: "MySQL",
    icon: "SiMysql",
  },

  postgresql: {
    label: "PostgreSQL",
    icon: "SiPostgresql",
  },

  mongodb: {
    label: "MongoDB",
    icon: "SiMongodb",
  },

  firebase: {
    label: "Firebase",
    icon: "SiFirebase",
  },

  /* DEVELOPMENT */

  git: {
    label: "Git",
    icon: "SiGit",
  },

  github: {
    label: "GitHub",
    icon: "SiGithub",
  },

  docker: {
    label: "Docker",
    icon: "SiDocker",
  },

  figma: {
    label: "Figma",
    icon: "SiFigma",
  },

  stripe: {
    label: "Stripe",
    icon: "SiStripe",
  },

  /* AI */

  ollama: {
    label: "Ollama",
    icon: "SiOllama",
    fallback: FiCpu,
  },

  rag: {
    label: "RAG",
    icon: "",
    fallback: FiCpu,
  },

  /* API */

  restapi: {
    label: "REST API",
    icon: "",
    fallback: FiGlobe,
  },

  graphql: {
    label: "GraphQL",
    icon: "SiGraphql",
  },
};

/* =========================================================
   NORMALIZE TAG

   Example:

   "Tailwind CSS"
   becomes
   "tailwindcss"
========================================================= */

function normalizeTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/\+/g, "")
    .replace(/\./g, "")
    .replace(/\//g, "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(|\)/g, "");
}

/* =========================================================
   PROJECT LOGO RAIL
========================================================= */

export default function ProjectLogoRail() {
  const railRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     GET ONLY TOOLS ACTUALLY USED IN PROJECTS
  ======================================================= */

  const tools = useMemo(() => {
    const uniqueTags = Array.from(
      new Set(
        projects.flatMap((project) => project.tags)
      )
    );

    const usedTools = uniqueTags
      .map((tag) => {
        const key = normalizeTag(tag);

        const definition = TOOL_MAP[key];

        if (!definition) {
          return null;
        }

        const Icon = definition.icon
          ? getSiIcon(
              definition.icon,
              definition.fallback ?? FiCode
            )
          : definition.fallback ?? FiCode;

        return {
          key,
          name: definition.label,
          Icon,
        };
      })
      .filter(
        (
          tool
        ): tool is {
          key: string;
          name: string;
          Icon: IconType;
        } => tool !== null
      );

    /*
      Prevent duplicate logos in case two tags
      map to the same tool.
    */

    return usedTools.filter(
      (tool, index, array) =>
        array.findIndex(
          (other) => other.name === tool.name
        ) === index
    );
  }, []);

  /* =======================================================
     SCROLL-DRIVEN HORIZONTAL MOVEMENT
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: railRef,

    offset: [
      "start end",
      "end start",
    ],
  });

  /*
    High damping makes it smooth.

    The small X distance makes the horizontal
    movement intentionally slow.
  */

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 55,
      damping: 30,
      mass: 0.8,
    }
  );

  /*
    OLD was roughly -42%.
    NEW is only -11%.

    Much slower movement.
  */

  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["2%", "-11%"]
  );

  /*
    Duplicate the actual project tools so there
    is enough width to scroll continuously.
  */

  const repeatedTools = [
    ...tools,
    ...tools,
    ...tools,
  ];

  if (tools.length === 0) {
    return null;
  }

  return (
    <div
      ref={railRef}
      className="
        relative
        w-full
        overflow-hidden

        pt-2
        pb-3

        sm:pt-3
        sm:pb-4
      "
    >
      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto
          mb-4

          flex
          max-w-5xl

          items-center
          gap-4

          px-5

          sm:mb-5
        "
      >
        <div
          className="
            h-px
            flex-1

            bg-gradient-to-r
            from-transparent
            to-white/[0.08]
          "
        />

        <span
          className="
            font-mono

            text-[6px]

            uppercase

            tracking-[0.5em]

            text-white/25

            sm:text-[7px]
          "
        >
          Built with
        </span>

        <div
          className="
            h-px
            flex-1

            bg-gradient-to-l
            from-transparent
            to-white/[0.08]
          "
        />
      </div>

      {/* =====================================================
          EDGE FADE
      ===================================================== */}

      <div
        className="
          pointer-events-none

          absolute

          bottom-0
          left-0
          top-7

          z-30

          w-16

          bg-gradient-to-r
          from-black/85
          to-transparent

          sm:w-28
        "
      />

      <div
        className="
          pointer-events-none

          absolute

          bottom-0
          right-0
          top-7

          z-30

          w-16

          bg-gradient-to-l
          from-black/85
          to-transparent

          sm:w-28
        "
      />

      {/* =====================================================
          LOGO TRACK
      ===================================================== */}

      <motion.div
        style={{ x }}
        className="
          relative

          z-20

          flex
          w-max

          items-center

          gap-10

          px-8

          sm:gap-14
          sm:px-12

          lg:gap-[72px]
        "
      >
        {repeatedTools.map(
          (tool, index) => (
            <motion.div
              key={`${tool.name}-${index}`}
              whileHover={{
                y: -7,
                scale: 1.2,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
              }}
              className="
                group

                relative

                flex

                h-11
                w-11

                shrink-0

                cursor-default

                items-center
                justify-center

                sm:h-12
                sm:w-12

                lg:h-14
                lg:w-14
              "
            >
              {/* WHITE GLOW */}

              <div
                className="
                  pointer-events-none

                  absolute

                  inset-2

                  rounded-full

                  bg-white/[0.04]

                  blur-xl

                  transition-all
                  duration-300

                  group-hover:scale-[1.8]
                  group-hover:bg-white/[0.12]
                "
              />

              {/* WHITE LOGO */}

              <tool.Icon
                className="
                  relative

                  z-10

                  h-6
                  w-6

                  text-white/75

                  drop-shadow-[0_0_8px_rgba(255,255,255,.18)]

                  transition-all
                  duration-300

                  group-hover:text-white

                  group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,.40)]

                  sm:h-7
                  sm:w-7

                  lg:h-8
                  lg:w-8
                "
              />

              {/* NAME */}

              <div
                className="
                  pointer-events-none

                  absolute

                  bottom-[calc(100%+8px)]
                  left-1/2

                  z-[100]

                  -translate-x-1/2
                  translate-y-1

                  whitespace-nowrap

                  rounded-md

                  border
                  border-white/10

                  bg-black/90

                  px-2.5
                  py-1

                  font-mono

                  text-[7px]

                  uppercase

                  tracking-[0.12em]

                  text-white/75

                  opacity-0

                  shadow-[0_8px_25px_rgba(0,0,0,.75)]

                  backdrop-blur-xl

                  transition-all
                  duration-200

                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                {tool.name}
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
}