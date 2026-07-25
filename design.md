# Design Specification — Manuscript
## Personal brand visual system · read → learn → ship → document

**Revision:** B · July 2026
**Supersedes:** Rev A (true-neutral / ledger). The neutral palettes carry over unchanged; the governing world is now Manuscript, and the ledger is demoted to one optional body treatment among several.
**Governing world:** Manuscript — a literary, type-and-space aesthetic that foregrounds the one asset hardest to fake: a real writing voice.
**Through-line:** you don't ship code, you ship understanding made durable — read deeply, learn continuously, and leave behind software the next person can inherit.

---

## 1. Principle

The brand exists to stand apart from the flood of AI-generated portfolios, whose fingerprint is smooth, symmetric, adjective-heavy, failure-free, and templated. Manuscript answers this with sustained personal prose and a real reading trail — both close to un-generatable. Color stays strictly neutral because color is what generated work over-produces; the world's character comes from typography, whitespace, and voice, not decoration or hue.

**Governing rule:** publish only what actually happened, at the resolution it happened, with the evidence it produced. Authenticity is a byproduct of accuracy, never a style to imitate.

**The thesis as a loop:** read → learn → ship → document → read. Reading feeds learning, learning feeds the work, and the work is only "done" when documented well enough to outlive its author. Each value owns a structural position on the page (§5), so all three are load-bearing rather than asserted.

---

## 2. Color

Two modes, one identity. Strict neutral; no hue is ever introduced. The only permitted non-neutral is a single optional accent (§2.3), off by default. Since the palette is monochrome, dark mode is a near-mechanical inversion of light — the two stay in lockstep.

### 2.1 Light-dominant — print, CV, DMS, teaching, About

| Role | Value | Usage |
|---|---|---|
| Ink | `#1A1712` | Primary text, headings, rules (warm near-black to suit the serif) |
| Neutral ink (alt) | `#0A0A0A` | Primary text where a cooler, more clinical read is wanted (CV, spec sheets) |
| Mid | `#5C5344` / `#666666` | Secondary text, metadata, captions |
| Hairline | `#C4BAA6` / `#CCCCCC` | Section dividers, spec-strip rules |
| Ground | `#F5F2EA` | Page background (ivory — the manuscript paper) |
| Ground (alt) | `#FAFAFA` | Cooler ground for ultra-scannable surfaces (CV, dense specs) |

The ivory ground (`#F5F2EA`) is the default manuscript surface; the cooler `#FAFAFA` is used only where a page must read as a clinical document rather than an essay. Character: paper warmth without color — softer and more human than pure neutral, which is what the serif world wants.

### 2.2 Dark-dominant — site, GitHub, LinkedIn, dev surfaces

| Role | Value | Usage |
|---|---|---|
| Paper | `#F5F2EA` / `#FAFAFA` | Primary text, headings, rules |
| Mid | `#AAAAAA` | Secondary text, metadata |
| Hairline | `#333333` / `#444444` | Dividers, spec-strip rules |
| Ground | `#0A0A0A` | Page background |

Character: a well-set reading app after dark — engineer-native, current, no gradients or glow. The serif still leads; the darkness reads as a night-mode book, not a terminal.

### 2.3 Optional single accent

Off by default. If used: exactly one accent, once per view, like a reviewer's pen — never a background or large fill. Candidates in order: oxblood `#791F1F`, signal-green `#0A7D3A`, amber `#EF9F27`. Avoid default orange on dark. Reserve for a single active link, one em-dash mark, or one status stamp. In the "diff" body treatment (§5, treatment J) the accent is permitted semantically (−/+) — that is its one earned exception.

### 2.4 Contrast

Both modes clear WCAG AA for body text. Metadata (Mid role) is the lightest text permitted and never drops below AA at 12px.

---

## 3. Typography

The manuscript world lives or dies on the serif. The pairing is deliberate: a literary serif for prose (the human who read and learned) against a mechanical mono for the technical layer (the engineer who shipped and documented). That contrast is the visual thesis.

| Element | Font | Treatment |
|---|---|---|
| Headings, project titles, body prose | **Newsreader** (editorial serif, high-contrast, real italics) | Sentence case; medium (500) for headings, regular (400) for body |
| Italic voice — mottos, asides, book titles | Newsreader italic | e.g. *no, not good enough — yet* |
| Metadata, spec strips, revision marks, code | **IBM Plex Mono** | 10–12px, letter-spacing 0.1em, Mid color |
| Scannable facts / spec blocks | Plex Mono | Tabular where numeric |
| UI chrome, dense CV body (Level C) | **IBM Plex Sans** | Regular; used only where prose would be too slow to scan |
| Arabic (all) | **IBM Plex Sans Arabic** | RTL, weighted equal to Latin |

Newsreader is free, screen-optimized, and has true italics, which the brand's literary voice relies on. Body prose in Newsreader runs 16px / line-height 1.75. Two weights only (400/500); never 600/700. Sentence case everywhere except short mono metadata labels, where caps + letter-spacing act as column headers.

Rules that survive from the writing guidelines: no hype vocabulary; no perfect parallelism; at most one metaphor per section; lead with the lesson paid for; rough numbers over round ones; Arabic written natively, never machine-translated.

---

## 4. Layout

Pages open like a page of a book or a serious essay — never a hero section.

- **Title:** serif project title, optional italic subtitle beneath, a mono metadata line above (case number, phase, revision). A short hairline rule (~44px) under the title as a manuscript flourish.
- **Prose column** is the primary surface. Generous measure and leading; whitespace is the container, not cards.
- **Reading margin:** a narrow right-hand column in mono for what was read alongside the work (§5). Asymmetric by design.
- **Documentation footer:** every case-study page closes on a mono line naming what was left behind (ADR, runbook, README). This is where "documented software, not just code" becomes the literal last thing the reader sees.
- **Square corners**, hairline rules, no rounded cards, no single-sided rounded borders.

---

## 5. The thesis as structure (read → learn → ship → document)

Each value occupies a fixed position, so the page *enacts* the loop rather than claiming it.

- **Read** → the margin. A mono note names the book/paper worked through alongside the problem (e.g. *DDIA ch.11 — streams & queues*). This is the reading trail an AI portfolio cannot fabricate.
- **Learn** → beneath the margin note. The distilled lesson in a few mono words (e.g. *idempotency isn't free*).
- **Ship** → the prose body. The work itself, told as narrative, leading with the lesson paid for.
- **Document** → the footer. The artifacts left behind, named explicitly.

### Body treatments (per-domain, inside the "ship" phase)

The prose body can take a domain-specific inner structure. Pick one per case study; do not stack them:

- **Ledger** (fintech: payroll, double-entry) — claim/proof balance line; "Dr claims · Cr proof."
- **Diff** (migrations) — before/after with the one permitted semantic accent (−/+).
- **Spec → implementation** (DMS) — REQ-IDs traced from SRS to shipped code; doubles as the answer to "did AI write this?"
- **Postmortem** (any) — what broke / cost / fix, when failure is the strongest frame.
- **Plain prose** (computer vision, teaching) — no inner structure; the narrative carries it.

---

## 6. Intensity by surface (how literary to go)

The manuscript world runs at three intensities. Match the intensity to what the surface must do — do not apply one level globally.

| Level | Treatment | Use on |
|---|---|---|
| **A · Fully literary** | Everything is Newsreader prose; reads as an essay. Most distinctive, most voice-forward. Skimmers must read to find facts. | About page, teaching material, essays, learning-in-public posts |
| **B · Hybrid** | Prose carries the story; a mono spec-strip underneath carries scannable facts (stack, paid-for lesson, documented artifacts). Serves the reader and the recruiter at once. | Case studies (the default), flagship project pages |
| **C · Light layer** | Serif headings, sans body, mono metadata. A literary touch over the neutral base; safest and most scannable. | One-page CV, dense DMS spec sheets, anything ultra-scannable |

Level B is the workhorse and the truest expression of the thesis (serif voice + mono proof in one artifact). A is for surfaces where reading is the point; C is the fallback where speed of scan outranks distinctiveness.

---

## 7. Mode + intensity by surface (combined)

| Surface | Mode | Intensity |
|---|---|---|
| Personal site (home / About) | Dark | A |
| Case studies | Dark or light | B |
| GitHub profile / READMEs | Dark | B or C |
| Teaching material | Light | A |
| Essays / learning-in-public | Light or dark | A |
| CV / résumé | Light | C |
| DMS proposals (Egypt/Gulf) | Light | B (spec-heavy) or C |
| LinkedIn banner | Dark | C (short) |

---

## 8. Imagery and evidence

Photographs and scans only — never illustration, never AI-generated imagery. Figures sit in hairline or dashed frames with mono captions (*fig. 1 — …*). Approved artifacts: handwritten notes and whiteboard schemas; teaching-video snippets (among the strongest possible proofs); real git history and ADR files; redacted SRS excerpts; the RTL Arabic interface on real hardware; the exemplary-conduct discharge rating. Low production quality is acceptable and often desirable; staged "candid" fabrication is not. Redact sensitive material; when in doubt about military-adjacent content, omit it.

---

## 9. Forbidden (the template fingerprint)

No gradients, glassmorphism, glow, neon, blur, or 3D. No dark-gradient hero with "Hi, I'm ___". No skills grids or progress bars. No stock or generated illustration. No Inter, Poppins, or Montserrat. No emoji. No color beyond the single optional accent — and never a second accent (if a design "needs" one, the layout is wrong). No rounded cards. No perfectly centered, symmetric layouts. No hype vocabulary ("seamless," "leverage," "passionate about," "thrilled to announce").

---

## 10. Site information architecture

The site is organized around the thesis loop, not around generic portfolio tabs. Five destinations: **Home**, plus the four phases **Read · Learn · Ship · Document**. Vocabulary is unified — the nav, the home-page methodology block, and every phase label use the same four verbs, never a parallel set (no "Reading / Lessons / Shipments / Artifacts").

### 10.1 Navigation

Nav order: Home · Read · Learn · Ship · Document. Each phase carries a quiet plain-language sub-label (mono, on hover or as a small caption beneath) so a first-time visitor isn't left guessing what "Ship" means: `Read → notes`, `Learn → essays`, `Ship → projects`, `Document → specs & artifacts`. **Ship is the visually heaviest nav item and the default destination** if a visitor is unsure — the engineering case must never be subordinate to the literary one.

### 10.2 What each section holds

| Nav | Contains | Primary audience |
|---|---|---|
| **Home** | Literary landing (Level A). The thesis in prose, and the flagship piece surfaced immediately. | Everyone |
| **Read** | Reading log — books and papers worked through, each with a short takeaway (DDIA, distributed-systems theory, targeted reading). The continuous-learning proof. | Teaching; depth-signalling |
| **Learn** | Essays and learning-in-public — longer-form writing that thinks through a problem. The un-fakeable voice layer. Home of flagship writing. | The layer that resists generation |
| **Ship** | Projects / case studies — DMS, payroll engine, Drive-Wise, reporting subsystem. This *is* the projects page, renamed. Case studies at Level B. | Career growth + DMS clients (primary) |
| **Document** | Artifacts and specs — SRS excerpts, ADRs, runbooks, the exemplary-conduct rating, downloadable samples, and teaching artifacts. | DMS procurement especially |

"Ship" resolves the "where do projects live" problem: projects are filed by the phase that produced them, and every content type a recruiter or client looks for still has a navigable home.

### 10.3 Flagship pieces

Some artifacts span multiple phases and earn a bespoke page rather than a list entry. The reference case is *رسالةٌ لا تصل / al-Buna* — an Arabic literary parable that encodes Byzantine fault tolerance (Two Generals, the n > 3f bound, crash vs. Byzantine faults) across three narrator voices, with an interactive council simulation and an appendix mapping every story symbol to its distributed-systems concept.

It is filed primarily under **Learn** (essay-as-teaching), cross-linked from **Read** (the theory it draws on) and **Document** (its appendix is documentation-as-teaching), and **surfaced on Home as the flagship** — it is the fastest way for any visitor to grasp the whole identity at once, and the single strongest anti-AI artifact in the brand, being un-generatable by construction.

Flagship page treatment: its own template, Level A, bilingual (RTL Arabic set in Plex Sans Arabic, weighted equal to Latin), the three-voice structure preserved as a visible device, and the concept-mapping appendix presented as a documentation footer writ large. Interactive elements stay within the palette and forbidden-list — no color, no decoration; the interaction is structural, not ornamental.

**Positioning caution:** flagship literary work pulls the brand toward "systems-thinker who writes" and slightly away from "full-stack engineer who ships." For DMS/Gulf clients this is pure upside (rare depth, Arabic fluency). For a fast-skimming recruiter it risks reading as impressive-but-impractical — so recruiters are led with **Ship**, and the flagship is what makes them reconsider once engaged, never the first thing a job-filter skim meets.

---

## 11. Caveats

Manuscript leans hardest on the writing voice — it only works if the prose is genuinely yours and genuinely good; thin content is more exposed here than anywhere. Level A must never be used where a reader needs facts in seconds. The ledger and other body treatments fit their domains and feel forced outside them — match the treatment to the project. Strict monochrome and sustained prose both reward a real evidence library and punish its absence; the system is only as strong as the artifacts behind it.

---

## 12. Implementation notes

Build in HTML/CSS with real fonts: Newsreader (Google Fonts), IBM Plex Mono and Plex Sans Arabic (Google Fonts / self-hosted). Treat any image-model output as mood reference only — the serif/mono contrast, italics, and Arabic must render correctly. Ship light and dark as one stylesheet with a mode toggle; the monochrome palette makes dark a near-mechanical inversion (swap Ink↔Paper, keep Ground logic, adjust Hairline). Keep the accent as a single CSS variable, unset by default. Set body measure for readability (~66–75 characters) since prose is the primary surface.

---

*Rev B — to be revised after the first flagship case study (payroll ledger, or DMS spec→implementation) ships in Level B.*
