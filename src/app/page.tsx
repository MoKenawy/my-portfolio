import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell/pageShell";
import Figure from "@/components/Figure/figure";
import ContactCTA from "@/components/ContactCTA/contactCta";
import { flagship } from "@/lib/flagship";
import { asset } from "@/lib/media";

// One beat of the decision spine: a mono label in the left rail, the message
// itself at the reading measure. The register grid from Read's basics list, so
// the spine reads as another page of the same manuscript rather than a widget.
function Beat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-hairline py-8 sm:grid-cols-[11rem_minmax(0,1fr)]">
      <p className="mono pt-1">{label}</p>
      <div className="prose-measure">{children}</div>
    </div>
  );
}

// Home / About — Level A, fully literary (design.md §6, §7). Sits outside the
// read → learn → ship → document loop as the literary landing; the five-year
// arc, distilled from the retrospective into brand voice. Opens with its own
// masthead-adjacent essay rather than PageOpening, so it takes the shell alone.
export default function Home() {
  return (
    <PageShell>
      {/* Opening — a page of an essay, not a hero. */}
      <section className="pt-20 sm:pt-28">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <p className="mono mb-5">An account of the work · 2022 — present</p>
            <h1 className="max-w-[15ch] font-serif text-5xl leading-[1.05] sm:text-7xl">
              You don&apos;t ship code, you ship understanding made durable.
            </h1>
            <p className="mt-5 max-w-[46ch] font-serif text-xl italic text-paper sm:text-2xl">
              Mohammed Kenawy — an early-career full-stack engineer in Egypt.
            </p>
            {/* The ask, in the opening rather than 3,000 words below it: the
                reader learns what this page wants from them at the masthead. */}
            <Link
              href="/contact"
              className="mono mt-6 inline-block normal-case underline decoration-hairline underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              Hire one engineer who owns it end to end — and documents it. →
            </Link>
          </div>
          <Image
            src={asset("/Logo.svg")}
            alt=""
            width={200}
            height={200}
            className="logo-mark h-40 w-40 shrink-0 sm:h-[28rem] sm:w-[28rem] lg:h-[36rem] lg:w-[36rem]"
            priority
          />
        </div>
        <hr className="flourish mt-8" />
      </section>

      {/* The decision spine — one promise, three messages. It sits above the
            essay so a skim meets problem → solution → evidence first, and the
            long account below becomes the reward for an engaged reader rather
            than the first thing anyone hits (design.md §6). A reader can stop
            here and act; the essay is the depth underneath. */}
      <section className="mt-16">
        <p className="mono mb-5">The promise</p>
        <h2 className="prose-measure font-serif text-3xl leading-snug sm:text-4xl">
          I build the systems that have to be right — and leave them documented
          well enough that the next person inherits them, not reverse-engineers
          them.
        </h2>
        <hr className="flourish mt-7" />

        <div className="mt-10 border-t border-hairline">
          <Beat label="Why now — the problem">
            <p className="font-serif text-lg text-paper">
              When a payroll run is wrong or a migration loses data, you find
              out in production, in front of the people it affects. Most
              engineers can&apos;t show you they&apos;ve built for that case
              before.
            </p>
          </Beat>

          <Beat label="How it works — the solution">
            <p className="font-serif text-lg text-paper">
              You get one engineer who owns the whole path — analysis to
              deployment — and hands back not just working software but the
              specification and decision record that let your team maintain it
              without me.
            </p>
          </Beat>

          <Beat label="Why believe — the evidence">
            <p className="font-serif text-lg text-paper">
              Everything I claim is inspectable: public commit history, a real
              SRS you can read, recordings of the systems running. You
              don&apos;t have to trust a pitch — you can check the work.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/ship"
                className="mono inline-block border border-hairline px-4 py-3 text-mid transition-colors hover:border-paper hover:text-paper"
              >
                See what I&apos;ve shipped →
              </Link>
              <Link
                href="/contact"
                className="mono inline-block border border-paper bg-paper px-4 py-3 normal-case text-ground transition-colors hover:bg-transparent hover:text-paper"
              >
                Write to me →
              </Link>
            </div>
          </Beat>
        </div>
      </section>

      {/* Flagship, surfaced immediately (design.md §10.3) — a prose lead-in,
            not a card. The fastest way to grasp the whole identity at once. */}
      <section className="mt-16 border-y border-hairline py-10">
        <p className="mono mb-4">Flagship — filed under Learn</p>
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="prose-measure">
            <h2 className="font-serif text-3xl leading-tight">
              <span dir="rtl" lang="ar" className="font-arabic">
                {flagship.titleAr}
              </span>
              <span className="text-mid"> — {flagship.titleEn}</span>
            </h2>
            <p className="mt-2 font-serif text-lg italic text-mid">
              {flagship.subtitle}
            </p>
            <p className="mt-4 font-serif text-lg text-paper">
              A literary parable that encodes Byzantine fault tolerance across
              three narrator voices — a skeptic, a chronicler, a believer — with
              an interactive council and an appendix mapping every symbol to its
              distributed-systems concept. It is the piece I would point to
              first.
            </p>
          </div>
          <a
            href={flagship.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono shrink-0 border border-hairline px-4 py-3 text-mid transition-colors hover:border-paper hover:text-paper"
          >
            Read the parable ↗
          </a>
        </div>
      </section>

      {/* Asymmetric spread — prose body + right reading margin. Unchanged, but
            now labelled as optional depth: the spine above carries the decision,
            this carries the account. */}
      <p className="mono mt-16">The longer account ↓</p>
      <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="prose-measure font-serif text-lg">
          <p className="mb-5 text-xl italic text-mid">
            &ldquo;No, not good enough — yet.&rdquo;
          </p>

          <p className="mb-5">
            It began, as these things do, with a dissatisfaction. In 2022 I was
            the clean-code guy; clean code was my identity, and I thought
            passion and a tidy codebase were enough. They were not. Every time I
            decided I knew enough, a new context arrived to correct me — an
            academic year, military service, an undocumented legacy system, a
            first real job.
          </p>

          <p className="mb-5">
            The lesson I paid for most recently, and most literally: data
            migrations cost more than you think. On my first industry team —
            small enough that &ldquo;full-stack engineer&rdquo; meant planning,
            analysis, design, testing, and deployment too — we moved an HR and
            personnel system off MS Access. It might have been better to start
            from the application layer and see the whole system first, before
            touching the data. I know that now because we did it the other way.
          </p>

          <p className="mb-5">
            What came after was where the work got interesting. The Access
            migration turned out to be the first module of a larger ERP
            digital transformation for the company, and I stayed on to build
            the rest of it: a deterministic payroll engine with retroactive
            recalculation, which became my entry into fintech and
            double-entry ledgers; a metadata-driven reporting and export
            subsystem — BullMQ queues, Redis, background workers,
            notifications over SSE, and enough failure modes to justify chaos
            testing it; and the HR department system itself, the record of
            people the payroll and reporting modules both read from. None of
            it is glamorous. All of it has to be right.
          </p>

          <p className="mb-5">
            Before the job there was the army, where I became — by seniority,
            not design — a leader of four. I had always thought vertically: one
            problem, deep. There the pressure was horizontal, many small things
            at once, more than one head holds. I learned to write everything
            down, to share the load, and to document a workflow so the next
            person would not start from zero. That last idea has stayed with me
            as something closer to a principle than a habit.
          </p>

          <p className="mb-5">
            Between the army and now I built a Diagram Management System — an
             on-premises archive for engineering diagrams, written
            TypeScript end to end with a fully RTL Arabic interface. Its two
            load-bearing decisions were separating a diagram&apos;s identity
            from its files so the version history is immutable, and a
            polymorphic permission model where a whole department has access
            except one person, in a single indexed query. I wrote the SRS and
            the ADRs, then directed coding agents against them. I don&apos;t
            hide that; the SRS is the proof of authorship.
          </p>

          <p>
            The thread through all of it is the same 2022 line, still
            unfinished. I read to understand the domain, learn to distill it,
            ship the mechanism, and document the journey — then read again. The
            code is the exhaust of that loop. What I&apos;m trying to leave
            behind is systems the next person can inherit.
          </p>
        </article>

        {/* The margin rail: a frontispiece plate, then read + learn
              (design.md §5, §8). */}
        <div className="border-t border-hairline pt-6 lg:border-l lg:border-t-0 lg:pl-8">
          <Figure
            className="mb-9 max-w-[13rem]"
            src={asset("/figures/portrait-2024.jpg")}
            alt="Mohammed Kenawy, photographed in 2024."
            caption="fig. 1 — 2024."
            width={821}
            height={1762}
            sizes="13rem"
            priority
            tone="colour"
          />

          <aside aria-label="Reading trail">
            <div className="mb-7">
              <span className="mono mb-2 block">Reading now</span>
              <p className="font-mono text-xs leading-relaxed text-paper">
                Designing Data-Intensive Applications
                <span className="block text-mid">
                  Kleppmann — on scaling, streams &amp; queues
                </span>
              </p>
            </div>
            <div className="mb-7">
              <p className="font-mono text-xs leading-relaxed text-paper">
                Getting Things Done
                <span className="block text-mid">
                  Allen — the army-era horizontal load
                </span>
              </p>
            </div>
            <div className="mb-7">
              <span className="mono mb-2 block">Learned</span>
              <p className="font-serif text-base italic leading-snug text-paper">
                A failure with a consequence is engineering; without one,
                it&apos;s confession.
              </p>
            </div>
            <div>
              <span className="mono mb-2 block">Framing</span>
              <p className="font-mono text-xs leading-relaxed text-mid">
                ~6 months in industry.
                <span className="block">Trajectory over seniority.</span>
              </p>
            </div>
          </aside>
        </div>
      </div>

      <ContactCTA line="If the system you need is the unglamorous kind that has to be right, write to me." />
    </PageShell>
  );
}
