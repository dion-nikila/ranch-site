"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { BookingFlowSeed, openBookingFlow } from "./BookingFlow";
import { FineIcon } from "./icons";
import { ease, fadeUp, staggerContainer } from "./motion";

const bookingOptions = {
  date: ["This Saturday", "Next Friday", "June 28", "Next Monday"],
  guests: ["2 Riders", "4 Riders", "Family Group", "Party Crew"],
  experience: ["Trail Ride", "Riding Lesson", "Birthday Party", "Summer Camp"],
};

const dateSeeds = ["Saturday, June 20", "Friday, June 26", "Sunday, June 28", "Monday, June 29"];
const guestSeeds = [2, 4, 5, 10];
const serviceSeeds: BookingFlowSeed["serviceId"][] = ["trail", "lesson", "party", "camp"];

const fieldConfig = [
  { key: "date", label: "Date", icon: "calendar" },
  { key: "guests", label: "Guests", icon: "horse" },
  { key: "experience", label: "Experience", icon: "stable" },
] as const;

export function BookingBar() {
  const [selected, setSelected] = useState({
    date: 0,
    guests: 0,
    experience: 0,
  });
  const [checked, setChecked] = useState(false);
  const [openKey, setOpenKey] = useState<keyof typeof bookingOptions | null>(null);

  const summary = useMemo(
    () =>
      `${bookingOptions.experience[selected.experience]} for ${bookingOptions.guests[selected.guests].toLowerCase()} • ${bookingOptions.date[selected.date]}`,
    [selected],
  );

  const selectOption = (key: keyof typeof bookingOptions, index: number) => {
    setChecked(false);
    setOpenKey(null);
    setSelected((current) => ({
      ...current,
      [key]: index,
    }));
  };

  const checkAvailability = () => {
    setChecked(true);
    openBookingFlow({
      serviceId: serviceSeeds[selected.experience],
      riderCount: guestSeeds[selected.guests],
      selectedDate: dateSeeds[selected.date],
      step: 2,
    });
  };

  return (
    <motion.section
      id="booking"
      className="relative z-20 w-full px-4 py-8 md:-mt-5 md:px-0 md:py-10"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="booking-shell rounded-[1.25rem] border border-white/10 p-3 text-white md:p-5 lg:p-6">
        <div className="booking-shell-header">
          <div>
            <span className="booking-shell-kicker">Check Availability</span>
            <p>Shape a quiet ranch day in a few taps.</p>
          </div>
          <span aria-hidden="true">Private rides • gentle horses</span>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="booking-grid grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.08fr)_minmax(12.5rem,auto)]">
          {fieldConfig.map(({ key, label, icon }) => (
            <motion.div
              variants={fadeUp}
              className="booking-field relative min-w-0"
              key={label}
            >
              <button
                type="button"
                aria-expanded={openKey === key}
                aria-haspopup="listbox"
                onClick={() => setOpenKey((current) => (current === key ? null : key))}
                className="booking-select-card group w-full text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
              >
                <span className="booking-field-icon">
                  <FineIcon name={icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="booking-field-label">{label}</span>
                  <span className="booking-field-value">
                    {bookingOptions[key][selected[key]]}
                  </span>
                </span>
                <svg className={`booking-field-arrow h-4 w-4 shrink-0 text-[var(--gold)] transition-transform ${openKey === key ? "rotate-180" : "group-hover:translate-y-0.5"}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openKey === key && (
                <div className="booking-dropdown" role="listbox" aria-label={label}>
                  {bookingOptions[key].map((option, index) => (
                    <button
                      className={`booking-dropdown-option ${selected[key] === index ? "is-selected" : ""}`}
                      key={option}
                      onClick={() => selectOption(key, index)}
                      role="option"
                      aria-selected={selected[key] === index}
                      type="button"
                    >
                      <span>{option}</span>
                      {selected[key] === index && <span className="text-[var(--gold)]">Selected</span>}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          <motion.button
            variants={fadeUp}
            type="button"
            onClick={checkAvailability}
            className="booking-check-button button-shimmer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>{checked ? "Time Found" : "Check Availability"}</span>
            <small>{checked ? "Opening ready" : "Find my ride"}</small>
          </motion.button>
        </motion.div>
        <div className="booking-footer flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-1 pb-1 pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/62 md:px-2">
          <div className="booking-trust-row flex flex-wrap gap-x-8 gap-y-2">
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
