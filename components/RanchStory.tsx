"use client";

import { motion } from "motion/react";
import { AnimatedMountainLines } from "./AnimatedMountainLines";
import { ease, fadeUp, staggerContainer } from "./motion";

export function RanchStory() {
  return (
    <section id="the-ranch" className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(12,22,19,0.86)_0%,rgba(17,29,25,0.72)_100%)] py-16 md:py-24">
      <AnimatedMountainLines animated={false} className="absolute left-1/2 top-[-12%] h-[124%] w-[1500px] max-w-none -translate-x-1/2 opacity-60" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 px-5 md:grid-cols-[1fr_0.86fr] md:items-end md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p variants={fadeUp} className="label">
            The Ranch
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title mt-2">
            Open trails, kind horses, easy days
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Willow Creek is built around unhurried time outdoors: shaded paths, patient instruction, thoughtful hosting, and enough room for first rides to feel memorable.
          </motion.p>
        </motion.div>
        <motion.div
          className="border-l border-[var(--gold)]/40 pl-6"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-serif text-4xl font-light leading-tight text-[var(--text)] md:text-5xl">
            Private trails, small groups, and a pace set by the horse.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
