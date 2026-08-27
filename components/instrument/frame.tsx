"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Frame() {
  const reduce = useReducedMotion();
  return (
    <div className="frame" aria-hidden="true">
      <svg preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          pathLength={1}
          strokeDasharray={1}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { strokeDashoffset: 1 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
