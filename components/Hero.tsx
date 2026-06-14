"use client";

import Image from "next/image";
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
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -32]);
  const horseY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -24]);

  return (
    <section ref={heroRef} className="hero-section relative min-h-[88svh] overflow-hidden pb-10 pt-24 md:min-h-[92vh] md:pb-20 md:pt-28">
      <div className="hero-photo-backdrop" aria-hidden="true" />
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
      <motion.div
        className="hero-horse-feature"
        aria-hidden="true"
        style={{ y: horseY }}
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.05, delay: 0.5, ease }}
      >
        <div className="hero-horse-feature-image">
          <Image
            src="/images/hero-equestrian-contours-2x.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-horse-feature-asset"
          />
        </div>
      </motion.div>
      <div className="hero-inner relative z-10 mx-auto grid min-h-[calc(88svh-6rem)] max-w-[1440px] items-start px-5 pt-9 md:min-h-[calc(92vh-7rem)] md:items-center md:px-8 md:pt-0 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial={false}
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
