export default function ColumnGuides() {
  return (
    <div className="guides" aria-hidden="true">
      <div className="guides__cols">
        {Array.from({ length: 13 }, (_, i) => (
          <span key={i} style={{ left: `${(i / 12) * 100}%` }} />
        ))}
      </div>
    </div>
  );
}
