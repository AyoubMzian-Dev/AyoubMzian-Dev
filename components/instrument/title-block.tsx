import TextLink from "./text-link";
import type { LinkData } from "@/content/site";

type TitleBlockProps = {
  cells: { label: string; value: string }[];
  links: LinkData[];
  signoff: string;
};

export default function TitleBlock({ cells, links, signoff }: TitleBlockProps) {
  return (
    <div className="titleblock">
      <div className="titleblock__grid">
        {cells.map((c) => (
          <div className="titleblock__cell" key={c.label}>
            <span className="mono">{c.label}</span>
            <span className="titleblock__value">{c.value}</span>
          </div>
        ))}
      </div>
      <div className="titleblock__links mono">
        {links.map((l) => (
          <TextLink key={l.label} href={l.href}>
            {l.label}
          </TextLink>
        ))}
      </div>
      <p className="signoff">{signoff}</p>
    </div>
  );
}
