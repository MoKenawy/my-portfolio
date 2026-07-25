"use client";

import { useState } from "react";
import type { ProjectVideo } from "@/lib/media";

// A recording we own, set as a figure like any other (design.md §8). Where
// VideoFigure borrows a frame from YouTube, this one carries the file itself
// out of /public, so a plain <video> is the whole embed — no third-party
// script, no cookies, nothing to consent to, and nothing that can revoke it.
//
// Nothing touches the network until the reader presses play: the poster is a
// still cut from the video, and the element is only mounted on the click, which
// keeps a multi-megabyte capture off the wire for a visitor who never watches.
// Screen recordings keep their colour — the alarm states are the evidence —
// where photographs elsewhere are desaturated (§9).
//
// The frame is sized from the recording's own dimensions rather than forced to
// 16:9: the webcam capture is 792×640, and cropping it to a widescreen box cuts
// off the very thing it is evidence of.
export default function HostedVideo({
  src,
  poster,
  title,
  alt,
  caption,
  width,
  height,
  className,
}: ProjectVideo & { className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      <div className="border border-hairline p-1.5">
        <div
          className="relative w-full overflow-hidden bg-ground"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          {playing ? (
            <video
              className="absolute inset-0 h-full w-full"
              src={src}
              poster={poster}
              title={title}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play — ${title}`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              {/* A plain <img>: these are already sized and the production
                  export ships images unoptimized, so next/image would add
                  nothing — and it would quietly drop the basePath that
                  asset() put on the URL. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster}
                alt={alt}
                width={width}
                height={height}
                className="absolute inset-0 h-full w-full object-contain"
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
        {caption}
      </figcaption>
    </figure>
  );
}
