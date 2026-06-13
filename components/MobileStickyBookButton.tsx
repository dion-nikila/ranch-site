"use client";

import { useEffect, useState } from "react";

export function MobileStickyBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`fixed bottom-3 left-3 right-3 z-50 flex min-h-14 items-center justify-center bg-[var(--gold)] text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white shadow-[0_18px_40px_rgba(23,23,23,0.18)] transition-all duration-500 md:hidden ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"}`}
      href="#booking"
    >
      Book Now
    </a>
  );
}
