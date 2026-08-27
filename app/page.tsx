import {
  cover,
  sections,
  origin,
  vision,
  hypertech,
  plates,
  state,
  stateMeters,
  titleBlock,
} from "@/content/site";
import Cover from "@/components/instrument/cover";
import IndexNav from "@/components/instrument/index-nav";
import ColumnGuides from "@/components/instrument/column-guides";
import Reveal from "@/components/instrument/reveal";
import TextLink from "@/components/instrument/text-link";
import Plate from "@/components/instrument/plate";
import Meter from "@/components/instrument/meter";
import TitleBlock from "@/components/instrument/title-block";
import TelemetryTicker from "@/components/instrument/telemetry-ticker";

const pad2 = (n: number) => String(n).padStart(2, "0");

function Kicker({ n, label }: { n: number; label: string }) {
  return (
    <p className="kicker mono">{`${label.toUpperCase()} — INSTRUMENT READS §${pad2(
      n
    )}`}</p>
  );
}

function Ghost({ n }: { n: number }) {
  return (
    <span className="region__ghost" aria-hidden="true">{`§${pad2(n)}`}</span>
  );
}

export default function Page() {
  return (
    <main>
      <Cover heading={cover.heading} meta={cover.meta} />

      <IndexNav items={sections} />

      <TelemetryTicker />

      <section id="origin" data-section className="region">
        <ColumnGuides />
        <div className="shell">
          <Ghost n={1} />
          <Kicker n={1} label={sections[0].label} />
          <Reveal className="region__grid">
            <h2 className="region__heading">{origin.heading}</h2>
            <div className="region__body">
              {origin.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="vision" data-section className="region">
        <ColumnGuides />
        <div className="shell">
          <Ghost n={2} />
          <Kicker n={2} label={sections[1].label} />
          <Reveal className="region__grid">
            <h2 className="region__heading">{vision.heading}</h2>
            <div className="region__body">
              {vision.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="hypertech" data-section className="region">
        <ColumnGuides />
        <div className="shell">
          <Ghost n={3} />
          <Kicker n={3} label={sections[2].label} />
          <Reveal className="region__grid">
            <h2 className="region__heading">{hypertech.heading}</h2>
            <div className="region__body">
              {hypertech.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <TextLink href={hypertech.link.href}>
                {hypertech.link.label}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="works" data-section className="region">
        <ColumnGuides />
        <div className="shell">
          <Ghost n={4} />
          <Kicker n={4} label={sections[3].label} />
          {plates.map((p) => (
            <Plate key={p.index} {...p} />
          ))}
        </div>
      </section>

      <section
        id="state"
        data-section
        data-tone="inverted"
        className="region region--inverted"
      >
        <ColumnGuides />
        <div className="shell">
          <Ghost n={5} />
          <Kicker n={5} label={sections[4].label} />
          <Reveal className="region__grid">
            <h2 className="region__heading">{state.heading}</h2>
            <div className="region__body">
              {state.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div className="meters">
            {stateMeters.map((m) => (
              <Meter key={m.label} {...m} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-section className="region">
        <ColumnGuides />
        <div className="shell">
          <Ghost n={6} />
          <Kicker n={6} label={sections[5].label} />
          <Reveal>
            <TitleBlock
              cells={titleBlock.cells}
              links={titleBlock.links}
              signoff={titleBlock.signoff}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
