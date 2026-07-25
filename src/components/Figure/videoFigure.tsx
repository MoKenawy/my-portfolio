"use client";

import { useState } from "react";
import Image from "next/image";

// A teaching-video artifact, set as a figure like any other (design.md §8).
// Class 2 in the evidence library and among the strongest proofs available —
// a person explaining a concept in real time cannot be generated after the fact
// (brand-guidelines-anti-ai.md §3).
//
// The still is a self-hosted frame from the video and nothing contacts YouTube
// until the reader presses play: the page keeps its own typography, loads no
// third-party script, and sets no cookies for a visitor who never watches. The
// caption carries a direct link out so the artifact stays verifiable at source.
export default function VideoFigure({
  videoId,
  poster,
  alt,
  title,
  caption,
  className,
}: {
  videoId: string;
  poster: string;
  alt: string;
  title: string;
  caption: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      <div className="border border-hairline p-1.5">
        <div className="relative aspect-video w-full overflow-hidden bg-ground">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play — ${title}`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src={poster}
                alt={alt}
                fill
                sizes="(min-width: 768px) 42rem, 100vw"
                className="object-cover grayscale"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="border border-paper bg-ground px-7 py-4 font-mono text-xs uppercase tracking-label text-paper transition-colors group-hover:bg-paper group-hover:text-ground">
                  Play ▸
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      <figcaption className="mono mt-3 normal-case leading-relaxed">
        {caption}{" "}
        <a
          href={`https://youtu.be/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-hairline underline-offset-4 transition-colors hover:decoration-paper"
        >
          watch on youtube ↗
        </a>
      </figcaption>
    </figure>
  );
}
