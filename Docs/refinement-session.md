# Portfolio Refinement — Session Summary

A working log of the refinement and Manuscript-migration session for the
`my-portfolio` Next.js site. Captures the decisions, the work shipped, and the
open items so the next person (or the next session) starts from one, not zero.

---

## Starting point

- **Stack:** Next.js 14.2 (App Router), TypeScript, React 18, **NextUI**, Tailwind 3.4, Framer Motion, Iconify. Static-exported to **GitHub Pages** under `/my-portfolio`.
- **Pages:** Home/About, Projects, Contact (Contact and Footer were empty stubs).
- **Goal:** three refinement items —
  1. Replace NextUI with a more custom UI.
  2. Conditional config: static export locally, image optimization in production.
  3. Overhaul the whole visual identity from provided brand docs.

---

## Decisions made (and why)

| Topic | Decision | Rationale |
|---|---|---|
| Item 2 direction | Keep GitHub Pages; static export + `unoptimized` images in **prod**, live optimization in **dev** | GH Pages has no server, so real image optimization in prod is impossible. The realistic split is the reverse of the original phrasing. |
| Item 1 replacement | Pure Tailwind, tokens-first; **Radix Dialog** for the modal | User preference for a personal, owned UI. Radix Dialog is the same primitive shadcn wraps — a11y (focus trap, Escape, scroll-lock) for free, slots into shadcn's CLI later. |
| Sequencing | Item 2 first (isolated), then Item 3 + Item 1 together, page by page | Cleaner to restyle owned components than to fight NextUI's theme on the way out. |
| Visual system | **Manuscript** (`design.md` Rev B) — binding spec, not invented | The design system already existed; the job was translation, not authorship. |
| About copy | Adapted from `timeline-en.md` into a Level A essay | The system lives on real prose; brand rule forbids fabrication. |
| Information architecture | The thesis loop **Read · Learn · Ship · Document** as top-level nav, Home outside it, **Ship** heaviest/default | `design.md` §10. Ship = the projects page renamed, so "where are the projects" always has a home. |
| Flagship | Link to the externally-deployed parable, don't re-host or fabricate | Content lives at `https://mokenawy.github.io/al-buna/`; brand rule: publish only what actually happened. |
| Theme | Keep dark+light toggle; site defaults dark | `design.md` §7/§11. |

---

## The Manuscript system (as implemented)

- **Palette** — strict neutral, two modes, one identity. Dark-dominant default; light is a mechanical inversion. Single optional oxblood accent (`#791F1F`), off by default. Tokens as CSS custom properties in [globals.css](../src/app/globals.css), mapped to Tailwind utilities (`bg-ground`, `text-paper`, `border-hairline`).
- **Type** — the pairing *is* the thesis: **Newsreader** (serif prose) + **IBM Plex Mono** (metadata) + **IBM Plex Sans Arabic** (RTL). Self-hosted via `next/font/local` ([manuscript.ts](../src/app/fonts/manuscript.ts)) — no CDN.
- **Layout** — opens like an essay, never a hero: mono eyebrow → serif title → 44px hairline flourish → ~68ch prose column → asymmetric reading margin → documentation footer. Square corners, hairlines, no rounded cards.
- **Loop enacted** — read (margin) → learn (beneath) → ship (body) → document (footer), and also as the site's top-level map.

---

## Work shipped

### Phase — Item 2 (conditional config)
- [next.config.mjs](../next.config.mjs) branches on `NODE_ENV`: prod → `output: "export"` + `basePath`/`assetPrefix` `/my-portfolio` + `images.unoptimized`; dev → none of that (live optimization).
- Removed stray `next.config copy.mjs`.

### Phase — Items 3 + 1 (Manuscript identity + NextUI removal)
- **Foundation:** self-hosted fonts; Manuscript tokens in `globals.css`; Tailwind config re-pointed to tokens, NextUI plugin + glob removed; `NextUIProvider` stripped from [providers.tsx](../src/app/providers.tsx); honest metadata + no-flash theme script in [layout.tsx](../src/app/layout.tsx).
- **Shell:** [Header](../src/components/Header/header.tsx) masthead + [ThemeToggle](../src/components/Header/themeToggle.tsx); [SideNav](../src/components/Sidenav/sideNav.tsx) restyled; [Footer](../src/components/Footer/footer.tsx) as documentation footer; shared [PageShell](../src/components/PageShell/pageShell.tsx).
- **Pages:** [Home/About](../src/app/page.tsx) as Level A essay; [ProjectCard](../src/components/Project/projectCard.tsx) as case-study rows; [ProjectModal](../src/components/Project/projectModal.tsx) on Radix Dialog; [Contact](../src/app/contact/page.tsx) as colophon.
- **Dependency:** removed `@nextui-org/react`, added `@radix-ui/react-dialog`; regenerated `pnpm-lock.yaml` so CI's `--frozen-lockfile` stays green.
- **Result:** Home First Load JS dropped **167 kB → 102 kB**.

### Phase — Information architecture (loop as site map)
- [src/lib/nav.ts](../src/lib/nav.ts): **Home · Read · Learn · Ship · Document**, each with a mono sub-label (`Read → notes`, `Ship → projects`, …), Ship primary.
- New routes: [/read](../src/app/read/page.tsx) (reading log — real books), [/learn](../src/app/learn/page.tsx) (paid-lesson notes), [/document](../src/app/document/page.tsx) (artifact library). `/projects` → [/ship](../src/app/ship/page.tsx) via `git mv`.
- Fixed active-state bug: `href === "/" ? exact : startsWith` (Home no longer matches every route).

### Phase — Flagship (`design.md` §10.3)
- [src/lib/flagship.ts](../src/lib/flagship.ts): single source of truth for *رسالةٌ لا تصل / A Message That Never Arrives* — the externally-deployed bilingual parable encoding Byzantine fault tolerance across three voices.
- **Surfaced on Home** (prose lead-in), **lead entry on Learn**, **cross-linked from Read** (the theory) and **Document** (the appendix as documentation-as-teaching). All link to `https://mokenawy.github.io/al-buna/`; Arabic set RTL in `font-arabic`.

---

## Verification

- **Build:** clean production build, all 7 routes prerendered, types valid, static export succeeds.
- **Lint:** no ESLint warnings or errors.
- **Driven:** dev server — all routes 200; confirmed dark theme, loop nav + sub-labels, thesis headline, real prose, 4 working modal triggers, flagship on all four pages with correct external URL, Arabic `dir="rtl"` + `font-arabic`, and exactly one `aria-current` on `/ship` (active-state fix).
- **Caveat:** no browser-automation tool was available; verification was via build + HTML/CSS inspection of the running dev server, **not visual screenshots**.

---

## Open items / next steps

- **Not committed** — all changes sit in the working tree awaiting review.
- **Visual review recommended** (`npm run dev`): flagship block prominence on Home; masthead nav wrapping (5 items + sub-labels) on narrow windows; Arabic RTL title rendering.
- **Arabic content**: the face + RTL styling are wired, but no Arabic *body* content exists yet (for future DMS/teaching surfaces).
- **`/projects` redirect**: none added (fresh site, no inbound links); add a redirect stub if old links need preserving.
- **shadcn**: the modal uses `@radix-ui/react-dialog` directly; adopting shadcn's CLI later would formalize this.
- **Dead CI step**: the GH Pages workflow exports an unused `BASE_PATH` env var — harmless, removable.

---

## Reference documents (source of truth, not edited this session)

- `design.md` — Manuscript visual system, Rev B (binding).
- `brand-guidelines-anti-ai.md` — writing + evidence rules.
- `timeline-en.md` / `timeline-ar.md` — the five-year narrative (About-copy source).
- `personal-info.md` — bio, stack, positioning.
- `agent-prompt-apply-IA.md` — the IA task prompt.
