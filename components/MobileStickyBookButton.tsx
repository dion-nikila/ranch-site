"use client";

import { useEffect, useState } from "react";
import { openBookingFlow } from "./BookingFlow";
import { FineIcon } from "./icons";

const mobileActions = [
  {
    href: "#booking",
    icon: "calendar",
    label: "Reserve",
    detail: "Ride time",
  },
  {
    href: "#trail-rides",
    icon: "horse",
    label: "Trails",
    detail: "Packages",
  },
  {
    href: "#lessons-and-training",
    icon: "boot",
    label: "Lessons",
    detail: "Training",
  },
];

export function MobileStickyBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.42);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Quick ranch actions"
      className={`mobile-action-dock fixed bottom-3 left-3 right-3 z-50 md:hidden ${visible ? "is-visible" : ""}`}
    >
      {mobileActions.map((action) => (
        <a
          className="mobile-action-dock-item"
          href={action.href}
          key={action.href}
          onClick={(event) => {
            if (action.href === "#booking") {
              event.preventDefault();
              openBookingFlow();
            }
          }}
        >
          <span className="mobile-action-dock-icon">
            <FineIcon name={action.icon} className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="mobile-action-dock-label">{action.label}</span>
            <span className="mobile-action-dock-detail">{action.detail}</span>
          </span>
        </a>
      ))}
    </nav>
  );
}
