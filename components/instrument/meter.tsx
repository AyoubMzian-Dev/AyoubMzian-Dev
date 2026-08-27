"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import type { MeterData } from "@/content/site";

export default function Meter({ label, value, formatted }: MeterData) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const pct = Math.round(value * 100);
  const shown = inView || reduce ? value.toFixed(2) : "0.00";

  return (
    <div
      ref={ref}
      className="meter"
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuetext={`${formatted} — ${value.toFixed(2)}`}
    >
      <div className="meter__head mono">
        <span>{label}</span>
        <span>{formatted}</span>
      </div>
      <div className="meter__num">
        {shown}
        <small>/1.00</small>
      </div>
      <div className="meter__track">
        <motion.div
          className="meter__fill"
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.6, ease: "linear" }}
        />
        <motion.div
          className="meter__tick"
          initial={reduce ? false : { left: "0%" }}
          whileInView={{ left: `${pct}%` }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.6, ease: "linear" }}
        />
      </div>
    </div>
  );
}
