"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { ease } from "./motion";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="journal" className="bg-[linear-gradient(180deg,#FAF8F3_0%,#F8F5EF_100%)] py-16 md:py-20">
      <div className="mx-auto max-w-[880px] px-5 text-center md:px-8">
        <p className="label">Guests say it best</p>
        <div className="relative mt-8 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.quote}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="font-serif text-4xl font-light leading-tight text-[var(--text)] md:text-6xl">
                “{current.quote}”
              </p>
              <p className="mt-8 text-sm font-semibold text-[var(--text)]">{current.author}</p>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                {current.location}
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            aria-label="Previous testimonial"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--gold)] shadow-[0_10px_28px_rgba(23,23,23,0.05)] transition-all hover:-translate-x-1 hover:border-[var(--gold)] md:flex"
            onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
          >
            ←
          </button>
          <button
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--gold)] shadow-[0_10px_28px_rgba(23,23,23,0.05)] transition-all hover:translate-x-1 hover:border-[var(--gold)] md:flex"
            onClick={() => setIndex((index + 1) % testimonials.length)}
          >
            →
          </button>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((item, itemIndex) => (
            <button
              className={`h-2 rounded-full transition-all ${itemIndex === index ? "w-8 bg-[var(--gold)]" : "w-2 bg-[var(--border)]"}`}
              aria-label={`Show testimonial ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
              key={item.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
