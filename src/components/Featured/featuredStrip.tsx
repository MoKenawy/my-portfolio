"use client";

import React from "react";

// A scroll of the record: plates set at plate size, one after another, that a
// reader can drag or step through. Nothing moves on its own.
//
// This answers a decision recorded in `Figure/plates.tsx` — "plate numbers
// rather than thumbnails: a screenshot shrunk to a thumbnail is a grey smear,
// and a strip of them is the template fingerprint this system is written
// against (§9)". It is not that strip. Every plate here is at plate size
// (22rem, the same family as `ProjectCard`'s own `max-w-md` plate), left at its
// natural aspect ratio and uncropped, and the strip is not navigation chips
// standing in for something elsewhere: each item is the artifact itself, and
// the control is the plate. Hence ragged bottoms rather than a fixed frame
// height — cropping evidence to tidy a row is the thing §8 forbids.
//
// It takes `children`, not data. `Figure` is a server component and the items
// are static, so this client shell holds only scroll logic and reads the items
// from the DOM; `Figure` and `next/image` never enter the client bundle, and
// adding an item needs no change here.
//
// It is a scroll region, not a carousel: no tabpanel, no
// aria-roledescription, no live counter, nothing hidden from assistive tech.
// Those belong to the rotating-slideshow pattern this deliberately is not. The
// track is not itself focusable — a scroll container whose children are
// focusable already satisfies `scrollable-region-focusable`, and a tab stop
// before every item would be redundant. When a link inside has focus the
// browser routes the arrow keys to this scroller natively, and the wheel is
// left alone so the page never gets trapped.

// How far a mouse has to move before a press becomes a drag rather than a click.
const DRAG_THRESHOLD = 6;
// Slack for fractional scroll values under browser zoom.
const EPS = 2;

type Edge = { overflows: boolean; atStart: boolean; atEnd: boolean };

const behaviour = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

export default function FeaturedStrip({
  label,
  hint,
  children,
}: {
  label: string;
  /** Shown beside the buttons, and only while there is something to scroll. */
  hint?: string;
  children: React.ReactNode;
}) {
  const track = React.useRef<HTMLUListElement>(null);
  const press = React.useRef<{
    id: number;
    startX: number;
    startLeft: number;
    captured: boolean;
  } | null>(null);
  const dragged = React.useRef(false);
  const [edge, setEdge] = React.useState<Edge>({
    overflows: false,
    atStart: true,
    atEnd: true,
  });

  // Button state follows the scroll position and the box sizes. The arithmetic
  // assumes a left-to-right track: in an RTL one `scrollLeft` runs negative.
  // Images do not shift `scrollWidth` as they load — every one is a next/image
  // with explicit width and height, hence an inline aspect-ratio — so no
  // onLoad hook is needed. The equality guard means no re-render mid-drag
  // unless an edge is actually crossed.
  React.useEffect(() => {
    const el = track.current;
    if (!el) return;

    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next: Edge = {
        overflows: max > EPS,
        atStart: el.scrollLeft <= EPS,
        atEnd: el.scrollLeft >= max - EPS,
      };
      setEdge((prev) =>
        prev.overflows === next.overflows &&
        prev.atStart === next.atStart &&
        prev.atEnd === next.atEnd
          ? prev
          : next,
      );
    };

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, []);

  // Mouse and pen only. Touch already has native inertial scrolling with the
  // right snap behaviour, and intercepting it would kill the momentum.
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = track.current;
    if (!el || e.pointerType === "touch" || e.button !== 0) return;
    dragged.current = false;
    press.current = {
      id: e.pointerId,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      captured: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = track.current;
    const p = press.current;
    if (!el || !p || e.pointerId !== p.id) return;
    const dx = e.clientX - p.startX;
    if (!p.captured) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      // Capture late. Capturing on pointerdown retargets the following click in
      // Chromium and breaks every plain click on a child link; once the press
      // has become a drag, killing the click is exactly what is wanted.
      p.captured = true;
      dragged.current = true;
      el.setPointerCapture(e.pointerId);
      // Snap is off and selection is blocked while dragging. Set directly on
      // the element so it costs no render.
      el.dataset.dragging = "true";
    }
    // Absolute from where the press began. `scrollLeft -= delta` accumulates
    // rounding error against the browser's clamping at the extremes and drifts
    // out of step with the cursor.
    el.scrollLeft = p.startLeft - dx;
  };

  const endDrag = () => {
    const el = track.current;
    const p = press.current;
    press.current = null;
    if (!el || !p) return;
    delete el.dataset.dragging;
    if (p.captured && el.hasPointerCapture(p.id)) el.releasePointerCapture(p.id);
  };

  // A drag must not also follow the link it ended on. Capture phase, so this
  // runs before the link's own handling in both Firefox (where the click is not
  // retargeted) and Chromium (where it is). A click with `detail === 0` is a
  // keyboard activation and is never part of a drag.
  const onClickCapture = (e: React.MouseEvent<HTMLUListElement>) => {
    if (dragged.current && e.detail !== 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    dragged.current = false;
  };

  // Step to the next item's real edge, measured rather than assumed: a fixed
  // item-width-plus-gap step drifts out of alignment after any drag that lands
  // mid-item. `scrollTo` clamps, so `scrollWidth` is a safe far bound.
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const left = el.getBoundingClientRect().left;
    const offsets = Array.from(el.children).map(
      (item) => item.getBoundingClientRect().left - left,
    );
    let target: number;
    if (dir > 0) {
      const next = offsets.find((o) => o > 1);
      target = next === undefined ? el.scrollWidth : el.scrollLeft + next;
    } else {
      const prev = [...offsets].reverse().find((o) => o < -1);
      target = prev === undefined ? 0 : el.scrollLeft + prev;
    }
    el.scrollTo({ left: target, behavior: behaviour() });
  };

  // `aria-disabled`, not `disabled`: a disabled button drops out of the tab
  // order and focus falls to <body> in the middle of the interaction.
  const buttonClass =
    "mono border border-hairline px-3 py-1 transition-colors hover:border-paper hover:text-paper aria-disabled:opacity-40 aria-disabled:hover:border-hairline aria-disabled:hover:text-mid";

  return (
    <div>
      {/* The right edge is deliberately cut. The shell's gutter is cancelled
          rather than escaped with a 100vw calc, which includes the scrollbar
          on Windows and would grow a horizontal page scrollbar. Below 72rem the
          cut lands exactly on the viewport edge; above it, on the shell's own. */}
      <div className="-mr-5 sm:-mr-8">
        <ul
          ref={track}
          role="list"
          aria-label={label}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className="rail-scroll flex cursor-grab snap-x snap-proximity items-start gap-8 overflow-x-auto overscroll-x-contain pb-2 pr-5 data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none data-[dragging=true]:snap-none sm:pr-8"
        >
          {children}
        </ul>
      </div>

      {edge.overflows && (
        // Centred under the strip, the hint beneath them.
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (!edge.atStart) go(-1);
              }}
              aria-disabled={edge.atStart}
              aria-label="Previous item"
              className={buttonClass}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                if (!edge.atEnd) go(1);
              }}
              aria-disabled={edge.atEnd}
              aria-label="Next item"
              className={buttonClass}
            >
              →
            </button>
          </div>
          {hint && <p className="mono text-center normal-case">{hint}</p>}
        </div>
      )}
    </div>
  );
}
