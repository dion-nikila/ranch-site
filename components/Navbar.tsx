"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Logo } from "./Logo";
import { ease } from "./motion";

const navLinks = [
  "Experiences",
  "Lessons & Training",
  "Trail Rides",
  "Camps & Parties",
  "Boarding",
  "The Ranch",
  "Journal",
  "Contact",
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(250,248,243,0.86)] backdrop-blur-xl"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease }}
    >
      <nav className="mx-auto flex h-[4.75rem] max-w-[1440px] items-center justify-between px-4 sm:px-5 md:h-20 md:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <Logo />
        </motion.div>
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <a
              className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--text)] transition-colors hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] xl:text-[0.62rem]"
              href={`#${link.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
              key={link}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden min-h-11 whitespace-nowrap border border-[var(--gold)] px-6 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] md:block xl:px-7">
            Book Now
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="group flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--gold)] lg:hidden"
          >
            <span className="relative h-4 w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-[var(--text)] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2 h-px w-6 bg-[var(--text)] transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-[var(--text)] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-[4.75rem] z-40 border-b border-[var(--border)] bg-[var(--bg)] px-6 pb-8 pt-5 shadow-[0_28px_70px_rgba(23,23,23,0.08)] md:top-20 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <a
                  className="border-b border-[var(--border)] py-4 font-serif text-3xl text-[var(--text)]"
                  href={`#${link.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
                  key={link}
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
            <button className="mt-6 min-h-12 w-full bg-[var(--gold)] text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
