"use client";

import React from "react";
import ProjectModal from "./projectModal";
import type { ProjectImage, ProjectVideo } from "@/lib/media";

export interface ProjectCardProps {
  title: string;
  /** The friction or risk that existed before the work. The card opens here. */
  problem: string;
  /** What explains the problem — the turn. Carried in the modal, not the card. */
  insight: string;
  /** What was built, trimmed to the mechanism. */
  solution: string;
  /** The artifact that shows it worked, described so a stranger can go and check. */
  evidence: string;
  /** The long-form detail, for the reader who opens the modal. */
  overview: string;
  tags?: string[];
  tools?: string[];
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  links?: { name: string; url: string }[];
  /** Mono metadata lines shown in the right column (e.g. stack, phase, year). */
  meta?: string[];
}

// One entry in the index — a case-study opening, not a card (design.md §4).
//
// The card is set on the decision spine rather than feature-first: it opens on
// the problem, gives the mechanism, then the proof, and closes on a next step.
// That is three messages, which is the discipline the whole index is held to;
// the insight, the full overview, the stack and the figures wait in the modal,
// so the depth is kept without the skim paying for it.
export default function ProjectCard({
  title,
  problem,
  insight,
  solution,
  evidence,
  overview,
  tags = [],
  tools = [],
  images = [],
  videos = [],
  links = [],
  meta = [],
}: ProjectCardProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <article className="grid grid-cols-1 gap-x-10 gap-y-4 py-10 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="prose-measure">
        <h2 className="font-serif text-3xl leading-tight">{title}</h2>

        {/* The problem carries the opening — no label, it simply starts there. */}
        <p className="mt-3 font-serif text-lg text-paper">{problem}</p>

        <p className="mono mt-7">What I built</p>
        <p className="mt-2 font-serif text-lg text-paper">{solution}</p>

        <p className="mono mt-7">The proof</p>
        <p className="mt-2 font-serif text-lg text-paper">{evidence}</p>

        {tags.length > 0 && (
          <p className="mono mt-7 normal-case text-mid">{tags.join("  ·  ")}</p>
        )}

        {/* Next step on the entry itself, not only in the page's shared footer:
            a reader convinced by one project shouldn't have to scroll to act. */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ProjectModal
            open={open}
            onOpenChange={setOpen}
            title={title}
            insight={insight}
            overview={overview}
            tools={tools}
            images={images}
            videos={videos}
            links={links}
            trigger={
              <button
                type="button"
                className="mono border border-hairline px-3 py-2 text-mid transition-colors hover:border-paper hover:text-paper"
              >
                Read the longer version
              </button>
            }
          />
          {links.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono border border-hairline px-3 py-2 text-mid transition-colors hover:border-paper hover:text-paper"
            >
              {name} ↗
            </a>
          ))}
        </div>
      </div>

      {meta.length > 0 && (
        <div className="text-left sm:text-right">
          {meta.map((line) => (
            <p
              key={line}
              className="font-mono text-xs leading-relaxed text-mid"
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
