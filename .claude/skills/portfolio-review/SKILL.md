---
name: portfolio-review
description: Pre-publication review of a portfolio built from this boilerplate — template placeholder residue, anything the client marked private, missing evidence, alt text and captions, voice rules from the intake, and a production build and click-through with the real base path. Fixes mechanical issues and asks about content ones. Phase 3 of new-portfolio. Use when asked to "review the portfolio", "check before publishing", or "is the site ready to go live".
---

# Portfolio review

## Inputs
- The built site (portfolio-build gate passed).
- `Docs/intake/` — especially `03-projects.md` `## Do not publish`, `04-brand-and-voice.md`, and `05-look-and-structure.md` hosting answers.

## Steps
1. **Placeholder residue.** Must return nothing:
   ```bash
   git grep -n -iE "Your Name|your-handle|you@example\.com|example\.com|replace me|placeholder|\[TODO|Project (One|Two)|sample-[12]" -- src public README.md
   ```
   Exceptions: `README.md` and the intake templates may mention placeholders; the site code may not.
2. **Privacy.** For every item in `## Do not publish` (names, employers, internal hosts, emails, IDs), grep `src/`, `public/` and, after step 6, `out/`. Open every image in `public/` and look at it: no private data, faces or names without consent, no internal URLs in a browser bar.
3. **Intake files are not in git.** `git status --short` and `git ls-files Docs intake` must show only the blank templates and the form tool (`intake/tool/`) in `intake/`, nothing from `Docs/`.
4. **Evidence and accessibility.** In `src/content/projects.ts`: every entry has `evidence`; every `links[].url` resolves (check with a HEAD request, ask before hitting anything that isn't the client's); every image and video has `alt` and a lowercase `caption`; `width`/`height` match the file.
5. **Voice.** Read every string in `src/config/site.ts`, `src/content/*`, and the page labels against `04-brand-and-voice.md`: banned words, the chosen person, round or invented numbers, parallel triplets, claims with no intake source. Quote each offending line.
6. **Production build with the real base path** (from 05: empty for a user site or custom domain, else `/<repo>`):
   ```bash
   pnpm exec next lint --max-warnings=0 && pnpm exec tsc --noEmit
   MSYS_NO_PATHCONV=1 BASE_PATH=<base> pnpm exec next build
   grep -o 'href="[^"]*"\|src="[^"]*"' out/index.html out/*.html | sort -u
   ```
   Every internal href and src must start with the base path. `out/` must contain no file the site doesn't use.
7. **Click-through.** Run `pnpm dev` (use the `run` skill if available) and open every nav item, footer link, CTA, project modal and video. Check dark and light mode and a phone-width viewport.
8. **Run the 04 pre-publication checklist** and tick each item with its evidence.

## Output
A findings table, most serious first:

| file:line | Issue | Fix | Type |
|---|---|---|---|
| … | … | … | mechanical / content |

Then fix the mechanical ones (broken paths, missing sizes, residue the intake answers cover) and re-run the failing steps. Ask the user about content ones (wording, what to show, missing proof) — never rewrite a claim without a source.

## Gate
No residue, no privacy hits, intake not tracked, build passes with the real base path, every link works, 04 checklist fully ticked.

## Hand-off
Gate passed → set Review to "passed" in STATUS.md and invoke `portfolio-launch`.
