import type { Section } from "@/content/site";

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function IndexNav({ items }: { items: Section[] }) {
  return (
    <nav className="indexnav shell" id="index" aria-label="Index">
      <ol>
        {items.map((s, i) => (
          <li key={s.id}>
            <a className="indexnav__link mono" href={`#${s.id}`}>
              <span className="indexnav__num">{pad2(i + 1)}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
