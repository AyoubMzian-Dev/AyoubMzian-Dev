import ColumnGuides from "./column-guides";

export default function Cover({
  heading,
  meta,
}: {
  heading: string;
  meta: string;
}) {
  const words = heading.split(" ");
  const rail = `${meta} — INSTRUMENT 001`;
  return (
    <header className="cover">
      <ColumnGuides />
      <div className="shell">
        <span className="cover__rail mono" aria-hidden="true">
          {rail}
        </span>
        <span
          className="cover__rail cover__rail--right mono"
          aria-hidden="true"
        >
          {rail}
        </span>
        <div className="cover__stage">
          <h1 className="cover__heading">
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
        </div>
        <p className="cover__meta mono">{meta}</p>
      </div>
    </header>
  );
}
