const CORNERS: { cls: string; delay: number }[] = [
  { cls: "tl", delay: 0 },
  { cls: "tr", delay: 60 },
  { cls: "bl", delay: 120 },
  { cls: "br", delay: 180 },
];

export default function RegistrationMarks() {
  return (
    <>
      {CORNERS.map(({ cls, delay }) => (
        <div
          key={cls}
          className={`reg reg--${cls}`}
          style={{ animationDelay: `${delay}ms` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6.5" />
            <line x1="12" y1="0" x2="12" y2="24" />
            <line x1="0" y1="12" x2="24" y2="12" />
          </svg>
        </div>
      ))}
    </>
  );
}
