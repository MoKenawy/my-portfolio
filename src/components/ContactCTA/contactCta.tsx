import Link from "next/link";

// The closing invitation. A manuscript ends with the address, not with a
// pop-up — so this sits at the foot of the pages a visitor actually finishes
// (Home and Ship) and gives them one obvious next step.
//
// Weighted with ink rather than hue: a solid block in the text colour that
// inverts to an outline on hover, so it works in both modes with no second
// accent (design.md §9).
export default function ContactCTA({ line }: { line: string }) {
  return (
    <section className="mt-20 border-t border-hairline pt-10">
      <p className="mono mb-4">Connect — the next step</p>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
        <p className="prose-measure font-serif text-2xl leading-snug text-paper">
          {line}
        </p>
        <Link
          href="/contact"
          className="inline-block shrink-0 border border-paper bg-paper px-8 py-4 font-mono text-xs uppercase tracking-label text-ground transition-colors hover:bg-transparent hover:text-paper"
        >
          Contact me →
        </Link>
      </div>
    </section>
  );
}
