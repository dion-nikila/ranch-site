"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MotionStyle } from "motion/react";
import { ease } from "./motion";

type AnimatedMountainLinesProps = {
  className?: string;
  style?: MotionStyle;
};

export function AnimatedMountainLines({ className = "", style }: AnimatedMountainLinesProps) {
  const reduceMotion = useReducedMotion();
  const draw = (duration: number, delay = 0) => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease,
    repeat: reduceMotion ? 0 : Infinity,
    repeatDelay: 2.4,
    repeatType: "loop" as const,
  });
  const initial = reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const lineInitial = reduceMotion ? { opacity: 1 } : { opacity: 0 };
  const loopLine = (opacity: number) => (reduceMotion ? { opacity } : { opacity: [0, opacity, opacity * 0.68, opacity] });

  return (
    <motion.svg
      className={`animated-mountain-lines pointer-events-none text-[#3f5f52] ${className}`}
      style={style}
      viewBox="0 0 1440 760"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        className="mountain-line mountain-line-primary"
        d="M-36 426C80 344 143 276 247 312c72 25 100 126 174 104 98-30 133-192 236-190 91 2 126 152 218 145 79-6 111-139 201-142 104-4 155 163 256 181 56 10 98-14 151-58"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        initial={lineInitial}
        animate={loopLine(0.38)}
        transition={draw(1.85)}
      />
      <motion.path
        className="mountain-line mountain-line-secondary"
        d="M58 480c86-73 144-117 222-102 82 16 100 91 183 82 101-12 134-139 237-141 116-2 158 163 270 154 75-6 118-86 198-81 65 4 108 63 179 55"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        initial={lineInitial}
        animate={loopLine(0.31)}
        transition={draw(1.75, 0.55)}
      />
      <motion.path
        className="mountain-line mountain-line-tertiary"
        d="M24 570c188-22 338-25 517-7 178 18 313 34 547 3 130-17 229-17 363 4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        initial={lineInitial}
        animate={loopLine(0.28)}
        transition={draw(1.55, 1.15)}
      />
      <motion.path
        className="mountain-line mountain-line-tertiary"
        d="M114 620c172-24 265-24 411-7 135 16 251 23 427-4 149-23 256-18 382 11"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        initial={lineInitial}
        animate={loopLine(0.2)}
        transition={draw(1.45, 1.35)}
      />
      <motion.g
        initial={reduceMotion ? { opacity: 0.32 } : { opacity: 0 }}
        animate={{ opacity: 0.34 }}
        transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 1.95, ease }}
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      >
        <path d="M174 548v-92m0 0-27 39m27-39 27 39m-27-5-22 34m22-34 22 34" />
        <path d="M226 558v-72m0 0-22 31m22-31 22 31m-22-3-18 27m18-27 18 27" />
        <path d="M1054 530v-98m0 0-31 44m31-44 31 44m-31-4-25 38m25-38 25 38" />
        <path d="M1124 550v-76m0 0-23 32m23-32 23 32m-23-2-18 28m18-28 18 28" />
        <path d="M1190 542v-88m0 0-28 39m28-39 28 39m-28-4-22 35m22-35 22 35" />
      </motion.g>
      <motion.circle
        cx="1118"
        cy="192"
        r="43"
        stroke="currentColor"
        strokeWidth="0.85"
        initial={initial}
        animate={loopLine(0.26)}
        transition={draw(1.25, 2.25)}
      />
      <motion.g
        className="mountain-line-drift"
        initial={reduceMotion ? { opacity: 0.12 } : { opacity: 0 }}
        animate={{ opacity: 0.24 }}
        transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 2.55, ease }}
        stroke="currentColor"
        strokeWidth="0.55"
        strokeLinecap="round"
      >
        <path d="M-10 198c178-27 332-15 459 36 127 50 276 57 447 16 170-41 328-30 560 21" />
        <path d="M20 246c156-19 282-5 402 38 134 48 286 52 452 10 194-49 330-20 522 27" />
        <path d="M714 90c72 22 117 53 155 98 42 49 91 79 162 89" />
        <path d="M764 70c81 26 134 62 180 119 35 44 82 71 149 79" />
      </motion.g>
    </motion.svg>
  );
}
