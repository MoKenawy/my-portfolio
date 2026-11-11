"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React from "react";
import type { ProjectImage } from "@/lib/media";

// The figure set of a record, read one plate at a time (design.md §8, §10.4).
//
// The stack it replaces was honest and unreadable: six screens of an Arabic
// ERP laid end to end inside a 36rem modal, each one scaled down to about a
// third of the size its table text was set at. A reader scrolled past the
// evidence rather than through it. So the plates are now a sequence — one in
// the frame, numbered the way plates in a book are numbered, and the frame
// itself opens the plate at the size it was captured, which for a dense grid
// is the only size at which it proves anything.
//
// The interaction is structural, not ornamental (design.md §10.4): no lift, no
// shadow, no fade between plates, no colour. What moves is the plate number.

/** Left and right walk the sequence while the set has focus or is enlarged. */
function useArrowKeys(active: boolean, go: (delta: number) => void) {
  React.useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);
}

export default function Plates({
  images,
  title,
}: {
  images: ProjectImage[];
  title: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [enlarged, setEnlarged] = React.useState(false);
  // Enlarged, a plate fits the width it is given and never upscales past the
  // size it was captured at — so on a wide screen "fit" already is capture
  // size, and on a phone it is a readable whole rather than a quarter of one.
  // Pressing through to capture size is what a dense grid needs on the phone,
  // and then the plate pans inside its frame.
  const [capture, setCapture] = React.useState(false);
  const count = images.length;

  const go = React.useCallback(
    (delta: number) => setIndex((at) => (at + delta + count) % count),
    [count],
  );
  useArrowKeys(enlarged, go);

  if (count === 0) return null;
  const plate = images[Math.min(index, count - 1)];
  const many = count > 1;

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="mono block">Figures</span>
        {many && (
          <span className="mono block" aria-live="polite">
            plate {index + 1} of {count}
          </span>
        )}
      </div>

      {/* The frame is the control, as it is on the card: pressing it opens the
          plate at capture size. The caption stays outside the button so a
          <figcaption> never lands inside phrasing content. */}
      <figure className="mt-4">
        <button
          type="button"
          onClick={() => setEnlarged(true)}
          aria-label={`Enlarge plate ${index + 1} of ${count} — ${title}`}
          className="block w-full border border-hairline p-1.5 transition-colors hover:border-paper"
        >
          <Image
            key={plate.src}
            src={plate.src}
            alt={plate.alt}
            width={plate.width}
            height={plate.height}
            sizes="(min-width: 640px) 36rem, 88vw"
            className="h-auto w-full"
          />
        </button>
        <figcaption className="mono mt-3 normal-case leading-relaxed">
          {plate.caption}
        </figcaption>
      </figure>

      <p className="mono mt-2 normal-case">
        press the plate to open it full screen
      </p>

      {/* The rail. Plate numbers rather than thumbnails: a screenshot shrunk to
          a thumbnail is a grey smear, and a strip of them is the template
          fingerprint this system is written against (§9). */}
      {many && (
        <nav
          aria-label={`Figures — ${title}`}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous plate"
            className="mono border border-hairline px-3 py-1 transition-colors hover:border-paper hover:text-paper"
          >
            ←
          </button>
          {images.map((image, at) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(at)}
              aria-label={`Plate ${at + 1}`}
              aria-current={at === index ? "true" : undefined}
              className={`mono border px-3 py-1 transition-colors hover:border-paper hover:text-paper ${
                at === index
                  ? "border-paper text-paper"
                  : "border-hairline text-mid"
              }`}
            >
              {at + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next plate"
            className="mono border border-hairline px-3 py-1 transition-colors hover:border-paper hover:text-paper"
          >
            →
          </button>
        </nav>
      )}

      {/* Enlarged, the plate is served at its own pixel width and the viewport
          scrolls to it. A 1366-wide grid of Arabic payroll rows is legible at
          1366 and at no width below it, which is the whole reason this exists. */}
      <Dialog.Root
        open={enlarged}
        onOpenChange={(open) => {
          setEnlarged(open);
          if (!open) setCapture(false);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-ground/95" />
          <Dialog.Content className="fixed inset-0 z-[70] flex flex-col bg-ground p-4 sm:p-6">
            <div className="flex items-start justify-between gap-6">
              <Dialog.Title className="mono block normal-case">
                {title} — plate {index + 1} of {count}
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close"
                className="mono shrink-0 border border-hairline px-3 py-1 text-mid transition-colors hover:border-paper hover:text-paper"
              >
                Close
              </Dialog.Close>
            </div>

            <Dialog.Description className="sr-only">
              {plate.alt}
            </Dialog.Description>

            {/* The frame hugs the plate rather than the viewport, and the
                scroll lives outside it: a 2898px-tall capture pans, a short
                one simply sits at the top of the space. Centring is done with
                text-align so that an image wider than the viewport still
                scrolls from its own left edge instead of being clipped. */}
            <div className="mt-4 flex-1 overflow-auto text-center">
              <div className="inline-block border border-hairline p-1.5">
                {/* Width is pinned rather than left to `w-auto`: that resolves
                    against whatever the image loader happened to return — in
                    development the optimizer hands back a 1024px variant —
                    and a plate shown at 1024 when it was captured at 1366 is
                    the problem this whole view exists to solve. */}
                <Image
                  key={plate.src}
                  src={plate.src}
                  alt={plate.alt}
                  width={plate.width}
                  height={plate.height}
                  quality={95}
                  className="block h-auto"
                  style={{
                    width: plate.width,
                    maxWidth: capture ? "none" : "100%",
                  }}
                />
              </div>
            </div>

            <p className="mono mt-3 normal-case leading-relaxed">
              {plate.caption}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {many && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous plate"
                    className="mono border border-hairline px-3 py-1 transition-colors hover:border-paper hover:text-paper"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next plate"
                    className="mono border border-hairline px-3 py-1 transition-colors hover:border-paper hover:text-paper"
                  >
                    →
                  </button>
                  <span className="mono block">or the arrow keys</span>
                </>
              )}
              <button
                type="button"
                onClick={() => setCapture((on) => !on)}
                aria-pressed={capture}
                className="mono ml-auto border border-hairline px-3 py-1 normal-case transition-colors hover:border-paper hover:text-paper"
              >
                {capture
                  ? "fit to the screen"
                  : `capture size — ${plate.width}px`}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
