"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "./motion";

const frames = [
  {
    image: "/images/ranch-trail-horses.png",
    className: "image-node-large",
  },
  {
    image: "/images/ranch-stable-interior.png",
    className: "image-node-medium",
  },
  {
    image: "/images/ranch-lesson-horse.png",
    className: "image-node-medium",
  },
  {
    image: "/images/ranch-pasture-horse.png",
    className: "image-node-large",
  },
  {
    image: "/images/ranch-trail-horses.png",
    className: "image-node-small",
  },
  {
    image: "/images/ranch-stable-interior.png",
    className: "image-node-small",
  },
  {
    image: "/images/ranch-lesson-horse.png",
    className: "image-node-small",
  },
  {
    image: "/images/ranch-pasture-horse.png",
    className: "image-node-small",
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
          A flexible photo wall for trails, stables, lessons, events, and every new moment you want to add.
        </p>
      </motion.div>
      <div className="image-constellation-grid">
        {frames.map((frame, index) => (
          <motion.article
            variants={fadeUp}
            className={`image-node group relative overflow-hidden border border-[var(--border)] bg-[var(--card)] ${frame.className}`}
            key={`${frame.image}-${index}`}
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
