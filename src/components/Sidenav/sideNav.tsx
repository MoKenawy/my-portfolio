import { Icon } from "@iconify/react";
import Link from "next/link";
import { site } from "@/config/site";

// A quiet vertical rail of the real profiles — square, hairline, neutral.
// Hidden on small screens where it would crowd the prose column.
export default function SideNav() {
  if (site.socials.length === 0) return null;
  return (
    <nav
      aria-label="Profiles"
      className="fixed left-0 top-1/2 z-10 hidden -translate-y-1/2 flex-col border-y border-r border-hairline bg-ground lg:flex"
    >
      {site.socials.map(({ icon, href, label }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="border-b border-hairline p-3 text-mid transition-colors last:border-b-0 hover:text-paper"
        >
          <Icon icon={icon} width={20} height={20} aria-hidden />
        </Link>
      ))}
    </nav>
  );
}
