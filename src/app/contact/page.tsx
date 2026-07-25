import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";

export const metadata: Metadata = {
  title: "Contact — Mohammed Kenawy",
  description: "Get in touch — email, GitHub, and LinkedIn.",
};

// Contact — a colophon. Quiet, mono-led, no form theatre. Sits outside the loop.
const channels = [
  {
    label: "Email",
    value: "mokenawy.business@gmail.com",
    href: "mailto:mokenawy.business@gmail.com",
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
        lede="Open to backend and systems work around payroll, migrations, and data-intensive systems — and to Arabic-first work on on-premises, air-gapped archival. The clearest picture of how I work is the commit history, not a pitch."
      />

      <dl className="mt-14 max-w-xl divide-y divide-hairline border-y border-hairline">
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
    </PageShell>
  );
}
