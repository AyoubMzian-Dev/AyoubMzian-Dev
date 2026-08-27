"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import type { Section } from "@/content/site";

const pad2 = (n: number) => String(n).padStart(2, "0");
const pad3 = (n: number) => String(n).padStart(3, "0");

export default function TelemetryBar({ sections }: { sections: Section[] }) {
  const { scrollY } = useScroll();
  const [data, setData] = useState({
    pct: 0,
    active: 0,
    inverted: false,
    ticks: sections.map(
      (_, i) => (i / Math.max(sections.length - 1, 1)) * 100
    ),
  });

  useMotionValueEvent(scrollY, "change", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
    // probe line sits where the telemetry bar hangs, in document space
    const probe = window.scrollY + (window.innerHeight - 72);
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    let active = 0;
    els.forEach((el, i) => {
      if (el.offsetTop <= probe) active = i;
    });
    const inverted = els[active]?.dataset.tone === "inverted";
    const ticks = els.map((el) =>
      max > 0 ? Math.min(100, (el.offsetTop / max) * 100) : 0
    );
    document.documentElement.classList.toggle("over-inverted", inverted);
    setData((prev) =>
      prev.pct !== pct || prev.active !== active || prev.inverted !== inverted
        ? { pct, active, inverted, ticks }
        : prev
    );
  });

  const label = sections[data.active]?.label ?? sections[0].label;

  return (
    <div
      className={`telemetry mono${data.inverted ? " telemetry--inverted" : ""}`}
      aria-hidden="true"
    >
      <span className="telemetry__sec">{`SEC ${pad2(data.active + 1)}/${pad2(
        sections.length
      )} — ${label.toUpperCase()}`}</span>
      <div className="telemetry__track">
        {data.ticks.map((t, i) => (
          <span
            key={sections[i].id}
            className={`telemetry__tick${
              i === data.active ? " telemetry__tick--active" : ""
            }`}
            style={{ left: `${t}%`, animationDelay: `${i * 60}ms` }}
          />
        ))}
        <span className="telemetry__fill" style={{ width: `${data.pct}%` }} />
      </div>
      <span className="telemetry__pct">{`P.${pad3(Math.round(data.pct))}`}</span>
    </div>
  );
}
