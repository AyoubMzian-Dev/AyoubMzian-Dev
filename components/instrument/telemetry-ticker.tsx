"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tickerLine } from "@/content/site";

const REPEATS = 6;

export default function TelemetryTicker() {
  const reduce = useReducedMotion();
  const chunk = (
    <div className="ticker__chunk mono" aria-hidden="true">
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i}>{tickerLine}</span>
      ))}
    </div>
  );
  return (
    <div className="ticker" aria-hidden="true">
      <motion.div
        className="ticker__lane"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      >
        <div>{chunk}</div>
        <div>{chunk}</div>
      </motion.div>
    </div>
  );
}
