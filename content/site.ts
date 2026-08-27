export type Section = { id: string; label: string };
export type MetaPair = { label: string; value: string };
export type PlateWeight = "flagship" | "standard";
export type PlateData = {
  index: string;
  heading: string;
  meta: MetaPair[];
  body: string;
  href?: string;
  weight: PlateWeight;
};
export type MeterData = { label: string; value: number; formatted: string };
export type LinkData = { label: string; href: string };

// ── AMBIENT TICKER ──
export const tickerLine = "I see, therefore I am.";

// ── COVER ──
export const cover = {
  heading:
    "I am human, born to build the world from the cosmic dust, and shape it in ways I please.",
  meta: "AYOUB \"FREEMAN\" MEZIANE — FOUNDER OF HYPERTECH — RABAT, EARTH",
};

// ── SECTIONS (Telemetry + Index) ──
export const sections: Section[] = [
  { id: "origin", label: "Origin" },
  { id: "vision", label: "Vision" },
  { id: "hypertech", label: "Hypertech" },
  { id: "works", label: "Works" },
  { id: "state", label: "State" },
  { id: "contact", label: "Contact" },
];

// ── §01 ORIGIN ──
export const origin = {
  heading: "Origin",
  body: [
    "I have been born in the planet Earth, wanting to build a better world that inspires generations to come.",
  ],
};

// ── §02 VISION ──
export const vision = {
  heading: "Vision",
  body: [
    "I see worlds where no poor, weak, sick or dead exist, and I'm putting my life in the serve of making our world as those I see.",
    "The strong wins and lives, while the weak dies away. Why not have a world that has no weak — making all of our race stronger and wiser?",
  ],
};

// ── §03 HYPERTECH ──
export const hypertech = {
  heading: "Hypertech",
  body: [
    "Not a company. An instrument. Founded to close the distance between the world as it is and the worlds already seen. Everything built here is built toward that distance — nothing else is worth the ink.",
  ],
  link: { label: "hypertech.io →", href: "https://hypertech.example.com" },
};

// ── §04 WORKS (Catalog Plates) ──
export const plates: PlateData[] = [
  {
    index: "PLT.001",
    heading: "HyperMind",
    meta: [
      { label: "STATUS", value: "IN CONSTRUCTION" },
      { label: "KIND", value: "SYSTEM" },
      { label: "SCOPE", value: "FULL SCALE" },
    ],
    body: "HyperMind, at full scale, is the machine this whole site is a note about. Not described here — being built.",
    weight: "flagship",
  },
  {
    index: "PLT.002",
    heading: "SpectraMind",
    meta: [
      { label: "STATUS", value: "PLANNED" },
      { label: "KIND", value: "PLATFORM" },
      { label: "FIELD", value: "PHILOSOPHY / SCIENCE" },
    ],
    body: "A personal platform for philosophical and scientific exploration — a place for articles, debates, and thought experiments that don't fit anywhere else.",
    href: "https://github.com/AyoubMzian-Dev/SpectraMind",
    weight: "standard",
  },
];

// ── §05 STATE (the single inverted --void region) ──
export const state = {
  heading: "State",
  body: [
    "I am in a state of learning and building, all days and all of the nights. I do not pursue happiness — I only see results.",
    "I sit in the late nights thinking of the infinite possibilities of how our world could become, but also the ways it could go wrong. I do not intend to celebrate the wins — I only build more and more.",
    "My biggest fear is that I may taste pleasure and happiness — for that I may forget the pains that killed me. Therefore I never stop fighting to make sure no one else ever tastes the same pain.",
  ],
};

export const stateMeters: MeterData[] = [
  { label: "REST", value: 0.08, formatted: "MINIMAL" },
  { label: "BUILD", value: 1.0, formatted: "CONTINUOUS" },
  { label: "CERTAINTY", value: 0.92, formatted: "HELD" },
  { label: "FEAR", value: 1.0, formatted: "REMEMBERED" },
];

// ── §06 CONTACT / CLOSING (TitleBlock) ──
export const titleBlock = {
  cells: [
    { label: "NAME", value: "AYOUB \"FREEMAN\" MEZIANE" },
    { label: "ROLE", value: "FOUNDER OF HYPERTECH" },
    { label: "LOCATION", value: "RABAT, EARTH" },
    { label: "STATUS", value: "LEARNING AND BUILDING — ALL DAYS, ALL NIGHTS" },
    {
      label: "CRAFT",
      value:
        "FULL-STACK — NEXT.JS / TYPESCRIPT / SYSTEMS / DESIGN. LEAST INTERESTING PART.",
    },
    { label: "CONTACT", value: "AYOUB.MEZIANE.HU@ICLOUD.COM" },
  ],
  links: [
    { label: "EMAIL", href: "mailto:ayoub.meziane.hu@icloud.com" },
    { label: "GITHUB", href: "https://github.com/AyoubMzian-Dev" },
    { label: "HYPERTECH", href: "https://hypertech.example.com" },
  ],
  signoff: "I only build more and more.", // Fraunces italic, WONK 1 — the single italic use on the site
};
