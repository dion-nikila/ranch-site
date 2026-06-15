"use client";

import { motion } from "motion/react";
import { openBookingFlow } from "./BookingFlow";
import { Button } from "./Button";
import { ease } from "./motion";

export function FinalCTA() {
  return (
    <section id="camps-and-parties" className="px-5 py-12 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease }}
        className="topo-bg relative mx-auto max-w-[1280px] overflow-hidden bg-[var(--green)] px-6 py-16 text-center text-white md:px-10 md:py-24"
      >
        <svg className="mx-auto mb-6 h-12 w-12 text-[var(--gold)]" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M15 35c0-13 4-22 14-24l7 6-3 7 6 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 35c5 3 13 3 20 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <h2 className="font-serif text-5xl font-light leading-none md:text-7xl">Your Adventure Awaits</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
          Book a ride, plan a party, schedule a lesson, or spend the day at the ranch.
        </p>
        <Button className="mt-9" onClick={() => openBookingFlow()}>Book Your Experience</Button>
      </motion.div>
    </section>
  );
}
