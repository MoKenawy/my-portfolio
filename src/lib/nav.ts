// The site map enacts the thesis loop: read → learn → ship → document
// (design.md §5). Each phase is a real, navigable content type; the plain-word
// sub-label removes the guessing cost of phase-named navigation. "Ship" holds
// the projects/case studies and is the primary destination.
export type NavLink = {
  name: string;
  href: string;
  sub: string;
  /** The primary destination — rendered with more weight than its siblings. */
  primary?: boolean;
};

// Nav order is fixed by design.md §10.1: Home · Read · Learn · Ship · Document.
// Home sits outside the loop as the literary landing; the four verbs are the
// loop. Ship is primary — the engineering case is never subordinate.
export const navLinks: NavLink[] = [
  { name: "Home", href: "/", sub: "the thesis" },
  { name: "Read", href: "/read", sub: "notes" },
  { name: "Learn", href: "/learn", sub: "essays" },
  { name: "Ship", href: "/ship", sub: "projects", primary: true },
  { name: "Document", href: "/document", sub: "specs & artifacts" },
];
