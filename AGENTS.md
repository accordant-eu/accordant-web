# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Antigravity, Cursor and others) working
on accordant-web. `CLAUDE.md` only points here.

## What this is

The public website accordant.eu, built with Eleventy 3 (Nunjucks templates, Markdown
insight articles). This repository is **public**.

- `src/`: the Eleventy input. `src/index.njk` is the home page; `src/insights/*.md` are the
  insight articles.
- `_includes/`: layouts and partials. `style.css` and `robots.txt` are copied as-is.
- `.eleventy.js`: collections, filters and the computed permalink/layout for insights.
- `docs/ARCHITECTURE.md`: architecture rules and gotchas. **Read it before changing
  `.eleventy.js` or adding an article.**
- `_site/`: build output (ignored).

## Build and check

```bash
npm ci
npx @11ty/eleventy          # builds into _site/
npx @11ty/eleventy --serve  # local preview
```

The deploy workflow fails if `_site/index.html` lacks `<!DOCTYPE html>` or the case-study
section, so check both after changing the home page or layouts.

## Rules

- **Every merge to `main` deploys the live site.** Open a PR for every change, but don't merge
  without the owner's OK on the content. New content starts as an internal-only draft.
- Never commit client names, personal data, internal documents, hostnames, IPs or secrets.
- Insight articles: date-prefixed filename, front matter with at least `title` and `date`, no
  `layout` or `permalink` (they are computed). See `docs/ARCHITECTURE.md`.
- Commit messages follow Conventional Commits: `type(scope): description`.
- Work on a branch named after your tool (`claude/…`, `codex/…`, `cursor/…`, `antigravity/…`).
