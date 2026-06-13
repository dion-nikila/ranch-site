"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "./motion";

const frames = [
  {
    title: "Trail Rhythm",
    meta: "Guided movement",
    image: "/images/horse-hero-editorial.png",
    className: "image-node-lead md:col-span-7 md:row-span-2",
  },
  {
    title: "Quiet Care",
    meta: "Boarding signal",
    image: "/images/horse-portrait-bw.jpg",
    className: "image-node-portrait md:col-span-5",
  },
  {
    title: "First Ride",
    meta: "Beginner ready",
    image: "/images/horse-hero-editorial.png",
    className: "image-node-close md:col-span-5",
  },
];

export function ImageConstellation() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="image-constellation grid gap-4 md:grid-cols-12 md:auto-rows-[210px]"
    >
      {frames.map((frame) => (
        <motion.article
          variants={fadeUp}
          className={`image-node group relative min-h-[260px] overflow-hidden border border-[var(--border)] bg-[var(--card)] ${frame.className}`}
          key={frame.title}
        >
          <div
            className="image-node-photo absolute inset-0 bg-cover grayscale transition-transform duration-700 group-hover:scale-[1.045]"
            style={{ backgroundImage: `url(${frame.image})` }}
          />
          <div className="image-node-scan absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5">
            <div>
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[var(--gold)]">{frame.meta}</p>
              <h3 className="mt-1 font-serif text-3xl font-light leading-none text-[var(--text)]">{frame.title}</h3>
            </div>
            <span className="h-11 w-11 shrink-0 border border-[var(--gold)]/50 bg-[rgba(210,177,99,0.08)]" />
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
