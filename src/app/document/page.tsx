import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import { flagship } from "@/lib/flagship";

export const metadata: Metadata = {
  title: "Document — Mohammed Kenawy",
  description:
    "The artifacts left behind: git history, ADRs, SRS excerpts, and other durable records of how the work was made.",
};

// Document — the fourth phase. The artifacts left behind, named explicitly
// (design.md §5). The proof-artifact library: things an AI cannot produce and a
// template cannot contain (brand-guidelines §3).
type Artifact = {
  kind: string;
  title: string;
  note: string;
  href?: string;
  hrefLabel?: string;
  status?: string;
};

// The published decision records live in-tree and are linked on GitHub rather
// than re-rendered here: the repo shows the tables and the mermaid flow without
// a markdown dependency, and — more to the point — it carries the commit history
// behind each file. Renaming identifiers cost these records their verifiability;
// the history is what gives it back.
const RECORDS = "https://github.com/MoKenawy/my-portfolio/blob/main/Docs/publish";

const artifacts: Artifact[] = [
  {
    kind: "Architecture decision records",
    title: "Five decisions from an HR & payroll platform",
    note: "Written while modernising a legacy MS Access system: how a queued job survives the process that enqueued it dying, when deduplicating forever serves stale data, who may read an operation another user created, and how payroll recalculation regenerates its own output without destroying a manual edit. One of them exists because it caught an earlier record claiming durability nothing in the design delivered. Table and column names are renamed; the decisions, the rejected options, and the consequences are not.",
    href: `${RECORDS}/README.md`,
    hrefLabel: "Read the records",
  },
  {
    kind: "Documentation-as-teaching",
    title: `${flagship.titleAr} — concept appendix`,
    note: "The flagship parable closes on an appendix that maps every story symbol to its distributed-systems concept — guards to nodes, messengers to packets, the council to a consensus protocol. Documentation written to teach, not just to record.",
    href: flagship.href,
    hrefLabel: "Open the parable",
  },
  {
    kind: "Repository",
    title: "DriveWise — Driving Station",
    note: "Public commit history for the graduation project: the driving station that reads vehicle telemetry over REST and detects drowsiness with computer vision.",
    href: "https://github.com/MoKenawy/DriveWise-Driving-Station",
    hrefLabel: "GitHub",
  },
  {
    kind: "SRS + ADRs",
    title: "Diagram Management System — specification",
    note: "A complete SRS and design models for the DMS, with the implementation broken into task prompts for coding agents. Redacted excerpts available to serious enquirers — for this buyer, the documentation is the demo.",
    status: "Excerpts on request",
  },
  {
    kind: "Trust signal",
    title: "Exemplary-conduct discharge rating",
    note: "Military service ended with an exemplary-conduct rating — offered as a trust signal for government and enterprise clients where it matters.",
    status: "On request",
  }
];

export default function DocumentPage() {
  return (
    <PageShell>
      <PageOpening
        eyebrow="Document — what was left behind"
        title="The artifacts, named explicitly."
        lede="Work is only done when it's documented well enough to outlive its author. These are the durable records — commit history, specifications, and the evidence of how each system was made."
      />

      <div className="mt-16 divide-y divide-hairline border-y border-hairline">
        {artifacts.map(({ kind, title, note, href, hrefLabel, status }) => (
          <article
            key={title}
            className="grid grid-cols-1 gap-x-10 gap-y-4 py-9 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div className="prose-measure">
              <span className="mono block">{kind}</span>
              <h2 className="mt-2 font-serif text-2xl leading-tight">
                {title}
              </h2>
              <p className="mt-3 font-serif text-lg text-paper">{note}</p>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono mt-5 inline-block border border-hairline px-3 py-2 text-mid transition-colors hover:border-paper hover:text-paper"
                >
                  {hrefLabel} ↗
                </a>
              )}
            </div>
            {status && (
              <p className="font-mono text-xs leading-relaxed text-mid sm:text-right">
                {status}
              </p>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
