"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { ease } from "./motion";

type ServiceId = "trail" | "lesson" | "party" | "camp";
type SkillLevel = "never" | "tried" | "some" | "confident" | "";

type Service = {
  id: ServiceId;
  name: string;
  description: string;
  priceRange: string;
  eligibility: string;
  basePrice: number;
  unit: string;
  maxRiders: number;
  minimumAge: number;
  bestFor: string;
  scheduleNote: string;
  addonNote: string;
};

type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
  appliesTo: ServiceId[];
  perPerson?: boolean;
};

const services: Service[] = [
  {
    id: "trail",
    name: "Trail Ride",
    description: "Guided rides for families, couples, and small groups.",
    priceRange: "$85-$125 / rider",
    eligibility: "Ages 8+",
    basePrice: 95,
    unit: "per rider",
    maxRiders: 8,
    minimumAge: 8,
    bestFor: "Families and small groups who want a guided outdoor ride.",
    scheduleNote: "Trail rides run most days, with shorter weekend windows.",
    addonNote: "Trail add-ons focus on staffing and keeping larger groups smooth.",
  },
  {
    id: "lesson",
    name: "Riding Lesson",
    description: "Calm coaching for first rides through confident riders.",
    priceRange: "$65-$110 / rider",
    eligibility: "Ages 5+",
    basePrice: 75,
    unit: "per rider",
    maxRiders: 4,
    minimumAge: 5,
    bestFor: "New riders, nervous riders, or anyone building fundamentals.",
    scheduleNote: "Lessons have the most flexible weekday availability.",
    addonNote: "Lesson add-ons stay simple so the coaching time stays focused.",
  },
  {
    id: "party",
    name: "Birthday Party",
    description: "Pony time, photos, and room for the whole crew.",
    priceRange: "$325-$650",
    eligibility: "Groups up to 15",
    basePrice: 425,
    unit: "base package",
    maxRiders: 15,
    minimumAge: 3,
    bestFor: "Birthdays, pony time, and groups with younger kids.",
    scheduleNote: "Party slots are limited to setup-friendly windows.",
    addonNote: "Party add-ons are grouped around food, play, and kid activities.",
  },
  {
    id: "camp",
    name: "Summer Camp",
    description: "Half-day ranch weeks for curious young riders.",
    priceRange: "$295-$425",
    eligibility: "Ages 6-14",
    basePrice: 325,
    unit: "per camper",
    maxRiders: 12,
    minimumAge: 6,
    bestFor: "Kids who want a structured half-day ranch week.",
    scheduleNote: "Camp starts in the morning and follows a set weekly rhythm.",
    addonNote: "Camp add-ons are light-touch extras for the group day.",
  },
];

const addOns: AddOn[] = [
  { id: "bounce", name: "Bounce house", price: 125, description: "A shaded party favorite for younger guests.", appliesTo: ["party"] },
  { id: "painting", name: "Horse painting", price: 50, description: "A gentle, supervised creative activity.", appliesTo: ["party", "camp", "lesson"] },
  { id: "guide", name: "Extra guide for group", price: 5, perPerson: true, description: "More hands for larger or newer groups.", appliesTo: ["trail", "party"] },
  { id: "pizza", name: "Pizza", price: 10, description: "Simple lunch after the ride or party.", appliesTo: ["party", "camp"] },
];

const skillLabels: Record<Exclude<SkillLevel, "">, string> = {
  never: "Never ridden",
  tried: "Tried once or twice",
  some: "Some experience",
  confident: "Confident",
};

const calendarDays: Array<{ date: string; day: string; full: string; weekend: boolean; slots: Record<ServiceId, string[]> }> = [
  { date: "Jun 20", day: "Sat", full: "Saturday, June 20", weekend: true, slots: { trail: ["9:00 AM", "10:30 AM", "1:00 PM"], lesson: ["9:00 AM", "11:30 AM"], party: ["10:00 AM", "1:30 PM"], camp: [] } },
  { date: "Jun 21", day: "Sun", full: "Sunday, June 21", weekend: true, slots: { trail: ["9:30 AM", "11:00 AM", "1:30 PM"], lesson: ["10:00 AM"], party: ["11:00 AM", "2:00 PM"], camp: [] } },
  { date: "Jun 22", day: "Mon", full: "Monday, June 22", weekend: false, slots: { trail: [], lesson: ["10:00 AM", "2:00 PM", "4:00 PM"], party: [], camp: ["9:00 AM"] } },
  { date: "Jun 23", day: "Tue", full: "Tuesday, June 23", weekend: false, slots: { trail: ["10:00 AM", "12:30 PM", "3:00 PM"], lesson: ["10:30 AM", "1:30 PM", "4:30 PM"], party: [], camp: ["9:00 AM"] } },
  { date: "Jun 24", day: "Wed", full: "Wednesday, June 24", weekend: false, slots: { trail: ["10:30 AM", "1:30 PM", "4:00 PM"], lesson: ["11:00 AM", "3:30 PM"], party: ["3:00 PM"], camp: ["9:00 AM"] } },
  { date: "Jun 25", day: "Thu", full: "Thursday, June 25", weekend: false, slots: { trail: [], lesson: ["10:00 AM", "12:00 PM"], party: [], camp: ["9:00 AM"] } },
  { date: "Jun 26", day: "Fri", full: "Friday, June 26", weekend: false, slots: { trail: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"], lesson: ["10:00 AM", "1:00 PM"], party: ["4:00 PM"], camp: ["9:00 AM"] } },
  { date: "Jun 27", day: "Sat", full: "Saturday, June 27", weekend: true, slots: { trail: ["9:00 AM", "12:00 PM", "2:00 PM"], lesson: ["9:30 AM"], party: ["10:30 AM", "2:30 PM"], camp: [] } },
  { date: "Jun 28", day: "Sun", full: "Sunday, June 28", weekend: true, slots: { trail: [], lesson: ["11:00 AM"], party: [], camp: [] } },
  { date: "Jun 29", day: "Mon", full: "Monday, June 29", weekend: false, slots: { trail: ["10:00 AM", "1:00 PM", "3:30 PM"], lesson: ["10:00 AM", "2:30 PM", "4:30 PM"], party: [], camp: ["9:00 AM"] } },
];

const openBookingEvent = "open-booking-flow";

export type BookingFlowSeed = {
  serviceId?: ServiceId;
  riderCount?: number;
  selectedDate?: string;
  step?: 1 | 2 | 3;
};

export function openBookingFlow(seed?: BookingFlowSeed) {
  window.dispatchEvent(new CustomEvent<BookingFlowSeed>(openBookingEvent, { detail: seed }));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let frame = 0;
    const start = display;
    const diff = value - start;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / 360, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return display;
}

export function BookingFlow() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState<ServiceId | "">("");
  const [riderCount, setRiderCount] = useState(2);
  const [ages, setAges] = useState(["8", "10"]);
  const [weightConfirmed, setWeightConfirmed] = useState(false);
  const [skill, setSkill] = useState<SkillLevel>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", requests: "" });
  const [policyConfirmed, setPolicyConfirmed] = useState(false);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const seed = event instanceof CustomEvent ? event.detail as BookingFlowSeed | undefined : undefined;
      if (seed?.serviceId) setServiceId(seed.serviceId);
      if (seed?.riderCount) setRiderCount(seed.riderCount);
      if (seed?.selectedDate) {
        setSelectedDate(seed.selectedDate);
        setSelectedTime("");
      }
      setSelectedAddOns([]);
      setStep(seed?.step ?? (seed?.serviceId ? 2 : 1));
      setOpen(true);
    };
    window.addEventListener(openBookingEvent, onOpen);
    return () => window.removeEventListener(openBookingEvent, onOpen);
  }, []);

  useEffect(() => {
    setAges((current) => {
      const next = Array.from({ length: riderCount }, (_, index) => current[index] ?? "");
      return next;
    });
  }, [riderCount]);

  const service = services.find((item) => item.id === serviceId);
  const availableAddOns = addOns.filter((item) => service && item.appliesTo.includes(service.id));
  const serviceSlots = (day: typeof calendarDays[number]) => service ? day.slots[service.id] : [];
  const selectedDay = calendarDays.find((day) => day.full === selectedDate);
  const selectedDaySlots = selectedDay ? serviceSlots(selectedDay) : [];
  const tooManyRiders = Boolean(service && riderCount > service.maxRiders);
  const numericAges = ages.map(Number).filter(Boolean);
  const youngest = numericAges.length ? Math.min(...numericAges) : 0;
  const tooYoung = Boolean(service && youngest > 0 && youngest < service.minimumAge);

  useEffect(() => {
    setSelectedAddOns([]);
    setSelectedTime("");
  }, [serviceId]);

  useEffect(() => {
    if (selectedDate && selectedDay && !selectedDaySlots.length) {
      setSelectedTime("");
    }
  }, [selectedDate, selectedDay, selectedDaySlots.length]);

  const recommendation = useMemo(() => {
    const hasLittleRider = youngest > 0 && youngest < 7;

    if (!service || !skill || numericAges.length !== riderCount) {
      return "";
    }

    if (tooManyRiders) {
      return `${service.name} works best with ${service.maxRiders} riders or fewer. Split the group or choose Birthday Party for a larger crew.`;
    }

    if (tooYoung) {
      return `${service.name} starts at age ${service.minimumAge}. For younger riders, Pony Party keeps everything close, slow, and comfortable.`;
    }

    if (hasLittleRider && skill === "never") {
      return "Pony Party or a beginner lesson is the best fit. We will keep the pace slow, close, and confidence-building.";
    }

    if (service.id === "trail" && (skill === "never" || skill === "tried")) {
      return "A private beginner trail ride with an extra guide will keep everyone matched to the right horse.";
    }

    if (service.id === "party") {
      return "The Birthday Party package with horse painting gives the kids structure without feeling rushed.";
    }

    if (service.id === "camp") {
      return "Summer Camp is a strong fit. We will group riders by age and comfort level each morning.";
    }

    return "You are clear for this experience. We will match horses by age, size, and confidence before you arrive.";
  }, [numericAges, riderCount, service, skill, tooManyRiders, tooYoung, youngest]);

  const baseTotal = service ? service.basePrice * (service.id === "party" ? 1 : riderCount) : 0;
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const addOn = addOns.find((item) => item.id === id);
    if (!addOn) return sum;
    return sum + addOn.price * (addOn.perPerson ? riderCount : 1);
  }, 0);
  const total = baseTotal + addOnTotal;
  const animatedTotal = useAnimatedNumber(total);

  const canContinue =
    (step === 1 && Boolean(service)) ||
    (step === 2 && ages.every((age) => Number(age) > 0) && weightConfirmed && Boolean(skill) && !tooManyRiders && !tooYoung) ||
    (step === 3 && Boolean(selectedDate) && Boolean(selectedTime)) ||
    step === 4 ||
    (step === 5 && Boolean(guest.name && guest.email && guest.phone) && policyConfirmed);

  const next = () => {
    if (step < 6 && canContinue) setStep((current) => current + 1);
  };

  const back = () => setStep((current) => Math.max(1, current - 1));

  const close = () => {
    setOpen(false);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const downloadSummary = () => {
    if (!service) return;
    const summary = [
      "Willow Creek Ranch Booking Summary",
      `${service.name} - ${selectedDate} at ${selectedTime}`,
      `Group: ${riderCount} riders, ages ${ages.join(", ")}`,
      `Add-ons: ${selectedAddOns.length ? selectedAddOns.map((id) => addOns.find((item) => item.id === id)?.name).join(", ") : "None"}`,
      `Total: ${formatCurrency(total)}`,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "willow-creek-booking-summary.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="booking-modal fixed inset-0 z-[80] flex items-stretch justify-center bg-black/58 p-0 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-flow-title"
            className="booking-flow-shell flex h-[100svh] w-full max-w-[1040px] flex-col overflow-hidden border border-white/10 bg-[var(--green)] text-[var(--text)] shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:h-[min(760px,92svh)] md:rounded-[1.25rem]"
            initial={{ y: 28, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.98 }}
            transition={{ duration: 0.42, ease }}
          >
            <header className="booking-flow-header border-b border-[var(--border)] px-5 py-4 md:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label">Step {step} of 6</p>
                  <h2 id="booking-flow-title" className="mt-2 font-serif text-3xl font-light leading-none md:text-5xl">
                    {step === 1 && "What are you here for?"}
                    {step === 2 && "Tell us about your group"}
                    {step === 3 && "Pick your date & time"}
                    {step === 4 && "Add-ons"}
                    {step === 5 && "Your details"}
                    {step === 6 && "All good - we'll hold your spot"}
                  </h2>
                </div>
                <button className="booking-close-button" onClick={close} type="button" aria-label="Close booking flow">
                  Close
                </button>
              </div>
              <div className="booking-step-track mt-4" aria-hidden="true">
                <span style={{ width: `${(step / 6) * 100}%` }} />
              </div>
            </header>

            <div className="booking-flow-body flex-1 overflow-y-auto px-5 py-5 md:px-7 md:py-6">
              {step === 1 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {services.map((item) => (
                    <button
                      className={`booking-service-card text-left ${serviceId === item.id ? "is-selected" : ""}`}
                      key={item.id}
                      onClick={() => setServiceId(item.id)}
                      type="button"
                    >
                      <span className="booking-service-badge">{item.eligibility}</span>
                      <strong>{item.name}</strong>
                      <span>{item.description}</span>
                      <em className="booking-service-fit">{item.bestFor}</em>
                      <small>{item.priceRange}</small>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
                  <div className="booking-form-panel">
                    <label className="booking-input-label">
                      Number of riders
                      <input min={1} max={service?.maxRiders ?? 15} type="number" value={riderCount} onChange={(event) => setRiderCount(Math.max(1, Math.min(15, Number(event.target.value) || 1)))} />
                    </label>
                    {service && (
                      <p className="booking-context-note">
                        {service.name}: age {service.minimumAge}+ and up to {service.maxRiders} riders per booking. {service.bestFor}
                      </p>
                    )}
                    <div className="booking-age-grid">
                      {ages.map((age, index) => (
                        <label className="booking-input-label" key={index}>
                          Rider {index + 1} age
                          <input inputMode="numeric" value={age} onChange={(event) => setAges((current) => current.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))} />
                        </label>
                      ))}
                    </div>
                    <label className={`booking-check-row ${weightConfirmed ? "is-checked" : ""}`}>
                      <input checked={weightConfirmed} onChange={(event) => setWeightConfirmed(event.target.checked)} type="checkbox" />
                      <span>All riders are under 230 lbs</span>
                    </label>
                    {!weightConfirmed && (
                      <p className="booking-nudge">
                        We use this to match riders with the right horses. If someone may be over 230 lbs, call us and we will help find a safe option.
                      </p>
                    )}
                    {(tooManyRiders || tooYoung) && (
                      <p className="booking-nudge">
                        {tooManyRiders && service ? `${service.name} can take ${service.maxRiders} riders in one slot. ` : ""}
                        {tooYoung && service ? `This experience starts at age ${service.minimumAge}. ` : ""}
                        We can still help - the recommendation card will point you to the closest fit.
                      </p>
                    )}
                    <div>
                      <p className="booking-input-heading">Skill level</p>
                      <div className="booking-skill-grid">
                        {(Object.keys(skillLabels) as Exclude<SkillLevel, "">[]).map((key) => (
                          <button className={skill === key ? "is-selected" : ""} key={key} onClick={() => setSkill(key)} type="button">
                            {skillLabels[key]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {recommendation && (
                      <motion.aside
                        className="booking-recommendation-card"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                      >
                        <p className="label">Recommended</p>
                        <h3>Here's what we'd recommend for you</h3>
                        <p>{recommendation}</p>
                      </motion.aside>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
                  <div className="booking-calendar-grid">
                    {calendarDays.map((day) => (
                      <button
                        className={`${serviceSlots(day).length ? "" : "is-unavailable"} ${day.weekend ? "is-weekend" : ""} ${selectedDate === day.full ? "is-selected" : ""}`}
                        disabled={!serviceSlots(day).length}
                        key={day.full}
                        onClick={() => {
                          setSelectedDate(day.full);
                          setSelectedTime("");
                        }}
                        type="button"
                      >
                        <span>{day.day}</span>
                        <strong>{day.date}</strong>
                      </button>
                    ))}
                  </div>
                  <aside className="booking-form-panel">
                    <p className="booking-input-heading">{selectedDay ? selectedDay.full : "Choose an available day"}</p>
                    {service && <p className="booking-step-note">{service.scheduleNote} The calendar below is filtered to {service.name.toLowerCase()} only.</p>}
                    <div className="booking-time-grid">
                      {selectedDaySlots.map((slot) => (
                        <button className={selectedTime === slot ? "is-selected" : ""} onClick={() => setSelectedTime(slot)} key={slot} type="button">
                          {slot}
                        </button>
                      ))}
                      {selectedDay && !selectedDaySlots.length && (
                        <p className="booking-nudge">That day is full for {service?.name.toLowerCase()}. Pick another available day and we will show the right hours.</p>
                      )}
                    </div>
                    <p className="booking-hold-note">Booking holds for 15 minutes while you complete checkout.</p>
                  </aside>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-4">
                  {service && <p className="booking-step-note">{service.addonNote}</p>}
                  <div className="grid gap-3 md:grid-cols-2">
                    {availableAddOns.map((item) => (
                      <label className={`booking-addon-card ${selectedAddOns.includes(item.id) ? "is-selected" : ""}`} key={item.id}>
                        <input checked={selectedAddOns.includes(item.id)} onChange={() => toggleAddOn(item.id)} type="checkbox" />
                        <span>
                          <strong>{item.name}</strong>
                          <small>{formatCurrency(item.price)}{item.perPerson ? " / person" : ""}</small>
                          <em>{item.description}</em>
                        </span>
                      </label>
                    ))}
                    {!availableAddOns.length && <p className="booking-nudge">No add-ons needed for this experience. You're set to keep going.</p>}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
                  <div className="booking-form-panel">
                    <label className="booking-input-label">Name<input value={guest.name} onChange={(event) => setGuest({ ...guest, name: event.target.value })} /></label>
                    <label className="booking-input-label">Email<input type="email" value={guest.email} onChange={(event) => setGuest({ ...guest, email: event.target.value })} /></label>
                    <label className="booking-input-label">Phone<input type="tel" value={guest.phone} onChange={(event) => setGuest({ ...guest, phone: event.target.value })} /></label>
                    <label className="booking-input-label">Special requests<textarea value={guest.requests} onChange={(event) => setGuest({ ...guest, requests: event.target.value })} /></label>
                  </div>
                  <aside className="booking-policy-callout">
                    <h3>Before we hold your spot</h3>
                    <p>Cancellations made 48 hours ahead can move or refund the booking.</p>
                    <p>No-shows and same-day cancellations may be charged the full booking amount.</p>
                    <p>Group trail rides include a 20% gratuity for the guide team.</p>
                    <label className={`booking-check-row ${policyConfirmed ? "is-checked" : ""}`}>
                      <input checked={policyConfirmed} onChange={(event) => setPolicyConfirmed(event.target.checked)} type="checkbox" />
                      <span>I've read and understand the ranch policies</span>
                    </label>
                  </aside>
                </div>
              )}

              {step === 6 && service && (
                <div className="booking-confirmation-wrap">
                  <div className="booking-ticket">
                    <p className="label">Willow Creek Ranch</p>
                    <h3>{service.name}</h3>
                    <dl>
                      <div><dt>Date & time</dt><dd>{selectedDate} at {selectedTime}</dd></div>
                      <div><dt>Group</dt><dd>{riderCount} riders, ages {ages.join(", ")}</dd></div>
                      <div><dt>Add-ons</dt><dd>{selectedAddOns.length ? selectedAddOns.map((id) => addOns.find((item) => item.id === id)?.name).join(", ") : "None"}</dd></div>
                      <div><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
                    </dl>
                    <p className="booking-confirm-email">We'll send a confirmation to {guest.email}.</p>
                  </div>
                </div>
              )}
            </div>

            <footer className="booking-flow-footer border-t border-[var(--border)] px-5 py-4 md:px-7">
              <div className="booking-total">
                <span>Total</span>
                <strong>{formatCurrency(animatedTotal)}</strong>
                {service && <small>{service.unit}</small>}
              </div>
              <div className="booking-flow-actions">
                {step > 1 && step < 6 && <Button variant="outline" onClick={back}>Back</Button>}
                {step < 6 && <Button onClick={next} disabled={!canContinue}>Continue</Button>}
                {step === 6 && (
                  <>
                    <Button variant="outline" onClick={downloadSummary}>Download Summary</Button>
                    <Button onClick={close}>Back to Home</Button>
                  </>
                )}
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
