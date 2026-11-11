import Image from "next/image";
import Link from "next/link";

// A proof artifact set the way the manuscript sets one: the photograph inside a
// hairline frame, a lowercase mono caption beneath it (design.md §8,
// brand-guidelines-anti-ai.md §3). Photographs and scans only — never
// illustration, never generated imagery.
//
// Photographs default to desaturated so they sit inside the strict-neutral
// palette (§9: no colour beyond the single accent). The files are untouched
// colour originals, so `tone="colour"` shows one exactly as it was shot.
export default function Figure({
  src,
  alt,
  caption,
  width,
  height,
  sizes,
  className,
  priority,
  tone = "neutral",
  onActivate,
  activateLabel,
  href,
  external,
  crop,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  tone?: "neutral" | "colour";
  /** Makes the frame itself the control that opens the fuller record. */
  onActivate?: () => void;
  activateLabel?: string;
  /**
   * Makes the frame a link instead. Internal paths go through `next/link`,
   * which applies `basePath` itself, so they must not be wrapped in `asset()`.
   * If `onActivate` is also passed it wins and `href` is ignored.
   */
  href?: string;
  /** Opens `href` in a new tab as a plain anchor. */
  external?: boolean;
  /**
   * Sets the plate in a fixed 4:3 window instead of at its own proportions,
   * and says which part of the file the window looks at. For a row of plates
   * that has to share one height; the file itself is never altered.
   */
  crop?: "top" | "center" | "left" | "right";
}) {
  // Whole class names, so Tailwind's scanner can see them.
  const cropClass = crop
    ? {
        top: "aspect-[4/3] object-cover object-top",
        center: "aspect-[4/3] object-cover object-center",
        left: "aspect-[4/3] object-cover object-left",
        right: "aspect-[4/3] object-cover object-right",
      }[crop]
    : "";
  const frameClass =
    "block w-full border border-hairline p-1.5 transition-colors hover:border-paper";

  const plate = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${tone === "colour" ? "" : "grayscale"} ${cropClass}`}
    />
  );

  return (
    <figure className={className}>
      {/* When the figure opens something, the frame is the control — a button
          or a link — and the caption stays outside it so a <figcaption> never
          lands inside phrasing content. The hover brightens the rule and
          nothing else: no lift, no shadow. */}
      {onActivate ? (
        <button
          type="button"
          onClick={onActivate}
          aria-label={activateLabel}
          className={frameClass}
        >
          {plate}
        </button>
      ) : href && external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={activateLabel}
          className={frameClass}
        >
          {plate}
        </a>
      ) : href ? (
        <Link href={href} aria-label={activateLabel} className={frameClass}>
          {plate}
        </Link>
      ) : (
        <div className="border border-hairline p-1.5">{plate}</div>
      )}
      <figcaption className="mono mt-3 normal-case leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
