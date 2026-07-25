import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import Figure from "@/components/Figure/figure";
import { flagship } from "@/lib/flagship";
import { asset } from "@/lib/media";

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

// Back to basics — the textbook register from the academic years. `revisit`
// marks the ones still pulled off the shelf; the rest were read in parts.
type Basic = {
  title: string;
  author: string;
  year: string;
  revisit?: boolean;
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

const basics: Basic[] = [
  {
    title: "Discrete Mathematics",
    author: "Seymour Lipschutz, Marc Lipson",
    year: "2021",
  },
  {
    title: "Systems Analysis and Design",
    author: "Alan Dennis, Barbara Haley Wixom, Roberta M. Roth",
    year: "2022",
    revisit: true,
  },
  { title: "Digital Fundamentals", author: "Thomas L. Floyd", year: "2022" },

  { title: "Pattern Classification", author: "Richard O. Duda", year: "2022" },
  {
    title: "Computer Organization and Architecture",
    author: "William Stallings",
    year: "2022",
  },
  { title: "Clean Code", author: "Robert C. Martin", year: "2022" },
  {
    title: "Software Engineering",
    author: "Ian Sommerville",
    year: "2023",
    revisit: true,
  },
  {
    title: "Fundamentals of Database Systems",
    author: "Ramez Elmasri",
    year: "2023",
    revisit: true,
  },
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    year: "2023",
    revisit: true,
  },
  {
    title: "Human–Computer Interaction",
    author: "Alan Dix",
    year: "2023",
    revisit: true,
  },

  {
    title: "Introduction to Java Programming and Data Structures",
    author: "Y. Daniel Liang",
    year: "2023",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    year: "2023",
  },
  {
    title: "Data Communications and Networking",
    author: "Behrouz A. Forouzan",
    year: "2023",
    revisit: true,
  },
  {
    title: "Prolog Programming for Artificial Intelligence",
    author: "Ivan Bratko",
    year: "2023",
  },

  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart J. Russell, Peter Norvig",
    year: "2024",
  },
  {
    title: "Computer Security: Principles and Practice",
    author: "William Stallings, Lawrie Brown",
    year: "2024",
  },
  {
    title: "Digital Image Processing",
    author: "Rafael C. Gonzalez",
    year: "2024",
    revisit: true,
  },
  {
    title: "Computer Vision: A Modern Approach",
    author: "David A. Forsyth",
    year: "2024",
  },
  {
    title: "Compilers: Principles, Techniques, and Tools",
    author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman",
    year: "2024",
  },
  {
    title: "Introduction to Data Compression",
    author: "Khalid Sayood",
    year: "2024",
    revisit: true,
  },
];

// Newest year first — the register reads backwards, most recent at the top.
const basicsYears = basics
  .map(({ year }) => year)
  .filter((year, i, all) => all.indexOf(year) === i)
  .sort((a, b) => Number(b) - Number(a));

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

      {/* Back to basics — the academic-years register. Set in the manuscript
          hand: mono year rails, serif titles, revisited books held at full ink. */}
      <section className="mt-20">
        <p className="mono mb-5">Back to basics · the academic years</p>
        <h2 className="max-w-[20ch] font-serif text-3xl leading-tight sm:text-4xl">
          The textbooks underneath.
        </h2>
        <hr className="flourish mt-6" />
        <p className="prose-measure mt-6 font-serif text-lg text-paper">
          All of it was additional study — read beside the coursework, not
          inside it. The titles held at full weight are the ones I still revisit;
          the rest I read in chapters, enough to carry the shape of the field.
        </p>

        {/* Proof artifact — the reading in its original setting, before it was
            a list (brand-guidelines-anti-ai.md §3, class 1). Pairs with
            Silberschatz in the 2023 register below. */}
        <Figure
          className="mt-10 max-w-2xl"
          src={asset("/figures/os-board-2023.jpg")}
          alt="A whiteboard covered in handwritten operating-systems notes: definitions of an operating system and a command shell, an app–shell–kernel–hardware diagram, and a worked list of Linux commands."
          caption="fig. 1 — operating systems, 2023. app → shell → kernel → hardware, and the command set underneath it."
          width={1500}
          height={1220}
          sizes="(min-width: 768px) 42rem, 100vw"
        />

        <div className="mt-12 border-t border-hairline">
          {basicsYears.map((year) => (
            <div
              key={year}
              className="grid grid-cols-1 gap-x-10 border-b border-hairline py-8 sm:grid-cols-[6rem_minmax(0,1fr)]"
            >
              <p className="mono pt-1">{year}</p>
              <ul className="mt-4 space-y-5 sm:mt-0">
                {basics
                  .filter((book) => book.year === year)
                  .map(({ title, author, revisit }) => (
                    <li key={title}>
                      <p
                        className={
                          revisit
                            ? "font-serif text-xl leading-snug text-paper"
                            : "font-serif text-xl leading-snug text-mid"
                        }
                      >
                        {title}
                        {revisit && (
                          <span className="mono ml-3 align-middle">
                            revisited
                          </span>
                        )}
                      </p>
                      <p className="mono mt-1 normal-case text-mid">{author}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

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
