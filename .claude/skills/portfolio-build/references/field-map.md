# Field map: intake answer → code

Every answer in `Docs/intake/` and where it lands. "—" means it guides the writing but is not stored.

## 01-about-me.md
| Intake field | Destination |
|---|---|
| Full name | `site.name` (header, metadata title) |
| Role / title | `site.role` |
| City, country | `site.location` |
| One-sentence description | `site.description` (meta description) |
| Languages you work in | — (and 05 languages) |
| Time in industry, current situation | `site.sidebar` "Framing" item, or `about` |
| Your stack | `projects[].tools`, `about` |
| What you have built | `about`, `site.pitch.beats` |
| Who should read / what they should do | `site.hero.cta`, `site.contact.label` |
| Rates, areas, values, current focus | `about` or `site.sidebar` only if the client wants them public |
| Promise | `site.pitch.promise` |
| Problem / solution / evidence | `site.pitch.beats[0..2]` (`label` + `body`) |
| Public email / preferred contact | `site.contact.href` (`mailto:` or URL), `site.hero.cta.href` |
| GitHub, LinkedIn, other | `site.socials[]` (`label`, `href`, Iconify `icon`: `mdi:github`, `mdi:linkedin`, `mdi:twitter`, `mdi:youtube`, `mdi:web`) |
| Closing invitation | `site.contact.ctaLine` |
| — | `site.hero.eyebrow` (e.g. "Portfolio · <year>"), `site.hero.headline` (the thesis, from 01 promise or 02 thread), `site.hero.intro` ("<name> — <role>, <location>.") |

## 02-timeline.md
| Intake field | Destination |
|---|---|
| Year sections | `about` in `src/content/about.ts` (3–6 paragraphs) |
| Programmes, courses, certificates | `about`, or a new page if 05 asks for one |
| The thread | last `about` paragraph; candidate for `site.hero.headline` |
| Pull quote | `aboutQuote` |
| Side notes | `site.sidebar[]` (`label`, `title`, `note`) |
| Second language | `lang`/`dir` attributes and the `font-arabic` class (or a new font) on those runs |

## 03-projects.md (one block → one entry in `src/content/projects.ts`)
| Intake field | `ProjectCardProps` field |
|---|---|
| Project name | `title` |
| Label above the title | `eyebrow` |
| Year / phase / stack lines | `meta[]` |
| Tags | `tags[]` |
| Tools | `tools[]` |
| Problem | `problem` |
| What I built | `solution` |
| The proof | `evidence` |
| Insight | `insight` |
| Overview | `overview` |
| Screenshots | `images[]` (`src` via `asset()`/`ik()`, `alt`, `caption`, real `width`/`height`) |
| Video files | `videos[]` (`src`, `poster`, `title`, `alt`, `caption`, `width`, `height`) |
| YouTube id | `embed` (`videoId`, `poster`, `title`, `alt`, `caption`) |
| Links | `links[]` (`name`, `url`) |
| Can this be shown publicly? | include / redact / omit the entry |
| Featured piece | `site.featured` (`eyebrow`, `title`, `titleAlt`, `subtitle`, `blurb`, `href`, `cta`) |
| `## Do not publish` | nowhere — portfolio-review greps for it |

## 04-brand-and-voice.md
| Intake field | Destination |
|---|---|
| Audience table | `site.hero.cta`, order of `site.nav`, which projects go first |
| Voice, person, banned words | — (applies to every string written) |
| Proof table | `projects[].evidence`, `projects[].links`, `site.pitch.beats[2]` |
| Pre-publication check | portfolio-review checklist |

## 05-look-and-structure.md
| Intake field | Destination |
|---|---|
| Pages table | `site.nav[]` (`label`, `href`, `sub`, `primary`) + `src/app/<page>/page.tsx` |
| Contact page or link | `site.contact.href` |
| Default mode | `data-theme` in `src/app/layout.tsx`, fallback in `src/components/Header/themeToggle.tsx` |
| Accent / colours | `--accent` etc. in the three `:root` blocks of `src/app/globals.css` |
| Fonts | `src/app/fonts/manuscript.ts` (+ files in `src/app/fonts/manuscript/`) |
| Languages / RTL | `lang` on `<html>` in `src/app/layout.tsx`; `dir="rtl"` on RTL runs |
| Photos colour or B/W | `tone` prop on `Figure` |
| Logo / initials | `site.logo` or delete it (header shows the name only) |
| Hosting, domain | `site.url`; `public/CNAME` for a custom domain |
| Repository name | `BASE_PATH` for the test build; the launch repo name |
| CDN | `NEXT_PUBLIC_IMAGEKIT_URL` |

## 06-assets.md
| Asset | Destination |
|---|---|
| Logo (SVG, black) | `public/logo.svg` → `site.logo.src` |
| Portrait | `public/figures/portrait.<ext>` → `site.portrait` |
| Favicon | `src/app/favicon.ico` |
| Screenshots, videos, posters | `public/projects/` → `projects[]` |
| CV (PDF) | `public/cv.pdf` + a link (e.g. in `site.socials` with `mdi:file-document`) |
| Certificates, documents | `public/documents/` + links from `about` or a page |
