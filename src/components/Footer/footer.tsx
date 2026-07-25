import Link from "next/link";

// Documentation footer (design.md §4/§5) — the last thing the reader sees is
// what was left behind. Mono, hairline-topped, asymmetric.
const docLinks = [
  { name: "Ship", href: "/ship" },
  { name: "Document", href: "/document" },
  { name: "GitHub", href: "https://github.com/MoKenawy" },
  // Held at full ink so the way to reach a person is never the faintest thing
  // on the page — the footer is the only contact route on the loop pages.
  { name: "Contact", href: "/contact", cta: true },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-7 sm:px-8">
        <span className="mono normal-case">
          Durable artifacts left behind. Built with intent.
        </span>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
          {docLinks.map(({ name, href, cta }) => {
            const external = href.startsWith("http");
            return (
              <Link
                key={name}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={
                  "mono transition-colors " +
                  (cta
                    ? "text-paper underline decoration-hairline underline-offset-4 hover:decoration-paper"
                    : "text-mid hover:text-paper")
                }
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
