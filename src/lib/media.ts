// Optional CDN for heavy stills: set NEXT_PUBLIC_IMAGEKIT_URL (for example
// "https://ik.imagekit.io/your-id") and use ik("file.png", "w-1600") in
// src/content/projects.ts. Leave it unset to serve everything from /public.
const IMAGEKIT = process.env.NEXT_PUBLIC_IMAGEKIT_URL ?? "";

/**
 * A CDN asset URL. `tr` is an ImageKit transformation string: "w-1600" caps the
 * delivered width, "f-auto" negotiates webp, "q-90" keeps small text legible.
 */
export function ik(file: string, tr?: string) {
  const url = `${IMAGEKIT}/${encodeURI(file)}`;
  return tr ? `${url}?tr=${tr}` : url;
}

/**
 * A file in /public. The site may be served from a sub-path (a GitHub Pages project
 * site), and a hand-written asset URL — a <video src>, a poster — does not get that prefix
 * applied for it, so every one of them goes through here.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

/** A still in a project's figure list — the image and the caption that reads it. */
export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/**
 * A recording in a project's figure list, with the frame shown before play.
 * The dimensions are the recording's own — a webcam capture is not 16:9, and
 * holding the true ratio keeps the slot from jumping when the video mounts.
 */
/** A recording that lives on YouTube rather than in /public — same figure
 *  treatment, but nothing contacts YouTube until the reader presses play. */
export interface ProjectEmbed {
  videoId: string;
  poster: string;
  title: string;
  alt: string;
  caption: string;
}

export interface ProjectVideo {
  src: string;
  poster: string;
  title: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}
