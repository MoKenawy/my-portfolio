"use client";

import React, { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { findSkill, type SkillDef } from "@/lib/skillIndex";

// Ship's half of the Top skills row. A link from the home page arrives as
// `/ship?skill=nodejs`, and every entry built with that tool marks itself (see
// `ProjectCard`), while a slim bar holds the count and steps between them.
//
// The skill is read in the browser, not on the server: the site is a static
// export, so there is no request to read a query string from. Reading it
// needs a Suspense boundary for the export to build, and its fallback is the
// list itself, so the prerendered page is the whole, unmarked ledger — which
// is also exactly what plain `/ship`, or a skill this file does not know, shows.

const ActiveSkill = React.createContext<SkillDef | undefined>(undefined);

/** The skill Ship was opened with, if any. */
export const useActiveSkill = () => React.useContext(ActiveSkill);

// Matching entries carry this attribute; the bar steps between them in
// document order.
export const MATCH_ATTR = "data-skill-match";

// Must stay at least the bar's height: entries scroll to their `scroll-mt-24`
// (6rem), and anything within a few pixels of that line counts as "here".
const ARRIVAL = 96;
const EPS = 4;

const behaviour = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

function SkillBar({ skill }: { skill: SkillDef }) {
  const router = useRouter();
  const pathname = usePathname();
  const [count, setCount] = React.useState(0);
  const [edge, setEdge] = React.useState({ prev: false, next: false });

  const matches = () =>
    Array.from(document.querySelectorAll<HTMLElement>(`[${MATCH_ATTR}]`));

  // On a fresh load the browser jumps to `#entry` against the prerendered
  // page, which has no bar; the bar then arrives above the list and pushes the
  // entry down. Put it back where the fragment meant it to be, once.
  React.useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  // Which way there is still somewhere to go, from where the reader is now.
  React.useEffect(() => {
    const measure = () => {
      const tops = matches().map((el) => el.getBoundingClientRect().top);
      setCount(tops.length);
      setEdge({
        prev: tops.some((t) => t < ARRIVAL - EPS),
        next: tops.some((t) => t > ARRIVAL + EPS),
      });
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [skill.slug]);

  // Finds its own target from the live layout rather than trusting `edge`,
  // which only follows scroll events: at either end there is simply nothing
  // to find, so a press there does nothing.
  const go = (dir: 1 | -1) => {
    const els = matches();
    const target =
      dir > 0
        ? els.find((el) => el.getBoundingClientRect().top > ARRIVAL + EPS)
        : [...els].reverse().find((el) => el.getBoundingClientRect().top < ARRIVAL - EPS);
    target?.scrollIntoView({ block: "start", behavior: behaviour() });
  };

  // Drops `?skill=` and keeps the reader's place: no scroll, same fragment.
  const clear = () =>
    router.replace(`${pathname}${window.location.hash}`, { scroll: false });

  const button =
    "mono border border-hairline px-2.5 py-1 transition-colors hover:border-paper hover:text-paper aria-disabled:opacity-40 aria-disabled:hover:border-hairline aria-disabled:hover:text-mid";

  return (
    <div className="sticky top-0 z-10 mt-10 border-b border-hairline bg-ground py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="mono normal-case text-paper">
          {skill.name} — {count} {count === 1 ? "entry" : "entries"} marked
        </p>
        <div className="flex items-center gap-2">
          {/* `aria-disabled`, not `disabled`, so focus is not dropped to
              <body> when the reader reaches either end. */}
          <button
            type="button"
            aria-label={`Previous entry that uses ${skill.name}`}
            aria-disabled={!edge.prev}
            onClick={() => go(-1)}
            className={button}
          >
            ↑
          </button>
          <button
            type="button"
            aria-label={`Next entry that uses ${skill.name}`}
            aria-disabled={!edge.next}
            onClick={() => go(1)}
            className={button}
          >
            ↓
          </button>
        </div>
        <button
          type="button"
          onClick={clear}
          className="mono ml-auto normal-case underline decoration-hairline underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
        >
          clear ×
        </button>
      </div>
    </div>
  );
}

function Reader({ children }: { children: React.ReactNode }) {
  const skill = findSkill(useSearchParams().get("skill"));
  return (
    <ActiveSkill.Provider value={skill}>
      {skill && <SkillBar skill={skill} />}
      {children}
    </ActiveSkill.Provider>
  );
}

export default function SkillHighlight({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <Reader>{children}</Reader>
    </Suspense>
  );
}
