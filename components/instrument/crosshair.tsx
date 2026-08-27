"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

const pad3 = (n: number) => String(Math.max(0, Math.round(n))).padStart(3, "0");

export default function Crosshair() {
  const [enabled, setEnabled] = useState(false);
  const [readout, setReadout] = useState({ x: 0, y: 0 });
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  // light spring keeps hairlines from strobing during fast moves
  const x = useSpring(mx, { stiffness: 900, damping: 60, mass: 0.4 });
  const y = useSpring(my, { stiffness: 900, damping: 60, mass: 0.4 });
  const tx = useTransform(x, (v) => v + 14);
  const ty = useTransform(y, (v) => v + 10);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      setEnabled(true);
      mx.set(e.clientX);
      my.set(e.clientY);
      setReadout((prev) =>
        prev.x === e.clientX && prev.y === e.clientY
          ? prev
          : { x: e.clientX, y: e.clientY }
      );
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <div className="crosshair" aria-hidden="true">
      <motion.div
        className="crosshair__h"
        style={{ top: y }}
        data-x={readout.y}
      />
      <motion.div
        className="crosshair__v"
        style={{ left: x }}
        data-y={readout.x}
      />
      <motion.div className="crosshair__tag mono" style={{ x: tx, y: ty }}>
        {`X${pad3(readout.x)} · Y${pad3(readout.y)}`}
      </motion.div>
    </div>
  );
}
