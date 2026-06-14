"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedMountainLines } from "./AnimatedMountainLines";
import { Button } from "./Button";
import { fadeUp, staggerContainer, ease } from "./motion";

const heroAdventures = [
  {
    title: "Trail Rides",
    detail: "Private routes",
    meta: "60-90 min",
  },
  {
    title: "Lessons",
    detail: "Beginner ready",
    meta: "1:1 or group",
  },
  {
    title: "Parties",
    detail: "Pony-led days",
    meta: "Ages 3+",
  },
];

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
  const panelY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -22]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 52]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -28]);

  return (
    <section ref={heroRef} className="hero-section relative min-h-[100svh] overflow-hidden pb-12 pt-24 md:min-h-[92vh] md:pb-20 md:pt-28">
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
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1440px] items-start gap-8 px-5 pt-9 md:min-h-[calc(92vh-7rem)] md:items-center md:px-8 md:pt-0 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.62fr)] lg:gap-10 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="relative z-20 max-w-[690px] pt-7"
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
        <motion.aside
          style={{ y: panelY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.48, ease }}
          className="hero-adventure-panel relative z-10"
        >
          <motion.div className="hero-adventure-media" aria-hidden="true" style={{ y: mediaY, scale: 1.05 }} />
          <motion.div className="hero-adventure-content" style={{ y: contentY }}>
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)]">Your Adventure Awaits</p>
              <h2 className="mt-2 max-w-[12ch] font-serif text-[clamp(2.35rem,7.4vw,4.2rem)] font-light leading-[0.9] text-white lg:text-[3.95rem]">
                Choose your trail.
              </h2>
              <p className="mt-3 max-w-[24rem] text-sm leading-6 text-white/68">
                Guided rides, lessons, and private celebrations shaped around the pace of your day.
              </p>
            </div>
            <div className="hero-adventure-routes" aria-label="Featured experiences">
              {heroAdventures.map((adventure) => (
                <a
                  className="hero-adventure-route group"
                  href="#booking"
                  key={adventure.title}
                >
                  <span>
                    <span className="block font-serif text-2xl font-light leading-none text-white">{adventure.title}</span>
                    <span className="mt-1 block text-sm text-white/64">{adventure.detail}</span>
                  </span>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">{adventure.meta}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.aside>
      </div>
      <div className="hero-scroll-indicator" aria-hidden="true" />
    </section>
  );
}
