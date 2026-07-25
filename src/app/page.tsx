import Image from "next/image";
import PageShell from "@/components/PageShell/pageShell";
import Figure from "@/components/Figure/figure";
import ContactCTA from "@/components/ContactCTA/contactCta";
import { flagship } from "@/lib/flagship";

// Home / About — Level A, fully literary (design.md §6, §7). Sits outside the
// read → learn → ship → document loop as the literary landing; the five-year
// arc, distilled from the retrospective into brand voice. Opens with its own
// masthead-adjacent essay rather than PageOpening, so it takes the shell alone.
export default function Home() {
  return (
    <PageShell>
      {/* Opening — a page of an essay, not a hero. */}
      <section className="pt-20 sm:pt-28">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="mono mb-5">An account of the work · 2022 — present</p>
            <h1 className="max-w-[15ch] font-serif text-5xl leading-[1.05] sm:text-7xl">
              You don&apos;t ship code, you ship understanding made durable.
            </h1>
            <p className="mt-5 max-w-[46ch] font-serif text-xl italic text-paper sm:text-2xl">
              Mohammed Kenawy — an early-career full-stack engineer in Egypt.
            </p>
          </div>
          <Image
            src="/Logo.svg"
            alt=""
            width={200}
            height={200}
            className="logo-mark hidden shrink-0 sm:block sm:h-[28rem] sm:w-[28rem] lg:h-[36rem] lg:w-[36rem]"
            priority
          />
        </div>
        <hr className="flourish mt-8" />
      </section>

      {/* Flagship, surfaced immediately (design.md §10.3) — a prose lead-in,
            not a card. The fastest way to grasp the whole identity at once. */}
      <section className="mt-14 border-y border-hairline py-10">
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

      {/* Asymmetric spread — prose body + right reading margin. */}
      <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_260px]">
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
            What came after was where the work got interesting. A deterministic
            payroll engine with retroactive recalculation, which became my entry
            into fintech and double-entry ledgers. A metadata-driven reporting
            and export subsystem — BullMQ queues, Redis, background workers,
            notifications over SSE, and enough failure modes to justify chaos
            testing it. None of it is glamorous. All of it has to be right.
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
            air-gapped, on-premises archive for engineering diagrams, written
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
            src="/figures/portrait-2024.jpg"
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
