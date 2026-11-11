import Link from "next/link";
import { site } from "@/config/site";

// Footer — tagline on the left, nav, socials and contact on the right.
export default function Footer() {
  const links = [
    ...site.nav.filter((n) => n.href !== "/").map((n) => ({ ...n, cta: false })),
    ...site.socials.map((s) => ({ ...s, cta: false })),
    { label: site.contact.label, href: site.contact.href, cta: true },
  ];

  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-7 sm:px-8">
        <span className="mono normal-case">{site.footer.tagline}</span>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ label, href, cta }) => {
            const external = href.startsWith("http");
            return (
              <Link
                key={label}
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
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
