# Client intake

Fill these in **before** building the portfolio. Each file is a questionnaire; your answers become the content of the site.

**Easiest way:** run `pnpm intake` (or `node intake/tool/fill.mjs`). It opens a form in your browser, one page per questionnaire, and saves your answers as filled Markdown files in `Docs/intake/` (git-ignored, never leaves your computer). You can stop and resume at any time. `pnpm intake:check` tells you whether the required answers are in.

The `.md` files in this folder are blank, generated copies of the same questionnaires, for reading or filling by hand. Don't fill them in place: copy them to `Docs/intake/`. In Claude Code, the `/new-portfolio` skill interviews the client and uses the same files.

If you fill by hand, replace every `[...]` prompt, delete the guidance lines you don't need, and write "skip" for anything that doesn't apply. Rough and honest beats polished.

**Changing the questions or adding a language:** the questions live in [`tool/schema.mjs`](tool/schema.mjs) (structure) and [`tool/locales/en.mjs`](tool/locales/en.mjs) (all wording). To add a language, copy `en.mjs` to e.g. `ar.mjs`, translate the values and set `dir: 'rtl'` for right-to-left; then `pnpm intake -- --lang ar`. After editing either file run `pnpm intake:templates` to refresh the blank `.md` files.

| Order | File | You tell us | It becomes |
|---|---|---|---|
| 1 | [01-about-me.md](01-about-me.md) | Who you are, what you do, what you want | `site.ts`: identity, hero, pitch, contact |
| 2 | [02-timeline.md](02-timeline.md) | Your story, year by year | `content/about.ts` and the `sidebar` |
| 3 | [03-projects.md](03-projects.md) | Each project, one block per project | `content/projects.ts` |
| 4 | [04-brand-and-voice.md](04-brand-and-voice.md) | Audience, voice, what counts as proof | The wording of everything above |
| 5 | [05-look-and-structure.md](05-look-and-structure.md) | Colours, fonts, pages, languages | `globals.css`, `fonts/manuscript.ts`, `site.nav` |
| 6 | [06-assets.md](06-assets.md) | The files to send | `public/` |

Keep these files out of the published site: they contain personal detail. Move them out of the repo (or into the git-ignored `Docs/`) once the content has been transferred.
