"use client";

import React from "react";
import ProjectModal from "./projectModal";

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  overview: string;
  tools?: string[];
  images?: string[];
  links?: { name: string; url: string }[];
  /** Mono metadata lines shown in the right column (e.g. stack, phase, year). */
  meta?: string[];
}

// One entry in the index — a case-study opening, not a card (design.md §4).
// Serif title and prose left; mono metadata right; a modal for the full read.
export default function ProjectCard({
  title,
  description,
  overview,
  tags = [],
  tools = [],
  images = [],
  links = [],
  meta = [],
}: ProjectCardProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <article className="grid grid-cols-1 gap-x-10 gap-y-4 py-10 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="prose-measure">
        <h2 className="font-serif text-3xl leading-tight">{title}</h2>
        <p className="mt-3 font-serif text-lg text-paper">{description}</p>

        {tags.length > 0 && (
          <p className="mono mt-4 normal-case text-mid">
            {tags.join("  ·  ")}
          </p>
        )}

        <ProjectModal
          open={open}
          onOpenChange={setOpen}
          title={title}
          overview={overview}
          tools={tools}
          images={images}
          links={links}
          trigger={
            <button
              type="button"
              className="mono mt-6 border border-hairline px-3 py-2 text-mid transition-colors hover:border-paper hover:text-paper"
            >
              Read more
            </button>
          }
        />
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
