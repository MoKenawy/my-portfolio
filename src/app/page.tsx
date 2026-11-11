import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell/pageShell";
import Figure from "@/components/Figure/figure";
import ContactCTA from "@/components/ContactCTA/contactCta";
import { site } from "@/config/site";
import { about, aboutQuote } from "@/content/about";
import { asset } from "@/lib/media";

// One beat of the pitch: a mono label in the left rail, the message at the
// reading measure.
function Beat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-hairline py-8 sm:grid-cols-[11rem_minmax(0,1fr)]">
      <p className="mono pt-1">{label}</p>
      <div className="prose-measure">{children}</div>
    </div>
  );
}

// Home / About. Every string comes from src/config/site.ts and
// src/content/about.ts.
export default function Home() {
  const { hero, pitch, featured, portrait, sidebar } = site;

  return (
    <PageShell>
      <section className="pt-20 sm:pt-28">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <p className="mono mb-5">{hero.eyebrow}</p>
            <h1 className="max-w-[15ch] font-serif text-5xl leading-[1.05] sm:text-7xl">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-[46ch] font-serif text-xl italic text-paper sm:text-2xl">
              {hero.intro}
            </p>
            <Link
              href={hero.cta.href}
              className="mono mt-6 inline-block normal-case underline decoration-hairline underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              {hero.cta.label}
            </Link>
          </div>
          {site.logo && (
            <Image
              src={asset(site.logo.src)}
              alt={site.logo.alt}
              width={200}
              height={200}
              className="logo-mark h-40 w-40 shrink-0 sm:h-72 sm:w-72 lg:h-96 lg:w-96"
              priority
            />
          )}
        </div>
        <hr className="flourish mt-8" />
      </section>

      {pitch && (
        <section className="mt-16">
          <p className="mono mb-5">The promise</p>
          <h2 className="prose-measure font-serif text-3xl leading-snug sm:text-4xl">
            {pitch.promise}
          </h2>
          <hr className="flourish mt-7" />
          <div className="mt-10 border-t border-hairline">
            {pitch.beats.map((beat) => (
              <Beat key={beat.label} label={beat.label}>
                <p className="font-serif text-lg text-paper">{beat.body}</p>
              </Beat>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {site.nav
              .filter((n) => n.href !== "/")
              .map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="mono inline-block border border-hairline px-4 py-3 text-mid transition-colors hover:border-paper hover:text-paper"
                >
                  {n.label} →
                </Link>
              ))}
            <Link
              href={site.contact.href}
              className="mono inline-block border border-paper bg-paper px-4 py-3 normal-case text-ground transition-colors hover:bg-transparent hover:text-paper"
            >
              {site.contact.label} →
            </Link>
          </div>
        </section>
      )}

      {featured && (
        <section className="mt-16 border-y border-hairline py-10">
          <p className="mono mb-4">{featured.eyebrow}</p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="prose-measure">
              <h2 className="font-serif text-3xl leading-tight">
                {featured.title}
                {featured.titleAlt && (
                  <span className="text-mid"> — {featured.titleAlt}</span>
                )}
              </h2>
              <p className="mt-2 font-serif text-lg italic text-mid">
                {featured.subtitle}
              </p>
              <p className="mt-4 font-serif text-lg text-paper">
                {featured.blurb}
              </p>
            </div>
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono shrink-0 border border-hairline px-4 py-3 text-mid transition-colors hover:border-paper hover:text-paper"
            >
              {featured.cta} ↗
            </a>
          </div>
        </section>
      )}

      <p className="mono mt-16">The longer account ↓</p>
      <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="prose-measure font-serif text-lg">
          {aboutQuote && (
            <p className="mb-5 text-xl italic text-mid">
              &ldquo;{aboutQuote}&rdquo;
            </p>
          )}
          {about.map((paragraph) => (
            <p key={paragraph} className="mb-5">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="border-t border-hairline pt-6 lg:border-l lg:border-t-0 lg:pl-8">
          {portrait && (
            <Figure
              className="mb-9 max-w-[13rem]"
              src={asset(portrait.src)}
              alt={portrait.alt}
              caption={portrait.caption ?? ""}
              width={portrait.width}
              height={portrait.height}
              sizes="13rem"
              priority
              tone="colour"
            />
          )}

          {sidebar && sidebar.length > 0 && (
            <aside aria-label="Notes">
              {sidebar.map((item) => (
                <div key={item.title} className="mb-7">
                  {item.label && (
                    <span className="mono mb-2 block">{item.label}</span>
                  )}
                  <p className="font-serif text-base leading-snug text-paper">
                    {item.title}
                    {item.note && (
                      <span className="block font-mono text-xs text-mid">
                        {item.note}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>

      <ContactCTA />
    </PageShell>
  );
}
