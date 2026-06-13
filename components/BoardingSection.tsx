"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "./motion";

const details = [
  "Daily turnout and stall care",
  "Quiet pastures with attentive supervision",
  "Owner updates and flexible support",
];

export function BoardingSection() {
  return (
    <section id="boarding" className="bg-[linear-gradient(180deg,#FAF8F3_0%,#FFFDF8_100%)] py-16 md:py-22">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 md:grid-cols-[0.92fr_1.08fr] md:items-center md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p variants={fadeUp} className="label">
            Boarding
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title mt-2">
            A calmer home between rides
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Full-care boarding with steady routines, clean spaces, and people who know every horse by name.
          </motion.p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-3"
        >
          {details.map((detail) => (
            <motion.div
              variants={fadeUp}
              className="flex min-h-20 items-center gap-4 border border-[var(--border)] bg-[var(--card)] px-5 py-4"
              key={detail}
            >
              <span className="h-px w-12 shrink-0 bg-[var(--gold)]" />
              <p className="font-serif text-2xl font-light leading-tight text-[var(--text)]">{detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
