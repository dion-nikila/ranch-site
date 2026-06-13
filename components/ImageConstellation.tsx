"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "./motion";

const frames = [
  {
    title: "Trail Rhythm",
    image: "/images/ranch-trail-horses.png",
    className: "image-node-wide md:col-span-7",
  },
  {
    title: "Quiet Care",
    image: "/images/ranch-stable-interior.png",
    className: "image-node-wide md:col-span-5",
  },
  {
    title: "First Ride",
    image: "/images/ranch-lesson-horse.png",
    className: "image-node-wide md:col-span-5",
  },
  {
    title: "Morning Pasture",
    image: "/images/ranch-pasture-horse.png",
    className: "image-node-wide md:col-span-7",
  },
];

export function ImageConstellation() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="image-constellation"
    >
      <motion.div variants={fadeUp} className="image-constellation-copy">
        <p className="label">Ranch in Motion</p>
        <h2 className="section-title mt-2">See the ranch before you arrive</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
          A warmer look at the trails, stables, horses, and quiet spaces that shape the day.
        </p>
      </motion.div>
      <div className="image-constellation-grid grid gap-4 md:grid-cols-12">
      {frames.map((frame) => (
        <motion.article
          variants={fadeUp}
          className={`image-node group relative min-h-[260px] overflow-hidden border border-[var(--border)] bg-[var(--card)] ${frame.className}`}
          key={frame.title}
        >
          <div
            className="image-node-photo absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-[1.035]"
            style={{ backgroundImage: `url(${frame.image})` }}
          />
        </motion.article>
      ))}
      </div>
    </motion.div>
  );
}
