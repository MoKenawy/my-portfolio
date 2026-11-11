# Portfolio starter

A Next.js 14 (App Router) + Tailwind + TypeScript portfolio template with a dark/light theme, a project index with modal case studies, and a GitHub Pages deploy workflow.

## Start with the intake documents

Before touching code, fill in the questionnaires in [`intake/`](intake/README.md). They collect everything the site needs, in the order you will use it:

| File | Covers | Ends up in |
|---|---|---|
| [`01-about-me.md`](intake/01-about-me.md) | Identity, goals, pitch, contact | `src/config/site.ts` |
| [`02-timeline.md`](intake/02-timeline.md) | Your story, certificates, side notes | `src/content/about.ts`, `site.sidebar` |
| [`03-projects.md`](intake/03-projects.md) | One block per project, plus a featured piece | `src/content/projects.ts`, `site.featured` |
| [`04-brand-and-voice.md`](intake/04-brand-and-voice.md) | Audience, voice, what counts as proof | The wording of all of the above |
| [`05-look-and-structure.md`](intake/05-look-and-structure.md) | Pages, colours, fonts, hosting | `site.nav`, `globals.css`, `fonts/manuscript.ts` |
| [`06-assets.md`](intake/06-assets.md) | Files to send (logo, portrait, screenshots) | `public/` |

They contain personal detail once filled in. After the content has been moved into the data files below, move `intake/` out of the repo or delete it so it is never published.

## Make this your portfolio (code)

Once the intake documents are filled in:

1. **Identity** — edit [`src/config/site.ts`](src/config/site.ts): name, role, location, description, URL, nav, social links, hero, pitch, contact, footer. Optional blocks (`pitch`, `featured`, `portrait`, `sidebar`, `logo`) disappear when you delete them.
2. **Biography** — edit [`src/content/about.ts`](src/content/about.ts).
3. **Projects** — edit [`src/content/projects.ts`](src/content/projects.ts). Each entry is a `ProjectCardProps`; screenshots go in `public/projects/`.
4. **Images** — replace `public/logo-placeholder.svg` (author it in black; the theme inverts it for dark mode), `public/figures/portrait-placeholder.svg`, and `src/app/favicon.ico`.
5. **Fonts and colours** (optional) — fonts in [`src/app/fonts/manuscript.ts`](src/app/fonts/manuscript.ts), palette in [`src/app/globals.css`](src/app/globals.css).
6. **Optional CDN** — set `NEXT_PUBLIC_IMAGEKIT_URL` and use `ik()` from `src/lib/media.ts`.

Anything that points to a file in `public/` must go through `asset()` from `src/lib/media.ts` so it gets the base path.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm exec tsc --noEmit
pnpm build      # static export to ./out
```

## Deploy to GitHub Pages

Settings → Pages → Source: **GitHub Actions**, then push to `main`. [`nextjs.yml`](.github/workflows/nextjs.yml) reads the base path from GitHub Pages (empty for `<user>.github.io` and custom domains, `/<repo>` otherwise) and passes it to the build as `BASE_PATH`. [`ci.yml`](.github/workflows/ci.yml) lints, typechecks and builds every pull request.

## Before you publish a clone

Start from a fresh history (use **Use this template** on GitHub, or push a branch with no history to a new repo) so nothing from a previous owner survives in old commits.
