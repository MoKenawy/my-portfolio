// The flagship piece (design.md §10.3). A separately deployed bilingual parable
// that encodes Byzantine fault tolerance across three narrator voices. It spans
// the loop: filed under Learn, cross-linked from Read and Document, surfaced on
// Home. The single strongest anti-AI artifact in the brand — un-generatable by
// construction — so it lives at its own URL and is linked, never re-hosted here.
export const flagship = {
  titleAr: "رسالةٌ لا تصل",
  titleEn: "A Message That Never Arrives",
  subtitle: "a parable of distributed trust",
  href: "https://mokenawy.github.io/al-buna/",
  // The distributed-systems theory the parable draws on (for the Read cross-link).
  theory: "Byzantine fault tolerance — the Two Generals problem and the n > 3f bound",
  // The three narrator voices, preserved as a visible device on the piece itself.
  voices: ["the skeptic", "the chronicler", "the believer"],
} as const;
