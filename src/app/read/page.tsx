import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import { flagship } from "@/lib/flagship";

export const metadata: Metadata = {
  title: "Read — Mohammed Kenawy",
  description:
    "A reading log: the books and papers worked through alongside the work, and what each one changed.",
};

// Read — the first phase of the loop. The reading trail an AI portfolio cannot
// fabricate (design.md §5). Real books from the five-year account; each entry
// names what the reading changed, not just that it happened.
type Entry = {
  title: string;
  author: string;
  status: string;
  note: string;
};

const reading: Entry[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "Reading now",
    note: "Chapter 11 — streams and queues — is the one I keep returning to; it reframed the reporting subsystem's async workers for me. The wider goal is thinking honestly about scaling the HR system instead of guessing.",
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    status: "Applied",
    note: "Read it in the army, where the pressure turned horizontal — many small things at once, more than one head holds. It taught me to write everything down shallowly rather than a few things deeply.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Outgrown, on purpose",
    note: "In 2022 this was my identity — I was the clean-code guy. I still value it, but the lesson since is that clean code alone is not good enough; the system around it has to be right too.",
  },
];

export default function ReadPage() {
  return (
    <PageShell>
      <PageOpening
        eyebrow="Read — the reading trail"
        title="What I read alongside the work."
        lede="Reading feeds the work; the work is only done when it's documented well enough to outlive me. This is the trail — targeted reading, not a shelf to display."
      />

      <div className="mt-16 divide-y divide-hairline border-y border-hairline">
        {reading.map(({ title, author, status, note }) => (
          <article
            key={title}
            className="grid grid-cols-1 gap-x-10 gap-y-3 py-9 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div className="prose-measure">
              <h2 className="font-serif text-2xl leading-tight">{title}</h2>
              <p className="mono mt-2 normal-case text-mid">{author}</p>
              <p className="mt-4 font-serif text-lg text-paper">{note}</p>
            </div>
            <p className="font-mono text-xs leading-relaxed text-mid sm:text-right">
              {status}
            </p>
          </article>
        ))}
      </div>

      {/* Cross-link to the flagship — the theory it draws on (design.md §10.3). */}
      <section className="mt-12 border-b border-hairline pb-9">
        <p className="mono mb-3">Read into · flagship</p>
        <p className="prose-measure font-serif text-lg text-paper">
          The distributed-systems theory above — {flagship.theory} — is where{" "}
          <a
            href={flagship.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-hairline underline-offset-4 transition-colors hover:decoration-paper"
          >
            <span dir="rtl" lang="ar" className="font-arabic">
              {flagship.titleAr}
            </span>{" "}
            ↗
          </a>{" "}
          turns it into a parable. Reading feeds the writing; this is that seam.
        </p>
      </section>
    </PageShell>
  );
}
