---
name: portfolio-intake
description: Gather everything needed for a new portfolio by interviewing the owner (client) with the questionnaires in intake/, filling copies in the git-ignored Docs/intake/ folder. Pre-fills from a CV or LinkedIn export when given one, records the client's own words, never invents facts, and checks the required fields before handing over to portfolio-build. Phase 1 of new-portfolio. Use when asked to "gather the client's information", "fill the intake", "interview the client", or "start the portfolio intake".
---

# Portfolio intake

## Inputs
- The blank templates: `intake/01-about-me.md` … `intake/06-assets.md` (index in `intake/README.md`).
- Anything the client already has: CV (PDF), LinkedIn export, an old site, project READMEs, write-ups.

## Steps
1. **Copy, never edit the templates.** Create `Docs/intake/` and copy `intake/01-*.md` … `intake/06-*.md` into it. Work only on the copies. Confirm with `git check-ignore -v Docs/intake/01-about-me.md` that they are ignored.
2. **Ask for existing material first.** "Do you have a CV, a LinkedIn profile export, an old site, or project write-ups?" Read whatever is given and pre-fill the copies. Mark every pre-filled line `(from CV — confirm)` (or the actual source).
3. **Interview one file at a time, 01 → 06.** For each file:
   - Show the client the questions for one section at a time, not the whole file.
   - **Closed choices go through AskUserQuestion**: audience, default mode, accent, fonts, languages, hosting, domain, "can this project be shown publicly?", logo vs. initials. Put the template default first.
   - **Story questions are asked in plain text**: timeline, problem, insight, proof, voice. Ask one follow-up when an answer is vague:
     - a claim with no proof → "What could a stranger open or run to check that?"
     - a success with no cost → "What went wrong, or what did it cost you?"
     - a round number → "What is the real, rough figure?"
   - Confirm every `(from … — confirm)` line, then remove the marker.
4. **Record, don't edit.** Put the client's answers in their own words. Tightening the prose is portfolio-build's job.
5. **Unknowns** become `[TODO: what is missing]`, never a guess. "skip" means the section is intentionally empty.
6. **Privacy notes.** For each project, fill "Can this be shown publicly?". List anything that must not appear (employer names, internal URLs, colleagues, data) in a `## Do not publish` section at the end of `Docs/intake/03-projects.md`. portfolio-review greps for these.
7. **Assets.** Ask where the files are. Copy received files into `Docs/intake/assets/` (still ignored), and tick them in `06-assets.md`.
8. Update `Docs/intake/STATUS.md` with the open `[TODO]`s.

## Rules
- Never invent a fact, number, employer, date, title or link.
- Never copy client answers anywhere outside `Docs/` during this phase.
- If the client gives information for a later file, file it there; don't make them repeat it.

## Gate
These must be filled (not `[TODO]`, not empty) before portfolio-build starts:

| File | Required |
|---|---|
| 01 | Full name, role, one-sentence description, a public contact method |
| 03 | At least one project with problem, what I built, and the proof; its public/private answer |
| 04 | At least one audience row; the voice section |
| 05 | Hosting: where, domain, repository name |

Report the gate as a table (field → filled / missing). If it fails, list exactly what the client must provide and stop.

## Hand-off
Gate passed → set Intake to "passed" in STATUS.md and invoke `portfolio-build`.
