// The one file a new owner edits (plus src/content/*). Every component reads
// owner data from here — nothing personal is hardcoded elsewhere.
export type Link = { label: string; href: string };

export interface SiteConfig {
  name: string;
  role: string;
  location?: string;
  description: string;
  /** Canonical origin, used for metadataBase. */
  url: string;
  logo?: { src: string; alt: string };
  portrait?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  };
  nav: (Link & { sub?: string; primary?: boolean })[];
  /** `icon` is an Iconify id, e.g. "mdi:github". */
  socials: (Link & { icon: string })[];
  hero: { eyebrow: string; headline: string; intro: string; cta: Link };
  pitch?: { promise: string; beats: { label: string; body: string }[] };
  featured?: {
    eyebrow: string;
    title: string;
    titleAlt?: string;
    subtitle: string;
    blurb: string;
    href: string;
    cta: string;
  };
  sidebar?: { label?: string; title: string; note?: string }[];
  contact: { href: string; label: string; ctaLine: string };
  footer: { tagline: string };
}

export const site: SiteConfig = {
  name: "Your Name",
  role: "Software Engineer",
  location: "City, Country",
  description: "One sentence on what you build and who it is for.",
  url: "https://your-handle.github.io",
  logo: { src: "/logo-placeholder.svg", alt: "" },
  portrait: {
    src: "/figures/portrait-placeholder.svg",
    alt: "Portrait of Your Name.",
    width: 400,
    height: 800,
    caption: "fig. 1 — replace me.",
  },
  nav: [
    { label: "Home", href: "/", sub: "about" },
    { label: "Projects", href: "/projects", sub: "work", primary: true },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/your-handle", icon: "mdi:github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-handle/",
      icon: "mdi:linkedin",
    },
  ],
  hero: {
    eyebrow: "Portfolio · 2026",
    headline: "A one-line thesis about your work.",
    intro: "Your Name — Software Engineer, City, Country.",
    cta: { label: "Get in touch →", href: "mailto:you@example.com" },
  },
  pitch: {
    promise: "One sentence promising what a client or employer gets from you.",
    beats: [
      { label: "The problem", body: "What goes wrong without you." },
      { label: "The solution", body: "How you work and what you hand back." },
      { label: "The evidence", body: "Where a reader can check your claims." },
    ],
  },
  featured: {
    eyebrow: "Featured",
    title: "Your Best Piece",
    titleAlt: "Optional second title",
    subtitle: "a one-line description of it",
    blurb:
      "Two or three sentences on what this is and why it is the first thing you would point a reader to.",
    href: "https://example.com/your-piece",
    cta: "Read it",
  },
  sidebar: [
    { label: "Reading now", title: "A Book Title", note: "Author — why it matters" },
    { label: "Learned", title: "One lesson, in a sentence." },
  ],
  contact: {
    href: "mailto:you@example.com",
    label: "Contact",
    ctaLine: "Have a project in mind? Write to me.",
  },
  footer: { tagline: "Built with Next.js." },
};
