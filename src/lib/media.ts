// Screenshots are served from ImageKit rather than committed to /public: the
// repo stays light and the CDN resizes on request. Stills only — the account's
// video quota is exhausted and ImageKit answers 403 to every video request,
// original or transformed, so recordings are self-hosted and reach the page
// through asset() below.
//
// The files sit at the root of the endpoint under their original names, spaces
// and parentheses included, so every path goes through encodeURI.
const IMAGEKIT = "https://ik.imagekit.io/mokenawy";

/**
 * A CDN asset URL. `tr` is an ImageKit transformation string: "w-1600" caps the
 * delivered width, "f-auto" negotiates webp, "q-90" keeps small text legible.
 */
export function ik(file: string, tr?: string) {
  const url = `${IMAGEKIT}/${encodeURI(file)}`;
  return tr ? `${url}?tr=${tr}` : url;
}

/**
 * A file in /public. The site is served from a sub-path on GitHub Pages, and a
 * hand-written asset URL — a <video src>, a poster — does not get that prefix
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
export interface ProjectVideo {
  src: string;
  poster: string;
  title: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}
