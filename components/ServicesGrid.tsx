"use client";

import { motion } from "motion/react";
import { services } from "@/data/services";
import { ArrowIcon, FineIcon } from "./icons";
import { fadeUp, staggerContainer } from "./motion";

export function ServicesGrid() {
  return (
    <section id="experiences" className="bg-[linear-gradient(180deg,#FAF8F3_0%,#FFFDF8_38%,#F8F5EF_100%)] py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="label">Our Experiences</p>
            <h2 className="section-title mt-2">Choose your day at the ranch</h2>
          </div>
          <a className="hidden text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--gold)] md:inline-flex" href="#booking">
            View all
          </a>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:px-0 md:pb-0"
        >
          {services.map((service) => (
            <motion.article
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="service-card group relative min-w-[76vw] snap-center border border-[var(--border)] bg-[var(--card)] p-7 transition-colors hover:border-[var(--gold)] md:min-w-0 md:border-r-0 last:md:border-r"
              key={service.title}
            >
              <FineIcon name={service.icon} className="h-11 w-11 text-[var(--muted)] transition-colors group-hover:text-[var(--gold)]" />
              <h3 className="mt-8 font-serif text-3xl font-light text-[var(--text)]">{service.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{service.price}</p>
              <p className="mt-5 min-h-12 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
              <a className="mt-7 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--gold)] transition-transform group-hover:translate-x-1" href="#booking">
                Book <ArrowIcon className="h-4 w-4" />
              </a>
              <span className="absolute bottom-0 left-7 h-px w-[30%] bg-[var(--gold)] transition-all duration-500 group-hover:w-[calc(100%-3.5rem)]" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
