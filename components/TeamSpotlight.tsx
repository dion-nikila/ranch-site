"use client";

import { motion } from "motion/react";
import { team } from "@/data/team";
import { fadeUp, staggerContainer } from "./motion";

export function TeamSpotlight() {
  return (
    <section id="lessons-and-training" className="bg-[linear-gradient(180deg,#FFFDF8_0%,#FAF8F3_100%)] py-18 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 text-center md:px-8">
        <p className="label">Meet Your Instructors</p>
        <h2 className="section-title mt-2">Meet Your Guides</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-[var(--muted)]">
          Experienced horse people, gentle instructors, and welcoming hosts.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-10"
        >
          {team.map((member) => (
            <motion.article variants={fadeUp} className="group" key={member.name}>
              <div className="portrait-fallback mx-auto h-40 w-32 overflow-hidden rounded-[50%] border border-[var(--border)] bg-[var(--bg)] grayscale transition-transform duration-500 group-hover:scale-[1.04] md:h-48 md:w-40">
                <div className="h-full w-full bg-cover bg-center opacity-80 mix-blend-multiply" style={{ backgroundImage: `url(${member.image})` }} />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-light text-[var(--text)] transition-transform duration-300 group-hover:-translate-y-1">
                {member.name}
              </h3>
              <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                {member.role}
              </p>
              <a className="mt-3 inline-block text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--gold)] opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100" href="#contact">
                View Bio
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
