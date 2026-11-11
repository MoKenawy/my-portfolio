import Image from "next/image";

// A figure: the image inside a hairline frame with a lowercase mono caption
// beneath it.
//
// Photographs default to desaturated so they sit inside the strict-neutral
// palette (no colour beyond the single accent). The files are untouched
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
}) {
  const plate = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={
        tone === "colour" ? "h-auto w-full" : "h-auto w-full grayscale"
      }
    />
  );

  return (
    <figure className={className}>
      {/* When the figure opens something, the frame is the button — the caption
          stays outside it so a <figcaption> never lands inside phrasing content.
          The hover brightens the rule and nothing else: no lift, no shadow. */}
      {onActivate ? (
        <button
          type="button"
          onClick={onActivate}
          aria-label={activateLabel}
          className="block w-full border border-hairline p-1.5 transition-colors hover:border-paper"
        >
          {plate}
        </button>
      ) : (
        <div className="border border-hairline p-1.5">{plate}</div>
      )}
      <figcaption className="mono mt-3 normal-case leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
