"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Frame from "./frame";
import type { PlateData } from "@/content/site";

/* Leader tag for the exploded diagram — label derives from the plate index. */
function Tag({
  index,
  name,
  opacity,
}: {
  index: string;
  name: string;
  opacity?: MotionValue<number>;
}) {
  return (
    <motion.span className="plate__tag mono" style={{ opacity }}>
      {`${index}·${name}`}
    </motion.span>
  );
}

function MetaGrid({ meta }: { meta: PlateData["meta"] }) {
  return (
    <div className="plate__metagrid mono">
      {meta.map((m) => (
        <div key={m.label}>
          <span className="plate__metalabel">{m.label}</span>
          <span className="plate__metaval">{m.value}</span>
        </div>
      ))}
    </div>
  );
}

function Reticle() {
  return (
    <div className="reticle" aria-hidden="true">
      <span className="r-tl" />
      <span className="r-tr" />
      <span className="r-bl" />
      <span className="r-br" />
    </div>
  );
}

export default function Plate(props: PlateData) {
  const flagship = props.weight === "flagship";
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [k, setK] = useState(1); // dampen exploded offsets on small screens

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setK(mq.matches ? 0.4 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // exploded-diagram offsets — harder on purpose, reassemble at center view
  const xIdx = useTransform(scrollYProgress, [0, 1], [-140 * k, 0]);
  const rIdx = useTransform(scrollYProgress, [0, 1], [-6 * k, 0]);
  const yHead = useTransform(scrollYProgress, [0, 1], [-72 * k, 0]);
  const xHead = useTransform(scrollYProgress, [0, 1], [200 * k, 0]);
  const rMeta = useTransform(scrollYProgress, [0, 1], [5 * k, 0]);
  const xMeta = useTransform(scrollYProgress, [0, 1], [-260 * k, 0]);
  const yBody = useTransform(scrollYProgress, [0, 1], [56 * k, 0]);
  const xBody = useTransform(scrollYProgress, [0, 1], [170 * k, 0]);
  const lead = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const still = reduce ? { x: 0, y: 0, rotate: 0 } : undefined;

  return (
    <article ref={ref} className={`plate plate--${props.weight}`}>
      <Frame />
      <Reticle />
      <motion.div
        className="plate__inner"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
      >
        {flagship ? (
          <>
            <motion.div
              className="plate__indexrow mono"
              style={still ?? { x: xIdx, rotate: rIdx }}
            >
              <span className="plate__index">{props.index}</span>
              <Tag index={props.index} name="A" opacity={lead} />
            </motion.div>
            <motion.h3
              className="plate__heading"
              style={still ?? { x: xHead, y: yHead }}
            >
              <span className="plate__htext">{props.heading}</span>
              <Tag index={props.index} name="B" opacity={lead} />
            </motion.h3>
            <motion.div style={still ?? { x: xMeta, rotate: rMeta }}>
              <MetaGrid meta={props.meta} />
              <Tag index={props.index} name="C" opacity={lead} />
            </motion.div>
            <motion.p
              className="plate__body"
              style={still ?? { x: xBody, y: yBody }}
            >
              {props.body}
              <Tag index={props.index} name="D" opacity={lead} />
            </motion.p>
          </>
        ) : (
          <>
            <div className="plate__indexrow mono">
              <span className="plate__index">{props.index}</span>
            </div>
            <h3 className="plate__heading">
              {props.href ? (
                <a
                  className="plate__link"
                  href={props.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.heading}
                </a>
              ) : (
                <span className="plate__htext">{props.heading}</span>
              )}
            </h3>
            <MetaGrid meta={props.meta} />
            <p className="plate__body">{props.body}</p>
          </>
        )}
      </motion.div>
    </article>
  );
}
