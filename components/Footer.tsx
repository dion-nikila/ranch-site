"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const columns = {
  Explore: ["Experiences", "Trail Rides", "Lessons", "Camps"],
  "The Ranch": ["About", "Guides", "Boarding", "Journal"],
  Resources: ["Policies", "Pricing", "Gift Cards", "FAQs"],
};

function FooterRow({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/12 py-4 md:border-0 md:py-0">
      <button className="flex w-full items-center justify-between text-left md:pointer-events-none" onClick={() => setOpen(!open)}>
        <span className="label text-white/56">{title}</span>
        <span className="text-[var(--gold)] md:hidden">{open ? "-" : "+"}</span>
      </button>
      <div className={`${open ? "block" : "hidden"} pt-4 text-sm leading-7 text-white/68 md:block`}>{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-[#121f1a] pb-24 pt-14 text-white md:pb-8 md:pt-16">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 md:grid-cols-[0.84fr_1.52fr_1fr] md:px-8 lg:gap-14 lg:px-12">
        <div>
          <Logo inverse />
          <p className="mt-6 max-w-xs font-serif text-3xl font-light leading-tight text-white">
            Rooted in nature. Made for memories.
          </p>
          <div className="mt-8 flex gap-3">
            {["f", "ig", "yt"].map((icon) => (
              <a className="flex h-10 w-10 items-center justify-center border border-white/15 text-[0.68rem] font-bold uppercase tracking-wider transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]" href="#" aria-label={icon} key={icon}>
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-[0.95fr_0.95fr_1.55fr]">
          <FooterRow title="Contact">
            <p>(530) 555-0198</p>
            <p>hello@willowcreekranch.com</p>
            <p>123 Ranch Way<br />Auburn, CA 95602</p>
          </FooterRow>
          <FooterRow title="Hours">
            <p>Monday-Friday: 8:00am-6:00pm</p>
            <p>Saturday: 8:00am-7:00pm</p>
            <p>Sunday: 9:00am-5:00pm</p>
          </FooterRow>
          <FooterRow title="Location">
            <div className="map-placeholder relative min-h-40 overflow-hidden rounded-[0.8rem] border border-white/12 bg-[#182821]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 170" fill="none" aria-label="Minimal map illustration" role="img">
                <rect width="260" height="170" fill="#182821" />
                <path d="M-20 48C26 40 45 62 84 56c34-6 44-35 81-34 35 1 58 32 114 17" stroke="#DED8CC" strokeOpacity="0.16" strokeWidth="17" strokeLinecap="round" />
                <path d="M-16 132c44-32 79-28 112-53 31-23 51-55 94-43 33 9 51 41 91 33" stroke="#DED8CC" strokeOpacity="0.13" strokeWidth="13" strokeLinecap="round" />
                <path d="M34 7v156M103 0v171M178 0v171M0 52h260M0 113h260" stroke="#DED8CC" strokeOpacity="0.07" />
                <path d="M22 132C72 98 88 103 124 76c38-29 60-45 111-35" stroke="#A8874A" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 7" />
                <path d="M139 78c11-19 42-20 57-4 15 15 39 13 51 1" stroke="#F8F5EF" strokeOpacity="0.28" strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="151" cy="72" r="12" fill="#A8874A" fillOpacity="0.18" />
                <path d="M151 55c8 0 15 7 15 15 0 11-15 27-15 27s-15-16-15-27c0-8 7-15 15-15Z" fill="#A8874A" />
                <circle cx="151" cy="70" r="4.5" fill="#FFFDF8" />
                <text x="128" y="126" fill="#DED8CC" fillOpacity="0.72" fontSize="8" fontFamily="serif" letterSpacing="1.8">123 RANCH WAY</text>
              </svg>
            </div>
          </FooterRow>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(columns).map(([title, links]) => (
              <div key={title}>
                <p className="label text-white/56">{title}</p>
                <div className="mt-4 grid gap-3">
                  {links.map((link) => (
                    <a className="text-sm text-white/68 transition-colors hover:text-[var(--gold)]" href="#" key={link}>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-9">
            <p className="label text-white/56">Stay Connected</p>
            <div className="mt-4 flex overflow-hidden rounded-[0.65rem] border border-white/15 bg-white/[0.03]">
              <input className="min-h-12 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/38" placeholder="Email address" aria-label="Email address" />
              <button className="button-shimmer min-h-12 bg-[var(--gold)] px-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#96763d]">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1280px] flex-wrap justify-between gap-4 border-t border-white/12 px-5 pt-6 text-xs text-white/42 md:px-8 lg:px-12">
        <p>© 2026 Willow Creek Ranch. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
