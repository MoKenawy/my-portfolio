---
name: portfolio-launch
description: Publish a reviewed portfolio built from this boilerplate to GitHub Pages under the client's own repository with fresh git history — repo creation, Pages setup, optional custom domain, and a live check under the real base path. Every outward-facing step is confirmed first. Phase 4 of new-portfolio. Use when asked to "launch the portfolio", "deploy the site", "publish to GitHub Pages", or "put it live".
---

# Portfolio launch

## Inputs
- portfolio-review gate passed.
- From `Docs/intake/05-look-and-structure.md`: GitHub account, repository name, user site vs. project site, custom domain.

## Base path by hosting choice
| Hosting | Repo name | URL | Base path |
|---|---|---|---|
| User/org site | `<user>.github.io` | `https://<user>.github.io` | empty |
| Project site | `<repo>` | `https://<user>.github.io/<repo>` | `/<repo>` |
| Custom domain | any | `https://<domain>` | empty |

`.github/workflows/nextjs.yml` reads the base path from the Pages setup step and passes it to the build as `BASE_PATH`; nothing to set by hand.

## Steps
Ask before each step marked **(confirm)**. Approval for one does not cover the next.

1. **Clean the working tree.**
   - Move `Docs/intake/` (and any other client files) out of the repo folder, or confirm they are git-ignored and will not be pushed: `git status --short --ignored`.
   - Make sure `site.url` in `src/config/site.ts` matches the final URL from the table.
   - Custom domain: create `public/CNAME` containing just the domain.
2. **Fresh history.** The client's repo must not carry this template's history.
   - Preferred: on GitHub, "Use this template" on the template repo → new repo in the client's account. Then push only the client's changes on top.
   - Without a template repo: `git checkout --orphan main-client`, `git add -A`, review `git status`, commit, and push that branch as `main` to the new repo.
   - Check before pushing: `git log --oneline` shows only the new commit(s).
3. **Create the repository (confirm).** Name per the table. `gh repo create <owner>/<name> --public --source . --remote client` only after the user confirms the owner, name and visibility.
4. **Push (confirm).** `git push client main-client:main` (or `main`). Show the user `git log --oneline -3` and `git status` first.
5. **Enable Pages (confirm).** Repo Settings → Pages → Source: **GitHub Actions**. Or: `gh api -X POST repos/<owner>/<name>/pages -f build_type=workflow`.
6. **Custom domain (confirm).** Tell the user the DNS records to add at their registrar (`A` or `ALIAS` records pointing to GitHub Pages for an apex domain, or a `CNAME` to `<user>.github.io` for a subdomain), then set the domain in Pages settings and enable "Enforce HTTPS" once the certificate is issued. Do not change DNS yourself.
7. **Watch the deploy.** `gh run list --workflow nextjs.yml --limit 1` and `gh run watch`. If it fails, read the log, fix, and push again (confirm).
8. **Live check.** Fetch the live URL: the home page loads, CSS and images load (paths carry the base path), every nav link, `/projects`, project images and the contact link work.

## Gate
The live URL serves the site and every link works under the live base path.

## Hand-off
Set Launch to "passed" in `Docs/intake/STATUS.md` with the live URL. Tell the user:
- the URL, and where to edit content later (`src/config/site.ts`, `src/content/*`);
- that `Docs/intake/` holds the client's personal data and should be archived outside the repo or deleted.
