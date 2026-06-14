"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ease, fadeUp, staggerContainer } from "./motion";

const bookingOptions = {
  date: ["This Saturday", "Next Friday", "June 28", "Custom Date"],
  guests: ["2 Riders", "4 Riders", "Family Group", "Party Crew"],
  experience: ["Trail Ride", "Riding Lesson", "Pony Party", "Summer Camp"],
};

const fieldConfig = [
  { key: "date", label: "Date" },
  { key: "guests", label: "Guests" },
  { key: "experience", label: "Experience" },
] as const;

export function BookingBar() {
  const [selected, setSelected] = useState({
    date: 0,
    guests: 0,
    experience: 0,
  });
  const [checked, setChecked] = useState(false);

  const summary = useMemo(
    () =>
      `${bookingOptions.experience[selected.experience]} for ${bookingOptions.guests[selected.guests].toLowerCase()} • ${bookingOptions.date[selected.date]}`,
    [selected],
  );

  const cycleOption = (key: keyof typeof bookingOptions) => {
    setChecked(false);
    setSelected((current) => ({
      ...current,
      [key]: (current[key] + 1) % bookingOptions[key].length,
    }));
  };

  return (
    <motion.section
      id="booking"
      className="relative z-20 mx-auto max-w-[1280px] px-5 py-8 md:-mt-5 md:px-8 md:py-10"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="booking-shell rounded-[1.15rem] border border-white/10 bg-[var(--green)] p-3 text-white shadow-[0_24px_70px_rgba(24,56,45,0.16)] md:p-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {fieldConfig.map(({ key, label }) => (
            <motion.button
              variants={fadeUp}
              type="button"
              onClick={() => cycleOption(key)}
              className="group min-h-20 rounded-[0.8rem] border border-white/14 bg-[#21483a] px-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-all hover:border-[var(--gold)] hover:bg-[#255140] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
              key={label}
            >
              <span className="block text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white/52">
                {label}
              </span>
              <span className="mt-2 flex items-center justify-between font-serif text-[1.45rem] font-light leading-none text-white">
                {bookingOptions[key][selected[key]]}
                <svg className="h-4 w-4 shrink-0 text-[var(--gold)] transition-transform group-hover:translate-y-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.button>
          ))}
          <motion.button
            variants={fadeUp}
            type="button"
            onClick={() => setChecked(true)}
            className="button-shimmer min-h-20 rounded-[0.8rem] bg-[var(--gold)] px-8 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-[#96763d] hover:shadow-[0_16px_38px_rgba(168,135,74,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {checked ? "Time Found" : "Check Availability"}
          </motion.button>
        </motion.div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-1 pb-1 pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/62 md:px-2">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span>Best Rate Guarantee</span>
            <span>No Booking Fees</span>
            <span>Secure Reservation</span>
          </div>
          <p aria-live="polite" className="max-w-full text-left normal-case tracking-normal text-white/76">
            {checked ? `We found an opening: ${summary}.` : "Tap each field to explore options."}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
