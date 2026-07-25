import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import Figure from "@/components/Figure/figure";

export const metadata: Metadata = {
  title: "Contact — Mohammed Kenawy",
  description: "Get in touch — email, GitHub, and LinkedIn.",
};

// Contact — a colophon. Quiet, mono-led, no form theatre. Sits outside the loop.
const email = "mokenawy.business@gmail.com";

const channels = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
  },
  {
    label: "GitHub",
    value: "github.com/MoKenawy",
    href: "https://github.com/MoKenawy",
  },
  {
    label: "LinkedIn",
    value: "in/mohammedkenawy",
    href: "https://www.linkedin.com/in/mohammedkenawy/",
  },
];

export default function Contact() {
  return (
    <PageShell>
      <PageOpening
        eyebrow="Colophon — get in touch"
        title="Building systems that outlive their builders."
        lede="Open to full-stack and systems work around payroll, migrations, and data-intensive systems — and to Arabic-first work on on-premises, air-gapped archival. The clearest picture of how I work is the commit history, not a pitch."
      />

      {/* Addresses on the left, the portrait plate in the right margin — the
          list belongs to a person, not a template (design.md §8). */}
      <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <div>
          {/* One obvious next step. Set as a solid block rather than a coloured
              button — weight carries the emphasis, not hue (design.md §9). */}
          <a
            href={`mailto:${email}`}
            className="inline-block border border-paper bg-paper px-8 py-4 font-mono text-xs uppercase tracking-label text-ground transition-colors hover:bg-transparent hover:text-paper"
          >
            Write to me →
          </a>
          <p className="mono mt-3 normal-case">{email}</p>

          <dl className="mt-12 max-w-xl divide-y divide-hairline border-y border-hairline">
            {channels.map(({ label, value, href }) => {
              const external = href.startsWith("http");
              return (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <dt className="mono">{label}</dt>
                  <dd>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="font-mono text-sm text-paper underline decoration-hairline underline-offset-4 transition-colors hover:decoration-paper"
                    >
                      {value}
                      {external ? " ↗" : ""}
                    </a>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <Figure
          className="max-w-[17rem]"
          src="/figures/portrait-2023.jpg"
          alt="Mohammed Kenawy, photographed in 2023."
          caption="fig. 1 — 2023."
          width={900}
          height={1597}
          sizes="17rem"
          tone="colour"
        />
      </div>
    </PageShell>
  );
}
