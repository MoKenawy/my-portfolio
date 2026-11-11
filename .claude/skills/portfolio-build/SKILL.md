---
name: portfolio-build
description: Turn the filled intake answers in Docs/intake/ into the site — src/config/site.ts, src/content/about.ts, src/content/projects.ts, assets in public/, and optional colour, font and page changes — writing in the client's voice without inventing anything, then verify lint, typecheck and the static build. Phase 2 of new-portfolio. Use when asked to "build the portfolio from the intake", "fill the site config", or "turn the answers into the site".
---

# Portfolio build

## Inputs
- `Docs/intake/01-*.md` … `06-*.md` with the intake gate passed (see `Docs/intake/STATUS.md`).
- `Docs/intake/assets/` with the client's files.
- [references/field-map.md](references/field-map.md): where every intake answer goes.

## Steps
1. **Read all six intake files and STATUS.md** before writing anything. Note every `[TODO]` and the `## Do not publish` list.
2. **`src/config/site.ts`** — fill `site` per the field map. The `SiteConfig` type in the same file is the contract; don't change it unless a page needs new data.
   - Delete optional blocks (`pitch`, `featured`, `portrait`, `sidebar`, `logo`) when the intake says "skip". The page hides them.
   - `contact.href` is `mailto:` or a full URL. `nav[].href` for internal pages is a plain path (`/projects`); `next/link` adds the base path.
3. **`src/content/about.ts`** — cut the timeline (02) down to 3–6 paragraphs, keeping the client's phrasing where it is strong. `aboutQuote` from 02's pull quote, or `undefined`.
4. **`src/content/projects.ts`** — one `ProjectCardProps` per 03 block, best first (type at `src/components/Project/projectCard.tsx`). Leave out any project whose public answer is "no"; redact per "partly".
   - Local files: `asset("/projects/<file>")` from `src/lib/media.ts`. CDN files: `ik("<file>", "w-1600")`, with `NEXT_PUBLIC_IMAGEKIT_URL` set.
   - `width`/`height` are the file's real pixel size (read it; don't guess). Videos need a poster still.
   - Captions lowercase, saying what the reader is looking at; alt text describes it for someone who can't see it.
5. **Assets** — copy from `Docs/intake/assets/` into `public/`:
   - logo → `public/logo.svg` and set `site.logo.src`; remove `public/logo-placeholder.svg`.
   - portrait → `public/figures/portrait.<ext>`; set `site.portrait` with its real size; remove the placeholder.
   - screenshots/videos → `public/projects/`; remove `sample-*.svg` once no entry uses them.
   - favicon → `src/app/favicon.ico`.
6. **Look (only what 05 asks for)**:
   - colours: the `:root`, `:root[data-theme="light"]` and `:root[data-theme="dark"]` blocks in `src/app/globals.css` (keep the three in step).
   - default mode: `data-theme` on `<html>` in `src/app/layout.tsx` and the fallback in `src/components/Header/themeToggle.tsx`.
   - fonts: swap files and names in `src/app/fonts/manuscript.ts`; keep the CSS variable names.
   - photos in colour: `tone="colour"` on the `Figure`.
7. **Pages** — only those listed in 05. Build each like `src/app/projects/page.tsx`: `PageShell` + `PageOpening` from `src/components/PageShell/pageShell.tsx`, data in `src/content/<page>.ts`, and an entry in `site.nav`.
8. **Fixed labels** — `src/app/projects/page.tsx` (title, lede) and `src/app/page.tsx` ("The promise", "The longer account ↓"): reword if 04's voice calls for it.
9. **`[TODO]`s** — leave the template placeholder in place and list it in STATUS.md. Never fill a gap with invented text.

## Writing rules (from intake 04)
- Lead with a lesson that cost something, not a skill list.
- Real, rough numbers ("over two million rows"), never invented or rounded-up ones.
- Avoid perfectly parallel triplets ("fast, reliable, scalable").
- Use the person (I/we) and the words the client chose; never use the words they banned.
- Every sentence must trace to an intake line. If you can't point to the line, cut the sentence.
- Nothing from `## Do not publish` appears anywhere.

## Gate
Run, and fix until all pass:
```bash
pnpm exec next lint --max-warnings=0
pnpm exec tsc --noEmit
pnpm exec next build                                   # no base path
MSYS_NO_PATHCONV=1 BASE_PATH=/<repo-name> pnpm exec next build   # project-site base path
```
`MSYS_NO_PATHCONV=1` is only needed in Git Bash on Windows (otherwise it rewrites `/<repo>` into a Windows path). Skip the second build if 05 says user site or custom domain. Delete `out/` and `.next/` afterwards.

## Hand-off
Gate passed → set Build to "passed" in STATUS.md, list remaining `[TODO]`s, and invoke `portfolio-review`.
