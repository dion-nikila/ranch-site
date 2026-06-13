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
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -30]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -15]);

  return (
    <section ref={heroRef} className="hero-section relative min-h-[100svh] overflow-hidden pb-12 pt-24 md:min-h-[92vh] md:pb-20 md:pt-28">
      <AnimatedMountainLines
        className="hero-landscape absolute left-1/2 top-[8%] z-0 h-[82%] w-[132vw] max-w-none -translate-x-1/2"
        style={{ y: mountainY }}
      />
      <motion.div
        className="hero-mist-layer"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease }}
      />
      <motion.div
        className="hero-light-sweep"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 1.2, ease }}
      />
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1440px] items-start gap-8 px-5 pt-9 md:min-h-[calc(92vh-7rem)] md:items-center md:gap-12 md:px-8 md:pt-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-[600px] pt-7"
        >
          <motion.p variants={fadeUp} className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[var(--gold)]">
            Horseback. Nature. Stillness.
          </motion.p>
          <motion.h1
            variants={staggerContainer}
            className="font-serif text-[clamp(2.35rem,12.6vw,3.08rem)] font-light leading-[0.92] tracking-[-0.02em] text-[var(--text)] md:text-[4.85rem] xl:text-[5.15rem]"
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

        <motion.div
          className="relative z-10 min-h-[430px] max-md:pointer-events-none max-md:absolute max-md:inset-x-[-3rem] max-md:bottom-[-1.5rem] max-md:z-0 max-md:h-[58svh] max-md:min-h-0 md:min-h-[560px] lg:min-h-[650px]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease }}
          style={{ y: imageY }}
        >
          <div className="hero-photo hero-photo-soft absolute inset-0 z-10 overflow-hidden bg-transparent grayscale">
            <div className="hero-image-layer absolute inset-0 bg-[url('/images/horse-hero-editorial.png')] bg-cover bg-center opacity-95 mix-blend-multiply max-md:bg-[position:62%_42%] lg:bg-[position:center]" />
            <div className="horse-fallback absolute inset-0" />
            <div className="hero-photo-vignette absolute inset-0" />
          </div>
          <motion.div
            className="hero-orbit-line"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 2.1, ease }}
          />
        </motion.div>
      </div>
      <div className="hero-scroll-indicator" aria-hidden="true" />
    </section>
  );
}
