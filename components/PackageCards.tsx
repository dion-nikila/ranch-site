"use client";

import { motion } from "motion/react";
import { packages } from "@/data/packages";
import { Button } from "./Button";
import { fadeUp, staggerContainer } from "./motion";

export function PackageCards() {
  return (
    <section id="trail-rides" className="bg-[linear-gradient(180deg,#F8F5EF_0%,#FAF8F3_100%)] py-18 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label">Popular Experiences</p>
          <h2 className="section-title mt-2">Simple packages, beautifully hosted</h2>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {packages.map((item) => (
            <motion.article
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className={`group relative border bg-[var(--card)] p-8 transition-colors hover:border-[var(--gold)] ${item.popular ? "border-[var(--gold)]" : "border-[var(--border)]"}`}
              key={item.label}
            >
              {item.popular && (
                <span className="absolute right-8 top-8 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[0.52rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                  Most Popular
                </span>
              )}
              <p className="label">{item.label}</p>
              <p className="mt-8 font-serif text-6xl font-light text-[var(--text)] transition-transform duration-300 group-hover:scale-[1.03]">
                {item.price}
              </p>
              <div className="my-7 h-px bg-[var(--border)]" />
              <p className="text-sm font-semibold text-[var(--text)]">{item.detail}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.ages}</p>
              <p className="mt-5 min-h-14 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              <Button className="mt-8 w-full">Reserve</Button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
