"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./themeToggle";
import { navLinks } from "@/lib/nav";

// Masthead — the top of a manuscript, not a hero (design.md §4).
// The nav enacts the read → learn → ship → document loop; each item carries a
// plain-word sub-label so phase-naming never leaves a visitor guessing.
function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-serif text-2xl font-medium tracking-tight"
        >
          <Image
            src="/Logo.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 brightness-0 invert"
            priority
          />
          Mohammed Kenawy
        </Link>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-start gap-x-7 gap-y-3"
        >
          {navLinks.map(({ href, name, sub, primary }) => {
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
          {/* Utilities, not destinations — Contact sits outside the loop
              (design.md §10.1), so it is a bordered button beside the theme
              toggle rather than a sixth nav item. Held at hairline weight so it
              never out-weighs Ship, the primary destination. */}
          <div className="flex items-center gap-3 self-center">
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={
                "mono border px-[10px] py-[5px] transition-colors " +
                (pathname === "/contact"
                  ? "border-paper text-paper"
                  : "border-hairline text-mid hover:border-paper hover:text-paper")
              }
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
