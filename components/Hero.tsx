"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedMountainLines } from "./AnimatedMountainLines";
import { Button } from "./Button";
import { fadeUp, staggerContainer, ease } from "./motion";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 42]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.03, reduceMotion ? 1.03 : 1.08]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -32]);
  const horseY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -24]);

  return (
    <section ref={heroRef} className="hero-section relative min-h-[88svh] overflow-hidden pb-10 pt-24 md:min-h-[92vh] md:pb-20 md:pt-28">
      <motion.div
        className="hero-photo-backdrop"
        aria-hidden="true"
        initial={false}
        style={{ y: backdropY, scale: backdropScale }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.15, ease }}
      />
      <AnimatedMountainLines
        className="hero-landscape hero-landscape-primary hero-lines-calm absolute left-1/2 top-[2%] z-[2] h-[94%] w-[152vw] max-w-none -translate-x-1/2"
        style={{ y: mountainY }}
        animated={false}
      />
      <AnimatedMountainLines
        className="hero-landscape hero-landscape-echo hero-lines-calm absolute left-1/2 top-[12%] z-[2] h-[76%] w-[124vw] max-w-none -translate-x-1/2"
        style={{ y: mountainY }}
        animated={false}
      />
      <motion.div
        className="hero-mist-layer"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease }}
      />
      <motion.svg
        className="hero-horse-line-art"
        aria-hidden="true"
        viewBox="0 0 620 720"
        fill="none"
        style={{ y: horseY }}
        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.05, delay: 0.5, ease }}
      >
        <path
          d="M382 98c-38 12-74 43-88 85-7 21-8 45-2 67 9 35 38 62 54 94 24 47 22 112 6 165-10 34-27 67-24 103"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M399 109c32 21 58 55 70 94 10 32 9 68-2 100-14 39-44 69-58 108-18 50-7 105 8 153"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M295 205c-50 16-85 45-105 86-15 31-19 67-13 104 9 56 43 99 63 151 14 38 17 80 11 122"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
        <path
          d="M368 105c-22-43-58-66-96-73-22-4-41 2-56 18 27 11 45 33 58 60"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M431 116c31-36 72-48 121-39-28 26-45 57-53 96"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M335 229c42-20 89-18 128 6"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M321 273c53 31 111 31 161 0"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M294 336c55 44 143 43 200-3"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path
          d="M267 444c66 52 169 50 233-5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M250 548c72 47 166 47 241-1"
          stroke="currentColor"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <path
          d="M404 217c7 0 13 5 14 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M192 294c-29 7-60-5-85-29-28-28-47-64-80-85 47-8 94 6 128 39 19 18 32 40 48 61"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M188 365c-36 10-79 3-121-20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.svg>
      <div className="hero-inner relative z-10 mx-auto grid min-h-[calc(88svh-6rem)] max-w-[1440px] items-start px-5 pt-9 md:min-h-[calc(92vh-7rem)] md:items-center md:px-8 md:pt-0 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="relative z-20 max-w-[720px] pt-7"
        >
          <motion.p variants={fadeUp} className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[var(--gold)]">
            Horseback. Nature. Stillness.
          </motion.p>
          <motion.h1
            variants={staggerContainer}
            className="font-serif text-[clamp(2.35rem,12.6vw,3.08rem)] font-light leading-[0.92] tracking-[-0.02em] text-[var(--text)] md:text-[4.85rem] xl:text-[5rem]"
          >
            {["Return to", "what moves you."].map((line) => (
              <motion.span variants={fadeUp} className="block whitespace-nowrap" key={line}>
                {line}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-[520px] text-lg leading-8 text-[var(--muted)]">
            A private ranch experience where trail rides, lessons, boarding, camps, and celebrations come together with quiet hospitality.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 grid gap-3 sm:flex">
            <Button>Book a Ride</Button>
            <Button variant="outlineDark">View Pricing & Packages</Button>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-sm text-[var(--muted)]">
            Private trails <span className="text-[var(--gold)]">•</span> Gentle horses <span className="text-[var(--gold)]">•</span> Beginner-friendly experiences
          </motion.p>
        </motion.div>
      </div>
      <div className="hero-scroll-indicator" aria-hidden="true" />
    </section>
  );
}
