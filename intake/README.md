# Client intake

Fill these in **before** building the portfolio. Each file is a questionnaire; your answers become the content of the site.

These are blank templates: don't fill them in place. Copy them to `Docs/intake/` (git-ignored) and answer there. In Claude Code, the `/new-portfolio` skill does this for you and interviews the client file by file.

In your copy, replace every `[...]` prompt, delete the guidance lines you don't need, and write "skip" for anything that doesn't apply. Rough and honest beats polished.

| Order | File | You tell us | It becomes |
|---|---|---|---|
| 1 | [01-about-me.md](01-about-me.md) | Who you are, what you do, what you want | `site.ts`: identity, hero, pitch, contact |
| 2 | [02-timeline.md](02-timeline.md) | Your story, year by year | `content/about.ts` and the `sidebar` |
| 3 | [03-projects.md](03-projects.md) | Each project, one block per project | `content/projects.ts` |
| 4 | [04-brand-and-voice.md](04-brand-and-voice.md) | Audience, voice, what counts as proof | The wording of everything above |
| 5 | [05-look-and-structure.md](05-look-and-structure.md) | Colours, fonts, pages, languages | `globals.css`, `fonts/manuscript.ts`, `site.nav` |
| 6 | [06-assets.md](06-assets.md) | The files to send | `public/` |

Keep these files out of the published site: they contain personal detail. Move them out of the repo (or into the git-ignored `Docs/`) once the content has been transferred.
