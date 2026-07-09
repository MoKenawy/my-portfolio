# Agent task — apply the site information architecture (design.md Rev B, §10)

You are updating a static HTML/CSS personal portfolio to match the information architecture now defined in the attached `design.md` (Manuscript, Rev B). Read `design.md` in full before editing — it is binding. This task is specifically about **navigation and site structure**; do not change the visual system (palette §2, typography §3, layout §4) except where this task requires it.

## What changed and must be applied

The site is organized around the thesis loop, with unified vocabulary. Earlier drafts used inconsistent nav words (e.g. "Reading / Lessons / Shipments / Artifacts" in the header while the methodology block said "Read / Learn / Ship / Document"). **Unify everything to the four verbs.**

### 1. Navigation (every page)
- Nav order: **Home · Read · Learn · Ship · Document**
- Use these exact verb labels in the header nav, the footer, and any in-page methodology/thesis block. Remove all other vocabularies ("Reading", "Lessons", "Shipments", "Artifacts", etc.).
- Each of the four phases carries a quiet plain-language sub-label in Plex Mono, shown on hover (title attribute is not enough — use a visible small caption or a hover reveal): `Read → notes`, `Learn → essays`, `Ship → projects`, `Document → specs & artifacts`.
- **Ship is the visually heaviest nav item** (slightly stronger weight or a subtle marker per the palette — no new color) and is the default destination for any ambiguous entry point.

### 2. Section pages / routes
Create or rename pages so each phase has a real home:
- `index.html` — **Home**: literary landing (Level A), the thesis in prose, plus the flagship piece surfaced immediately (see §4 below).
- `read.html` — **Read**: reading log. List of books/papers, each with a short mono takeaway. Not a card grid — manuscript list rows with hairlines.
- `learn.html` — **Learn**: essays index. Includes the flagship as the lead entry.
- `ship.html` — **Ship**: projects / case studies index. This is the projects page. Entries link to individual case studies at Level B.
- `document.html` — **Document**: artifacts and specs. SRS excerpts, ADRs, runbooks, downloadable samples, teaching artifacts.

If routing is flat files, ensure the nav links resolve correctly across all pages.

### 3. Vocabulary sweep
Search the whole codebase for the old labels and replace: any "Reading" nav item → "Read", "Lessons" → "Learn", "Shipments" → "Ship", "Artifacts" (as a nav label) → "Document". Keep the word "artifacts" where it appears in body prose meaning evidence — only the **nav/section labels** are being unified.

### 4. Flagship piece (design.md §10.3)
The Arabic literary parable *رسالةٌ لا تصل / al-Buna* (encodes Byzantine fault tolerance across three narrator voices, with an interactive council simulation and a concept-mapping appendix) is a flagship. Apply:
- File it primarily under **Learn** as the lead entry, cross-linked from **Read** and **Document**.
- Surface it on **Home** as the flagship — a prominent prose lead-in with a link, not buried.
- Give it its own page template (Level A, bilingual): RTL Arabic set in **IBM Plex Sans Arabic** weighted equal to Latin; preserve the three-voice structure as a visible device; present the concept-mapping appendix as an oversized documentation footer.
- Any interactive element stays inside the palette and the forbidden-list: no color, no decoration, interaction is structural only.

## Hard constraints (unchanged, from design.md)
- Palette: neutral only, dual-mode, no accent unless a single link (design.md §2). Fonts: Newsreader + IBM Plex Mono + IBM Plex Sans Arabic (§3). Square corners, hairlines, asymmetric layout, no rounded cards (§4).
- Forbidden (§9): gradients, glassmorphism, glow, blur, 3D, stock/AI illustration, emoji, skills grids, progress bars, Inter/Poppins/Montserrat, centered symmetric layouts, a second accent.
- Keep the working light/dark toggle (`data-theme` swapping CSS variables).

## Deliverable
Apply the changes, then output a short list: (a) which files you created or renamed, (b) every place the vocabulary was unified, (c) how the flagship is surfaced on Home and Learn. Note anything in `design.md` you had to interpret because the spec was silent, and where you chose the quieter option.
