import Image from "next/image";

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
}) {
  return (
    <figure className={className}>
      <div className="border border-hairline p-1.5">
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
      </div>
      <figcaption className="mono mt-3 normal-case leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
