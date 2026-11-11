---
name: new-portfolio
description: Build a complete portfolio for a new owner (client) from this boilerplate, end to end — gather information with the intake questionnaires, turn the answers into the site's data files, review for privacy and quality, then launch on GitHub Pages. Orchestrates portfolio-intake, portfolio-build, portfolio-review and portfolio-launch, and resumes an unfinished run. Use when asked to "make a new portfolio", "set up a portfolio for <client>", "start a portfolio from this template", or "continue the portfolio".
---

# New portfolio

Runs four phases in order. Each phase ends with a gate; the next phase starts only when the gate passes.

| Phase | Skill | Gate |
|---|---|---|
| 1. Intake | `portfolio-intake` | Required intake fields filled in `Docs/intake/` |
| 2. Build | `portfolio-build` | Lint, typecheck and build pass, with and without a base path |
| 3. Review | `portfolio-review` | No placeholder residue, nothing private, every link works |
| 4. Launch | `portfolio-launch` | The live URL loads and its links work |

## When to use
- A new owner wants their own site from this template.
- A previous run stopped part-way (`Docs/intake/STATUS.md` exists).

## When not to use
- Changing the template itself (components, design system). Edit the code directly.
- One small content edit on a finished site. Edit `src/config/site.ts` or `src/content/*` directly.

## Steps
1. **Check for a run in progress.** If `Docs/intake/STATUS.md` exists, read it, tell the user which phase it is at and what is open, and continue from there. Do not start over or overwrite `Docs/intake/` without asking.
2. **Otherwise start fresh.** Create `Docs/intake/STATUS.md` from the template below.
3. **Run each phase** by invoking its skill. After each one, update STATUS.md: phase, gate result, open `[TODO]`s, decisions taken.
4. **Stop at a failed gate.** Report what is missing and what the user or client must supply. Do not push past it.
5. **Finish** with a short summary: the live URL, what remains `[TODO]`, and a reminder that `Docs/intake/` holds personal data and must not be committed.

## STATUS.md template
```markdown
# Portfolio run — <client name>
Started: <date>   Last update: <date>

| Phase | State | Notes |
|---|---|---|
| Intake | not started / in progress / passed | |
| Build | | |
| Review | | |
| Launch | | |

## Open gaps
- [TODO] ...

## Decisions
- ...
```

## Ground rules for every phase
- `Docs/` is git-ignored; filled answers live in `Docs/intake/`. The blank templates in `intake/` are never edited.
- Nothing on the site may be invented. Every claim, number, date, employer and link traces back to a line in `Docs/intake/`.
- Creating a repo, pushing, enabling Pages or changing DNS are outward-facing: ask before each one.
