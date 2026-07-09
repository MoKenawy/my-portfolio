import localFont from "next/font/local";

// Manuscript type system (design.md Rev B §3).
// Newsreader — editorial serif for prose/headings, with real italics.
// IBM Plex Mono — metadata, spec strips, revision marks, code.
// IBM Plex Sans Arabic — all Arabic, weighted equal to Latin.
// Self-hosted (no CDN); subsets pulled from Google Fonts at build-setup time.

export const newsreader = localFont({
  src: [
    {
      // Variable normal face covers the 400–500 range the system uses.
      path: "./manuscript/Newsreader-normal.woff2",
      weight: "400 500",
      style: "normal",
    },
    {
      path: "./manuscript/Newsreader-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

export const plexMono = localFont({
  src: [
    {
      path: "./manuscript/PlexMono-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const plexArabic = localFont({
  src: [
    {
      path: "./manuscript/PlexArabic-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./manuscript/PlexArabic-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});
