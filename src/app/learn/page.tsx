import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import { flagship } from "@/lib/flagship";

export const metadata: Metadata = {
  title: "Learn — Mohammed Kenawy",
  description:
    "Learning in public: the lessons paid for, written up as they're distilled.",
};

// Learn — the second phase. The distilled lesson, learning in public. These are
// real lessons from the account, framed honestly as notes-in-progress rather
// than finished essays (brand-guidelines §2.2: lead with the paid lesson).
type Lesson = {
  lesson: string;
  cost: string;
  body: string;
};

const lessons: Lesson[] = [
  {
    lesson: "Start from the application layer, not the data.",
    cost: "An HR system migration, done the harder way first",
    body: "Moving off MS Access, we led with the data migration. It cost more than we expected. Starting from the application layer would have shown us the whole system before we committed to a shape for the data. The failure had a consequence, so it counts as engineering rather than confession.",
  },

  {
    lesson: "Own the AI use; the SRS is the proof of authorship.",
    cost: "One air-gapped DMS, specified before it was generated",
    body: "I wrote the SRS and the ADRs, then directed coding agents against them. Hiding that would make the work look like everyone else's. Stating the workflow — and showing the specification — puts authorship above the tools.",
  },
];

export default function LearnPage() {
  return (
    <PageShell>
      <PageOpening
        eyebrow="Learn — the lessons paid for"
        title="What each thing cost, and what changed."
        lede="Learning in public. These are the paid lessons from the work — written up as notes as they're distilled, ahead of the longer pieces they'll become."
      />

      {/* Flagship — the lead entry (design.md §10.3). Essay-as-teaching. */}
      <article className="mt-16 border-y border-hairline py-10">
        <p className="mono mb-4">Flagship essay · bilingual</p>
        <h2 className="font-serif text-3xl leading-tight">
          <span dir="rtl" lang="ar" className="font-arabic">
            {flagship.titleAr}
          </span>
          <span className="text-mid"> — {flagship.titleEn}</span>
        </h2>
        <p className="mt-2 font-serif text-lg italic text-mid">
          {flagship.subtitle}
        </p>
        <p className="prose-measure mt-4 font-serif text-lg text-paper">
          A parable that teaches distributed consensus by telling it. The same
          events pass through three narrators — {flagship.voices.join(", ")} —
          so the reader feels the problem of agreeing across unreliable
          messengers before the theory names it. An interactive council lets you
          add honest, absent, and dishonest members and watch the n &gt; 3f
          bound hold or break; an appendix maps each story symbol to its
          distributed-systems concept.
        </p>
        <a
          href={flagship.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mono mt-6 inline-block border border-hairline px-4 py-3 text-mid transition-colors hover:border-paper hover:text-paper"
        >
          Read the parable ↗
        </a>
      </article>

      <p className="mono mt-16 normal-case text-mid">Notes — lessons paid for</p>

      <div className="mt-6 space-y-12 border-t border-hairline pt-12">
        {lessons.map(({ lesson, cost, body }) => (
          <article key={lesson} className="prose-measure">
            <h2 className="font-serif text-2xl leading-snug italic">
              {lesson}
            </h2>
            <p className="mono mt-3 normal-case text-mid">{cost}</p>
            <p className="mt-4 font-serif text-lg text-paper">{body}</p>
          </article>
        ))}
      </div>

      <p className="mono mt-16 normal-case text-mid">
        Longer essays are in progress — this page grows as they ship.
      </p>
    </PageShell>
  );
}
