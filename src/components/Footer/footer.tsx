import Link from "next/link";

// Documentation footer (design.md §4/§5) — the last thing the reader sees is
// what was left behind. Mono, hairline-topped, asymmetric.
const docLinks = [
  { name: "Ship", href: "/ship" },
  { name: "Document", href: "/document" },
  { name: "GitHub", href: "https://github.com/MoKenawy" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-7 sm:px-8">
        <span className="mono normal-case">
          Durable artifacts left behind. Built with intent.
        </span>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
          {docLinks.map(({ name, href }) => {
            const external = href.startsWith("http");
            return (
              <Link
                key={name}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mono text-mid transition-colors hover:text-paper"
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
