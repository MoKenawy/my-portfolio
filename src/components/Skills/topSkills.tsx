"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export interface SkillIcon {
  body: string;
  width: number;
  height: number;
}

export interface SkillView {
  slug: string;
  name: string;
  /** Already resolved on the server; passing the data means nothing is fetched. */
  icon: SkillIcon;
  /** `logo`: a brand logo in its own colours. `mark`: a single-colour shape. */
  tone: "logo" | "mark";
  /** For a `mark`: the colour it takes when revealed. Without one it stays in the text colour. */
  brand?: string;
  projects: { id: string; title: string }[];
}

// Where a project link goes. Kept in one place so the planned next step —
// marking the matching entries on Ship — only has to take the skill's slug
// here and add `?skill=` to the link.
const projectHref = (id: string) => `/ship#${id}`;

// The tools the record below is built with, as one ruled row of labelled marks
// rather than a grid of tiles (design.md §9 forbids skills grids). Each mark is
// a control: it opens a short list of the Ship entries that used the tool,
// directly under the row. One list at a time, and pressing the open one closes
// it.
//
// The logos are the only colour on the row, and only while engaged: greyscale
// at rest, their own colours on hover, keyboard focus, or while their list is
// open — the same reveal as the evidence plates beneath.
export default function TopSkills({ skills }: { skills: SkillView[] }) {
  const [open, setOpen] = React.useState<string | null>(null);
  const panelId = React.useId();
  const panel = React.useRef<HTMLDivElement>(null);
  const current = skills.find((s) => s.slug === open);

  // Opening a skill brings its list into view, since on a short screen the
  // list lands below the fold and the press looks like it did nothing.
  // `nearest` scrolls only as far as needed — not at all if the list is
  // already on screen — and focus stays on the button, so the keyboard
  // reader can keep moving along the row.
  React.useEffect(() => {
    if (!open || !panel.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.current.scrollIntoView({
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [open]);

  return (
    <div>
      <ul role="list" className="flex flex-wrap gap-3 border-y border-hairline py-6">
        {skills.map((skill) => {
          const expanded = open === skill.slug;
          return (
            <li key={skill.slug}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : skill.slug)}
                className="mono group inline-flex items-center gap-2.5 border border-hairline px-3 py-2 normal-case transition-colors hover:border-paper hover:text-paper aria-expanded:border-paper aria-expanded:text-paper"
              >
                <span
                  aria-hidden
                  style={skill.brand ? ({ "--brand": skill.brand } as React.CSSProperties) : undefined}
                  className={
                    skill.tone === "logo"
                      ? "inline-flex grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0 group-aria-expanded:grayscale-0 motion-reduce:transition-none"
                      : skill.brand
                        ? "inline-flex transition-colors duration-300 group-hover:text-[color:var(--brand)] group-focus-visible:text-[color:var(--brand)] group-aria-expanded:text-[color:var(--brand)] motion-reduce:transition-none"
                        : "inline-flex"
                  }
                >
                  <Icon icon={skill.icon} width={18} height={18} />
                </span>
                {skill.name}
                <span className="text-mid">· {skill.projects.length}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* One region for every button, so it never moves while the reader
          switches between skills. Empty and hidden until one is open. */}
      <div
        ref={panel}
        id={panelId}
        hidden={!current}
        className="scroll-mb-8 border-b border-hairline py-6"
      >
        {current && (
          <>
            <p className="mono">
              {current.name} — in {current.projects.length}{" "}
              {current.projects.length === 1 ? "entry" : "entries"} on Ship
            </p>
            <ul role="list" className="mt-4 flex flex-col gap-2">
              {current.projects.map((p) => (
                <li key={p.id}>
                  <Link
                    href={projectHref(p.id)}
                    className="font-serif text-lg text-paper underline decoration-hairline underline-offset-4 transition-colors hover:decoration-paper"
                  >
                    {p.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
