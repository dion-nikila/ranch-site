"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "./motion";

const frames = [
  {
    title: "Trail Rhythm",
    image: "/images/horse-hero-editorial.png",
    className: "image-node-lead md:col-span-7 md:row-span-2",
  },
  {
    title: "Quiet Care",
    image: "/images/horse-portrait-bw.jpg",
    className: "image-node-portrait md:col-span-5",
  },
  {
    title: "First Ride",
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
      className="image-constellation"
    >
      <motion.div variants={fadeUp} className="image-constellation-copy">
        <p className="label">Ranch in Motion</p>
        <h2 className="section-title mt-2">A quieter kind of luxury</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
          Horses, trails, and care shown as a clean visual rhythm instead of a crowded collage.
        </p>
      </motion.div>
      <div className="image-constellation-grid grid gap-4 md:grid-cols-12 md:auto-rows-[210px]">
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
          <span className="image-node-index" aria-hidden="true" />
        </motion.article>
      ))}
      </div>
    </motion.div>
  );
}
