# Personal Brand Guidelines
## "Manuscript" — Standing Out in the AI-Applicant Flood

**Revision:** B · July 2026 (visual system now Manuscript; see `design.md` Rev B)
**Scope:** Portfolio site, case studies, CV, LinkedIn, GitHub, teaching content, DMS marketing material.
**Audiences:** (1) Employers and senior engineers — career growth. (2) Freelance and enterprise clients in Egypt and the Gulf — the DMS market.

---

## 1. Purpose and governing principle

The market is flooded with applicants whose portfolios, CVs, and websites were generated or heavily polished by AI. That output has a recognizable fingerprint: smooth, symmetric, adjective-heavy, failure-free, and visually templated. The purpose of this brand is to be unmistakably human by being **specific, asymmetric, and costly to fake**.

**Governing principle:** *Publish only what actually happened, at the resolution it happened, with the evidence it produced.* Do not perform imperfection or invent mess — authenticity is a byproduct of accuracy, not a style to imitate.

**Brand essence:** an early-career systems engineer who turns undocumented, high-constraint environments into documented, auditable, durable systems.

**Tagline:** *Building systems that outlive their builders.*
**Internal motto (About-page hook, never a headline):** *No, not good enough — yet.*

**Brand pillars.** Every published piece must map to at least one:

1. Systems over snippets — schemas, ledgers, queues, failure modes; not code screenshots.
2. The next person starts from one, not zero — documentation and maintainability as a moral stance.
3. Constraints as design fuel — air-gapped, RTL, legacy, migration-heavy environments.
4. Learning in public, teaching in Arabic.

---

## 2. Writing rules

The strongest AI tell is language, not layout. These rules apply to every sentence published under this brand.

### 2.1 Voice

Calm, precise, slightly literary. First person. Short declarative sentences. At most one metaphor or literary turn per section. The five-year retrospective document is the reference standard for this voice — when in doubt, read a paragraph of it and match the register.

Never use hype language: no "thrilled to announce," no rocket emoji, no "passionate about leveraging," no "seamless," "cutting-edge," "empower," or "unlock." Never open with "In today's fast-paced world" or any variant. These phrases are the statistical center of AI-generated text; using them dissolves the brand instantly.

### 2.2 Lead with paid lessons

Every case study must contain at least one thing that went wrong and what it cost. AI-polished portfolios never volunteer a failure; a specific, priced mistake is the single most credible sentence a portfolio can contain.

**Reference example:** "The first lesson we paid for: data migrations cost more than you think — it might have been better to start from the application layer."

The failure must be real, must have a stated cost (time, rework, a redesigned schema), and must end with what changed as a result. A failure without a consequence is confession; a failure with a consequence is engineering.

### 2.3 Rough numbers over round ones

Marketing-round figures ("improved efficiency by 40%") read as generated. Prefer figures with texture: "migrated 14 of 23 tables before hitting the encoding wall," "rewrote the permission model twice, roughly nine days." If a number was never measured, do not state one — describe the observable effect instead.

### 2.4 No perfect parallelism

AI output produces bullet lists where every item has identical grammatical structure and length. Vary sentence length deliberately. Prefer prose paragraphs over bullets in case studies; reserve lists for genuinely enumerable content (steps, requirements). When a list is unavoidable, let items breathe at different lengths.

### 2.5 Bilingual by design

Write Arabic-first for the DMS and Gulf-facing material; English-first for the international career material. Arabic technical writing about on-premises, air-gapped archival is nearly uncontested territory and is itself a differentiation signal — the AI-applicant flood writes in English. Never machine-translate one language into the other and publish the result unedited; each version should read as originally written.

### 2.6 Own the AI use explicitly

Do not hide the use of coding agents — concealment makes the work look like everyone else's. State the actual workflow: *"I write the SRS and the ADRs, then direct coding agents against them."* This positions authorship above the tools, and the SRS itself is the proof. The claim must always be paired with the visible artifact (an SRS excerpt, an ADR file in a public repo).

### 2.7 Experience framing

Current industry experience is approximately six months. The brand sells trajectory and depth of thinking, never seniority. Permitted framings: "early-career," "backend engineer," the five-year narrative arc. Forbidden framings: "senior," "expert," years-of-experience inflation, or any title the CV cannot defend in an interview.

---

## 3. Evidence rules (the proof-artifact library)

Artifacts are the moat: they are things an AI cannot produce and a template cannot contain. Maintain a library and thread at least one artifact through every case study.

**Approved artifact classes:**

1. Photographs of handwritten notes, GTD lists, and whiteboard schemas (including the archive-era material where publishable).
2. Video snippets of live teaching — these are among the strongest possible proofs; a person explaining a concept in real time cannot be generated retroactively. Publish with minimal editing; do not over-produce.
3. Screenshots of real git history, ADR files, and commit messages from public repositories.
4. Redacted excerpts of the actual DMS SRS and design models.
5. Photographs or screen recordings of the RTL Arabic interface running on real hardware.
6. The exemplary-conduct discharge rating, framed as a trust signal for government and enterprise clients.

**Handling rules:** artifacts appear as figures in hairline or dashed frames with mono-font captions ("fig. 3 — whiteboard schema, second attempt"). Photographs are never replaced with illustrations or AI-generated imagery. Redact anything sensitive (names, unit identifiers, internal data) before publication; when in doubt about military-adjacent material, omit it. Low production quality in photos and videos is acceptable and even desirable; fabricated "candid" staging is not.

**Repository rule:** at least two GitHub repositories must be maintained at public-portfolio quality — meaningful commit history, ADRs in-tree, a README written in the brand voice. Commit history is the most independently verifiable artifact the brand has.

---

## 4. Visual rules

**Aesthetic name:** Manuscript. A literary, type-and-space visual language that foregrounds the one asset hardest to fake — a real writing voice — set in strict neutral color. The full specification lives in `design.md` (Rev B); this section is the summary. Where the two ever diverge, `design.md` governs the visual system and this document governs the writing and evidence rules.

### 4.1 Palette

Strict neutral, two modes, one identity. No hue is ever introduced beyond a single optional accent (off by default).

| Role | Light mode | Dark mode |
|---|---|---|
| Ink / Paper (primary text, headings, rules) | `#1A1712` (warm near-black) | `#F5F2EA` |
| Ground (page background) | `#F5F2EA` (ivory manuscript paper) | `#0A0A0A` |
| Mid (secondary text, metadata) | `#5C5344` | `#AAAAAA` |
| Hairline (dividers, spec rules) | `#C4BAA6` | `#333333` |
| Clinical alternates (CV, dense specs) | ink `#0A0A0A` on ground `#FAFAFA` | inverted |

Optional single accent (oxblood `#791F1F`, signal-green `#0A7D3A`, or amber `#EF9F27`) is off by default and, if used, appears once per view like a reviewer's pen — never a background. The only earned exception is the diff body treatment, where −/+ may be colored semantically.

### 4.2 Typography

The pairing is the visual thesis: a literary serif for prose (the reader who learned) against a mechanical mono for the technical layer (the engineer who shipped and documented). **Newsreader** for headings and body prose, with its true italics carrying the voice (*no, not good enough — yet*); **IBM Plex Mono** for metadata, spec strips, revision marks, and code; **IBM Plex Sans Arabic** for all Arabic, weighted equal to Latin. Plex Sans appears only for dense scannable bodies (the CV). Two weights (400/500), sentence case, no 600/700.

### 4.3 Layout

Pages open like a page of a book or a serious essay — never a hero section. A serif title with an optional italic subtitle and a mono metadata line above it; a short hairline rule as a manuscript flourish. Prose is the primary surface, with generous measure and leading. A narrow right-hand margin, set in mono, carries the reading trail. Every case-study page closes on a mono documentation footer naming what was left behind. Asymmetry is required; corners are square; no rounded cards.

### 4.4 The thesis as structure

The read → learn → ship → document loop is enacted, not asserted: **read** in the margin (the book worked through alongside the problem), **learn** beneath it (the distilled lesson), **ship** in the prose body (the work, leading with the lesson paid for), **document** in the footer (the ADR, runbook, README). Inside the "ship" body, one domain-specific treatment may be used — ledger for fintech, diff for migrations, spec→implementation for the DMS, postmortem where failure is the frame, plain prose for computer vision and teaching. Do not stack treatments.

### 4.5 Intensity by surface

The manuscript world runs at three intensities; match intensity to purpose rather than applying one globally. **Level A (fully literary)** — all prose, reads as an essay — for About, teaching, and essays. **Level B (hybrid)** — prose plus a mono spec-strip of scannable facts — the default for case studies. **Level C (light layer)** — serif headings, sans body — for the CV, dense DMS sheets, and anything ultra-scannable. Full mode-and-intensity mapping is in `design.md` §7.

### 4.6 Forbidden (the template fingerprint)

No gradients, glassmorphism, neon, glow, blur, or 3D renders. No dark-gradient hero with "Hi, I'm ___". No skills grids with progress bars. No stock or AI-generated illustration of any kind. No Inter, Poppins, or Montserrat. No emoji in any published material. No color beyond the single optional accent, and never a second accent. No rounded cards. No perfectly centered, symmetric layouts.

---

## 5. Application by audience

**Career growth (employers, senior engineers).** English-first. Lead with paid-lesson case studies: the Access-to-web migration, the deterministic payroll engine, chaos testing the reporting subsystem. GitHub is the primary destination; the portfolio site routes to it. Site and GitHub run dark mode; case studies at Level B (prose + spec-strip). LinkedIn headline: "Backend engineer — payroll, migrations, and systems that outlive their builders."

**DMS market (Egypt and Gulf clients).** Arabic-first pages. On-premises, air-gapped, and compliance language in the opening paragraph, not buried. The SRS excerpt offered as a downloadable sample — for this buyer, the documentation is the product demo. Direct contact channels (phone, WhatsApp) visible. The technical-proposal page format is the pitch itself.

**Teaching content.** Arabic-first. Raw teaching video snippets as proof artifacts; course material typeset in the same manuscript system (light mode, Level A) so the teaching brand and engineering brand are visibly one person.

---

## 6. Pre-publication checklist

Before anything ships under this brand, verify:

1. Does it map to at least one brand pillar?
2. Does it contain at least one specific, priced lesson or constraint (case studies)?
3. Does it contain at least one real artifact (photo, video, repo link, document excerpt)?
4. Is every number either measured-and-textured or absent?
5. Would the five-year document's author recognize the voice? (No hype vocabulary, no perfect parallelism, one literary turn maximum.)
6. Does it survive the visual forbidden-list in §4.5?
7. Is the experience framing honest (§2.7)?
8. If Arabic and English versions exist, does each read as originally written?

If any answer is no, revise before publishing.

---

*Rev B — visual system aligned to Manuscript (`design.md` Rev B). To be revised after the first flagship case study (payroll ledger, or DMS spec→implementation) ships in Level B.*
