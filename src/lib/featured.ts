import { asset } from "@/lib/media";

// The plates on the home page's evidence strip (design.md §10.3): four shipped
// systems, then three issued certificates. JSX-free and serialisable, in the
// manner of `flagship.ts`.
//
// Order is systems first, then scans — what I built this year, then what
// somebody else certified. Leading with the 2023 Coursera scans would make the
// page's loudest new evidence its oldest credential.
//
// The system plates are the same files, and the same dimensions, as the ones
// `app/ship/page.tsx` declares in its `shot(...)` calls; the numbers are copied
// from there. The day Ship becomes a data module this file should read from it
// rather than repeat them.
//
// The newest credential — AI for Software Engineers, 140 h, Jul–Nov 2026 — has
// no scan. Items 1 and 2 are that track's artifacts, and the strip closes on a
// terminal card (rendered by the page, not listed here) that says so in the
// register Read already uses for gaps.
export interface FeaturedItem {
  kind: "system" | "certificate";
  /** Already resolved through `asset()` — the file lives under /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  /** One mono line: who, and when or how much. */
  meta: string;
  /**
   * Every plate is shown in the same 4:3 window so the row shares one height;
   * this is which part of the file the window looks at — the head of a long
   * page, the right-hand columns of an RTL table.
   */
  crop: "top" | "center" | "left" | "right";
  /** Lowercase, `fig. n — …`. One clause: it has to fit under a 22rem plate. */
  caption: string;
  /**
   * Internal paths go to `next/link`, which applies `basePath` itself, so they
   * are deliberately not passed through `asset()`.
  */
 href: string;
 external?: boolean;
}

export const featured: FeaturedItem[] = [
  {
    kind: "certificate",
    src: asset("/featured/depi-aws-ml.webp"),
    width: 1100,
    height: 778,
    crop: "center",
    alt: "Certificate of achievement: Mohammed Gamal Kenawy completed AWS Machine Learning Engineer, a 159-hour course, dated 30 September 2024.",
    title: "AWS Machine Learning Engineer",
    meta: "DEPI / MCIT · 159 h · 30 Sep 2024",
    caption: "fig. 5 — the scan, as issued.",
    href: "/read#credentials",
  },
  {
    kind: "certificate",
    src: asset("/featured/coursera-advanced-learning-algorithms.webp"),
    width: 1100,
    height: 850,
    crop: "center",
    alt: "Coursera course certificate for Advanced Learning Algorithms, DeepLearning.AI and Stanford Online, dated 1 October 2023.",
    title: "Advanced Learning Algorithms",
    meta: "DeepLearning.AI / Stanford · Oct 2023",
    caption: "fig. 6 — verify it with the issuer ↗",
    href: "https://coursera.org/verify/PTJSVDED9N9T",
    external: true,
  },
  {
    kind: "certificate",
    src: asset("/featured/coursera-supervised-ml.webp"),
    width: 1100,
    height: 850,
    crop: "center",
    alt: "Coursera course certificate for Supervised Machine Learning: Regression and Classification, DeepLearning.AI and Stanford Online, dated 9 July 2023.",
    title: "Supervised ML: Regression and Classification",
    meta: "DeepLearning.AI / Stanford · Jul 2023",
    caption: "fig. 7 — verify it with the issuer ↗",
    href: "https://coursera.org/verify/SFDAQ837LL2H",
    external: true,
  },
  {
    kind: "system",
    src: asset("/ship/agentic-pr-reviewer/report-head.webp"),
    width: 1230,
    height: 1152,
    alt: "The head of a generated code-review report: its title, a boxed verdict reading “blocking”, a count of findings by severity, and the scope table.",
    crop: "top",
    title: "Agentic PR Reviewer",
    meta: "DEPI capstone · 2026",
    caption: "fig. 1 — the report the reviewer files, schema-checked before it is shown.",
    href: "/ship#agentic-pr-reviewer",
  },
  {
    kind: "system",
    src: asset("/ship/pdf2deck/interface.webp"),
    width: 1600,
    height: 1576,
    alt: "The PDF → Styled PowerPoint Agent after a completed run: a chapter PDF loaded on the left, and on the right “Deck rendered (14 slides)” with the generated outline, each slide with its bullets.",
    crop: "top",
    title: "PDF2Deck Agent",
    meta: "DEPI track project · 2026",
    caption: "fig. 2 — a person approves the outline and the deck; the model only proposes.",
    href: "/ship#pdf2deck",
  },
  {
    kind: "system",
    src: asset("/ship/payroll/payroll-profile.webp"),
    width: 1366,
    height: 1549,
    alt: "The monthly payroll review for September 2026 in an Arabic right-to-left interface: a table with one row per employee, names blurred, carrying basic salary, entitlements, tax, insurance, deductions and net salary.",
    crop: "top",
    title: "Payroll subsystem",
    meta: "Queen Service · 2025",
    caption: "fig. 3 — every figure on the page is one a named person is paid.",
    href: "/ship#payroll",
  },
  {
    kind: "system",
    src: asset("/ship/dms/audit.webp"),
    width: 1600,
    height: 826,
    alt: "The audit log of the Diagram Management System in an Arabic right-to-left interface: a table of logins, logouts, diagram creations and downloads, each with its user, action, target and timestamp.",
    crop: "right",
    title: "DMS — Diagram Management System",
    meta: "On-premises archive · TypeScript",
    caption: "fig. 4 — who opened, created and downloaded what, kept by the system itself.",
    href: "/ship#dms",
  }
];
