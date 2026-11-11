"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./themeToggle";
import { site } from "@/config/site";
import { asset } from "@/lib/media";

// Masthead — the top of the page, not a hero. Nav and identity come from
// src/config/site.ts.
function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-serif text-2xl font-medium tracking-tight"
        >
          {site.logo && (
            <Image
              src={asset(site.logo.src)}
              alt={site.logo.alt}
              width={32}
              height={32}
              className="logo-mark h-11 w-11"
              priority
            />
          )}
          {site.name}
        </Link>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-start gap-x-7 gap-y-3"
        >
          {site.nav.map(({ href, label: name, sub, primary }) => {
            const current =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={name}
                href={href}
                aria-current={current ? "page" : undefined}
                className="group flex flex-col leading-none"
              >
                <span
                  className={
                    "font-serif text-lg transition-colors group-hover:text-paper " +
                    (primary ? "font-medium " : "") +
                    (current
                      ? "text-paper"
                      : primary
                        ? "text-paper/90"
                        : "text-mid")
                  }
                >
                  {name}
                </span>
                <span
                  className={
                    "mono mt-1 text-[10px] transition-colors " +
                    (current
                      ? "text-mid"
                      : "text-mid/70 group-hover:text-mid")
                  }
                >
                  {sub}
                </span>
                <span
                  aria-hidden
                  className={
                    "mt-1 h-px transition-all " +
                    (current
                      ? "w-full bg-paper"
                      : "w-0 bg-paper group-hover:w-full")
                  }
                />
              </Link>
            );
          })}
          {/* Utilities, not destinations — Contact is a bordered button beside
              the theme toggle rather than a nav item. */}
          <div className="flex items-center gap-3 self-center">
            <Link
              href={site.contact.href}
              className="mono border border-hairline px-[10px] py-[5px] text-mid transition-colors hover:border-paper hover:text-paper"
            >
              {site.contact.label}
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
