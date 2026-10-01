"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

type ViewportMode =
  | "mobile"
  | "tablet"
  | "desktop";

type ExplosionEffect = {
  startRotate: number;
  middleRotate: number;
  startScale: number;
  overshoot: number;
  skewX: number;
  skewY: number;
};

type ScatterPoint = {
  left: string;
  top: string;
};

/* =========================================================
   SAFE ICON LOADER
========================================================= */

function getIcon(
  name: string,
  fallback: IconType = FiCode
): IconType {
  const icons =
    SiIcons as unknown as Record<
      string,
      IconType | undefined
    >;

  return icons[name] ?? fallback;
}

/* =========================================================
   DETERMINISTIC RANDOM
========================================================= */

function seededRandom(seed: number) {
  const value =
    Math.sin(
      seed * 12.9898 + 78.233
    ) * 43758.5453;

  return (
    value -
    Math.floor(value)
  );
}

/* =========================================================
   RESPONSIVE MODE
========================================================= */

function useViewportMode(): ViewportMode {
  const [mode, setMode] =
    useState<ViewportMode>(
      "mobile"
    );

  useEffect(() => {
    const updateMode = () => {
      const width =
        window.innerWidth;

      if (width >= 1024) {
        setMode("desktop");
      } else if (
        width >= 640
      ) {
        setMode("tablet");
      } else {
        setMode("mobile");
      }
    };

    updateMode();

    window.addEventListener(
      "resize",
      updateMode
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateMode
      );
    };
  }, []);

  return mode;
}

/* =========================================================
   TOOLS
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

  /* DEVELOPMENT */

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
    icon:
      "SiVisualstudiocode",
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

  /* SERVER */

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

  /* DESIGN */

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
   RESPONSIVE AMOUNT
========================================================= */

function shouldShowTool(
  index: number,
  mode: ViewportMode
) {
  if (
    mode === "desktop"
  ) {
    return true;
  }

  if (
    mode === "tablet"
  ) {
    return (
      index % 2 === 0 ||
      index % 5 === 0
    );
  }

  return (
    index % 4 === 0
  );
}

/* =========================================================
   RANDOM SCATTER POSITIONS

   NO MORE STRAIGHT LINES.

   It randomly fills the outer area while keeping
   a clean zone around the center cards.
========================================================= */

function generateScatterPositions(
  total: number,
  mode: ViewportMode
): ScatterPoint[] {
  const points: {
    x: number;
    y: number;
  }[] = [];

  const result: ScatterPoint[] =
    [];

  const config =
    mode === "desktop"
      ? {
          minX: 3,
          maxX: 97,

          minY: 3,
          maxY: 97,

          safeLeft: 25,
          safeRight: 75,

          safeTop: 24,
          safeBottom: 76,

          minDistance: 7,
        }
      : mode === "tablet"
        ? {
            minX: 5,
            maxX: 95,

            minY: 4,
            maxY: 96,

            safeLeft: 20,
            safeRight: 80,

            safeTop: 22,
            safeBottom: 78,

            minDistance: 9,
          }
        : {
            minX: 7,
            maxX: 93,

            minY: 5,
            maxY: 95,

            safeLeft: 15,
            safeRight: 85,

            safeTop: 18,
            safeBottom: 82,

            minDistance: 13,
          };

  for (
    let index = 0;
    index < total;
    index++
  ) {
    let accepted:
      | {
          x: number;
          y: number;
        }
      | undefined;

    for (
      let attempt = 0;
      attempt < 220;
      attempt++
    ) {
      const randomX =
        seededRandom(
          index * 701 +
            attempt * 47 +
            11
        );

      const randomY =
        seededRandom(
          index * 911 +
            attempt * 61 +
            23
        );

      const x =
        config.minX +
        randomX *
          (
            config.maxX -
            config.minX
          );

      const y =
        config.minY +
        randomY *
          (
            config.maxY -
            config.minY
          );

      /*
        Do not place logos directly over the
        main center card region.
      */

      const insideSafeCenter =
        x >
          config.safeLeft &&
        x <
          config.safeRight &&
        y >
          config.safeTop &&
        y <
          config.safeBottom;

      if (
        insideSafeCenter
      ) {
        continue;
      }

      /*
        Gradually relax spacing if many
        points need to fit.
      */

      const relaxation =
        attempt > 150
          ? 0.6
          : attempt > 90
            ? 0.75
            : attempt > 45
              ? 0.9
              : 1;

      const minimum =
        config.minDistance *
        relaxation;

      const farEnough =
        points.every(
          (point) => {
            const dx =
              x - point.x;

            const dy =
              y - point.y;

            const distance =
              Math.sqrt(
                dx * dx +
                  dy * dy
              );

            return (
              distance >=
              minimum
            );
          }
        );

      if (
        farEnough
      ) {
        accepted = {
          x,
          y,
        };

        break;
      }
    }

    /*
      Fallback in case the random packing
      cannot find enough space.
    */

    if (
      !accepted
    ) {
      const fallbackAngle =
        seededRandom(
          index + 8000
        ) *
        Math.PI *
        2;

      const radiusX =
        39 +
        seededRandom(
          index + 8100
        ) *
          8;

      const radiusY =
        36 +
        seededRandom(
          index + 8200
        ) *
          10;

      accepted = {
        x:
          50 +
          Math.cos(
            fallbackAngle
          ) *
            radiusX,

        y:
          50 +
          Math.sin(
            fallbackAngle
          ) *
            radiusY,
      };
    }

    points.push(
      accepted
    );

    result.push({
      left:
        `${accepted.x}%`,

      top:
        `${accepted.y}%`,
    });
  }

  return result;
}

/* =========================================================
   EXPLOSION EFFECTS
========================================================= */

function getExplosionEffect(
  index: number
): ExplosionEffect {
  switch (
    index % 10
  ) {
    case 0:
      return {
        startRotate: -260,
        middleRotate: 30,
        startScale: 0.03,
        overshoot: 1.22,
        skewX: -18,
        skewY: 10,
      };

    case 1:
      return {
        startRotate: 260,
        middleRotate: -30,
        startScale: 0.03,
        overshoot: 1.22,
        skewX: 18,
        skewY: -10,
      };

    case 2:
      return {
        startRotate: -50,
        middleRotate: 13,
        startScale: 0.01,
        overshoot: 1.32,
        skewX: -7,
        skewY: 5,
      };

    case 3:
      return {
        startRotate: 50,
        middleRotate: -13,
        startScale: 0.18,
        overshoot: 1.14,
        skewX: 8,
        skewY: -5,
      };

    case 4:
      return {
        startRotate: -170,
        middleRotate: 20,
        startScale: 0.06,
        overshoot: 1.27,
        skewX: -27,
        skewY: 18,
      };

    case 5:
      return {
        startRotate: 180,
        middleRotate: -20,
        startScale: 0.05,
        overshoot: 1.2,
        skewX: 22,
        skewY: -14,
      };

    case 6:
      return {
        startRotate: -100,
        middleRotate: 11,
        startScale: 0.12,
        overshoot: 1.3,
        skewX: -13,
        skewY: 8,
      };

    case 7:
      return {
        startRotate: 110,
        middleRotate: -10,
        startScale: 0.16,
        overshoot: 1.15,
        skewX: 11,
        skewY: -7,
      };

    case 8:
      return {
        startRotate: -360,
        middleRotate: 20,
        startScale: 0.02,
        overshoot: 1.25,
        skewX: -4,
        skewY: 4,
      };

    default:
      return {
        startRotate: 320,
        middleRotate: -18,
        startScale: 0.08,
        overshoot: 1.18,
        skewX: 15,
        skewY: -10,
      };
  }
}

/* =========================================================
   TOOL LOGO
========================================================= */

function ToolLogo({
  tool,
  originalIndex,
  finalPosition,
  visible,
}: {
  tool: Tool;
  originalIndex: number;
  finalPosition: ScatterPoint;
  visible: boolean;
}) {
  const Icon =
    getIcon(
      tool.icon,
      tool.fallback
    );

  const effect =
    getExplosionEffect(
      originalIndex
    );

  /* Different entrance timing */

  const delay =
    seededRandom(
      originalIndex + 500
    ) *
    1.45;

  /* Different speed */

  const duration =
    0.8 +
    seededRandom(
      originalIndex + 600
    ) *
      0.85;

  /* Different floating */

  const floatAmount =
    3 +
    seededRandom(
      originalIndex + 700
    ) *
      7;

  const floatX =
    (
      seededRandom(
        originalIndex + 750
      ) -
      0.5
    ) *
    7;

  const floatRotate =
    0.6 +
    seededRandom(
      originalIndex + 800
    ) *
      2.8;

  const idleDuration =
    3.4 +
    seededRandom(
      originalIndex + 900
    ) *
      3.2;

  return (
    <motion.div
      initial={{
        left:
          "50%",

        top:
          "50%",

        opacity:
          0,

        scale:
          effect.startScale,

        rotate:
          effect.startRotate,

        skewX:
          effect.skewX,

        skewY:
          effect.skewY,
      }}
      animate={
        visible
          ? {
              left:
                finalPosition.left,

              top:
                finalPosition.top,

              opacity:
                1,

              scale: [
                effect.startScale,
                effect.overshoot,
                0.9,
                1.08,
                0.97,
                1,
              ],

              rotate: [
                effect.startRotate,
                effect.middleRotate,
                -8,
                4,
                -1,
                0,
              ],

              skewX: [
                effect.skewX,
                -effect.skewX *
                  0.3,
                4,
                0,
              ],

              skewY: [
                effect.skewY,
                -effect.skewY *
                  0.3,
                -3,
                0,
              ],
            }
          : {
              left:
                "50%",

              top:
                "50%",

              opacity:
                0,

              scale:
                effect.startScale,

              rotate:
                effect.startRotate,

              skewX:
                effect.skewX,

              skewY:
                effect.skewY,
            }
      }
      transition={{
        left: {
          duration,

          delay:
            visible
              ? delay
              : delay *
                0.05,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        },

        top: {
          duration,

          delay:
            visible
              ? delay
              : delay *
                0.05,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        },

        opacity: {
          duration:
            0.22,

          delay:
            visible
              ? delay
              : 0,
        },

        scale: {
          duration:
            duration,

          delay:
            visible
              ? delay
              : 0,

          ease:
            "easeOut",
        },

        rotate: {
          duration,

          delay:
            visible
              ? delay
              : 0,

          ease:
            "easeOut",
        },

        skewX: {
          duration:
            duration *
            0.8,
        },

        skewY: {
          duration:
            duration *
            0.8,
        },
      }}
      className="
        pointer-events-none

        absolute

        z-[80]
      "
      style={{
        x:
          "-50%",

        y:
          "-50%",
      }}
    >
      {/* IDLE FLOAT */}

      <motion.div
        animate={
          visible
            ? {
                x: [
                  0,
                  floatX,
                  -floatX *
                    0.4,
                  0,
                ],

                y: [
                  0,
                  -floatAmount,
                  2,
                  0,
                ],

                rotate: [
                  0,

                  originalIndex %
                      2 ===
                    0
                    ? floatRotate
                    : -floatRotate,

                  originalIndex %
                      2 ===
                    0
                    ? -0.7
                    : 0.7,

                  0,
                ],
              }
            : {
                x: 0,
                y: 0,
                rotate: 0,
              }
        }
        transition={{
          duration:
            idleDuration,

          repeat:
            Infinity,

          ease:
            "easeInOut",

          delay:
            -seededRandom(
              originalIndex +
                1000
            ) *
            4,
        }}
        whileHover={{
          scale:
            1.35,

          y:
            -10,

          rotate:
            0,

          transition: {
            duration:
              0.16,
          },
        }}
        className="
          group

          pointer-events-auto

          relative

          z-[90]

          flex

          h-[38px]
          w-[38px]

          items-center
          justify-center

          overflow-visible

          sm:h-[46px]
          sm:w-[46px]

          md:h-[52px]
          md:w-[52px]

          lg:h-[58px]
          lg:w-[58px]
        "
      >
        {/* GLOW */}

        <div
          className="
            pointer-events-none

            absolute

            inset-[-9px]

            rounded-full

            opacity-[0.07]

            blur-xl

            transition-all
            duration-300

            group-hover:scale-150
            group-hover:opacity-55

            md:inset-[-12px]

            lg:inset-[-15px]
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

            z-[100]

            h-5
            w-5

            transition-transform
            duration-300

            group-hover:scale-110

            sm:h-7
            sm:w-7

            md:h-8
            md:w-8

            lg:h-9
            lg:w-9
          "
          style={{
            color:
              tool.color,

            filter: `drop-shadow(
              0 0 10px ${tool.color}80
            )`,
          }}
        />

        {/* NAME ON HOVER */}

        <div
          className="
            pointer-events-none

            absolute

            left-1/2

            top-[calc(100%+9px)]

            z-[9999]

            -translate-x-1/2
            translate-y-2

            whitespace-nowrap

            rounded-md

            border
            border-mauve/30

            bg-[#100811]/95

            px-2
            py-1

            font-mono

            text-[6px]

            uppercase

            tracking-[0.1em]

            text-white/90

            opacity-0

            shadow-[0_8px_25px_rgba(0,0,0,.75)]

            backdrop-blur-xl

            transition-all
            duration-200

            group-hover:translate-y-0
            group-hover:opacity-100

            sm:px-2.5
            sm:py-1.5
            sm:text-[7px]
          "
        >
          {tool.name}

          <span
            className="
              absolute

              -top-[3px]
              left-1/2

              h-1.5
              w-1.5

              -translate-x-1/2
              rotate-45

              border-l
              border-t
              border-mauve/30

              bg-[#100811]
            "
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   CENTER EXPLOSION
========================================================= */

function CenterExplosion({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <>
      <motion.div
        animate={
          visible
            ? {
                scale: [
                  0,
                  1.6,
                  0.9,
                  2.4,
                ],

                opacity: [
                  0,
                  0.5,
                  0.2,
                  0,
                ],
              }
            : {
                scale:
                  0,

                opacity:
                  0,
              }
        }
        transition={{
          duration:
            0.9,

          ease:
            "easeOut",
        }}
        className="
          pointer-events-none

          absolute

          left-1/2
          top-1/2

          z-[60]

          h-[80px]
          w-[80px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-mauve/20

          bg-mauve/[0.035]

          sm:h-[110px]
          sm:w-[110px]

          lg:h-[150px]
          lg:w-[150px]
        "
      />

      <motion.div
        animate={
          visible
            ? {
                scale: [
                  0,
                  2.8,
                ],

                opacity: [
                  0.45,
                  0,
                ],
              }
            : {
                scale:
                  0,

                opacity:
                  0,
              }
        }
        transition={{
          duration:
            1.15,

          delay:
            0.05,

          ease:
            "easeOut",
        }}
        className="
          pointer-events-none

          absolute

          left-1/2
          top-1/2

          z-[50]

          h-[50px]
          w-[50px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-violet/20

          sm:h-[80px]
          sm:w-[80px]

          lg:h-[110px]
          lg:w-[110px]
        "
      />

      <motion.div
        animate={
          visible
            ? {
                scale: [
                  0,
                  2,
                  0,
                ],

                opacity: [
                  0,
                  0.5,
                  0,
                ],
              }
            : {
                scale:
                  0,

                opacity:
                  0,
              }
        }
        transition={{
          duration:
            0.65,
        }}
        className="
          pointer-events-none

          absolute

          left-1/2
          top-1/2

          z-[55]

          h-12
          w-12

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-mauve/20

          blur-xl
        "
      />
    </>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function ToolsExplode() {
  const ref =
    useRef<HTMLDivElement>(
      null
    );

  const mode =
    useViewportMode();

  const visible =
    useInView(
      ref,
      {
        once:
          false,

        amount:
          0.03,

        margin:
          "40px 0px -60px 0px",
      }
    );

  const visibleTools =
    useMemo(
      () =>
        TOOLS.map(
          (
            tool,
            originalIndex
          ) => ({
            tool,
            originalIndex,
          })
        ).filter(
          ({
            originalIndex,
          }) =>
            shouldShowTool(
              originalIndex,
              mode
            )
        ),
      [mode]
    );

  const positions =
    useMemo(
      () =>
        generateScatterPositions(
          visibleTools.length,
          mode
        ),
      [
        visibleTools.length,
        mode,
      ]
    );

  return (
    <div
      ref={ref}
      className="
        pointer-events-none

        relative

        z-[60]

        h-full
        w-full

        overflow-visible
      "
    >
      {/* CENTER EXPLOSION */}

      <CenterExplosion
        visible={visible}
      />

      {/* RANDOM SCATTERED LOGOS */}

      {visibleTools.map(
        (
          {
            tool,
            originalIndex,
          },
          index
        ) => (
          <ToolLogo
            key={
              tool.name
            }
            tool={
              tool
            }
            originalIndex={
              originalIndex
            }
            finalPosition={
              positions[index]
            }
            visible={
              visible
            }
          />
        )
      )}

      {/* SMALL EXPLOSION PARTICLES */}

      <motion.span
        animate={
          visible
            ? {
                x: [
                  0,
                  -95,
                ],

                y: [
                  0,
                  -70,
                ],

                opacity: [
                  0,
                  0.8,
                  0,
                ],
              }
            : {
                x: 0,
                y: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 1,
          delay: 0.04,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[70]
          h-1
          w-1
          bg-mauve
        "
      />

      <motion.span
        animate={
          visible
            ? {
                x: [
                  0,
                  105,
                ],

                y: [
                  0,
                  -55,
                ],

                opacity: [
                  0,
                  0.8,
                  0,
                ],
              }
            : {
                x: 0,
                y: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 1.1,
          delay: 0.1,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[70]
          h-1.5
          w-1.5
          bg-violet
        "
      />

      <motion.span
        animate={
          visible
            ? {
                x: [
                  0,
                  80,
                ],

                y: [
                  0,
                  90,
                ],

                opacity: [
                  0,
                  0.7,
                  0,
                ],
              }
            : {
                x: 0,
                y: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 1.05,
          delay: 0.15,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[70]
          h-1
          w-1
          bg-mauve
        "
      />

      <motion.span
        animate={
          visible
            ? {
                x: [
                  0,
                  -75,
                ],

                y: [
                  0,
                  95,
                ],

                opacity: [
                  0,
                  0.7,
                  0,
                ],
              }
            : {
                x: 0,
                y: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 1.15,
          delay: 0.2,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[70]
          h-1
          w-1
          bg-violet
        "
      />
    </div>
  );
}