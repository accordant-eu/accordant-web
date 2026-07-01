# Architecture & Development Rules — accordant.eu

This document captures the critical architectural decisions and gotchas for the Eleventy-based site.

## 1. Insight Articles (src/insights/*.md)

### How to add a new insight article

1. Create a new `.md` file in `src/insights/` with a date-prefixed filename, e.g. `2026-06-20-my-article.md`.
2. Front matter **must** include at minimum:
   ```yaml
   ---
   title: "My Article Title"
   date: 2026-06-20
   ---
   ```
3. Do **not** set `layout` or `permalink` in the front matter — they are computed automatically.
4. The article will automatically appear in the insights collection and be published at `/insights/<slug>/`.

### Critical Rule: eleventyComputed must always return fallbacks

The site uses `eleventyComputed` in `.eleventy.js` to force insight articles to use the `article.njk` layout and clean permalinks.

**Any computed function that conditionally overrides a value MUST return the original front-matter value as a fallback.**

```javascript
eleventyConfig.addGlobalData("eleventyComputed", {
  permalink: (data) => {
    if (data.page.inputPath.includes("/src/insights/")) {
      const slug = data.page.fileSlug;
      return `/insights/${slug}/`;
    }
    return data.permalink;   // ← REQUIRED fallback
  },
  layout: (data) => {
    if (data.page.inputPath.includes("/src/insights/")) {
      return "article.njk";
    }
    return data.layout;      // ← REQUIRED fallback
  }
});
```

**Why this matters**

- If a computed function returns `undefined` (implicit return), Eleventy treats it as an override and **strips** the original front-matter value.
- `src/index.njk` (and any other non-insight page) declares `layout: base.njk`.
- Without the fallback, the layout is silently removed and the page renders as raw content (starting with `<!-- Hero -->`).
- This is exactly what caused the production 404 / broken site in June 2026.

**Never** write an `eleventyComputed` block that only returns a value inside an `if` without an explicit fallback return.

## 2. Layouts

- `base.njk` — full site wrapper (`<!DOCTYPE>`, `<head>`, nav, footer). Used by the homepage and most pages.
- `article.njk` — article-specific wrapper. Used automatically for everything in `src/insights/`.

## 3. Directory Structure

```
src/
├── index.njk                 # Homepage (extends base.njk)
├── insights/
│   ├── *.md                  # Insight articles (auto-wrapped with article.njk)
│   └── README.md             # Excluded from collection
_includes/
├── base.njk
└── article.njk
.eleventy.js                  # Critical: contains eleventyComputed with fallbacks
```

## 4. Deployment

- Self-hosted runner on `srv1055555`.
- Workflow: `.github/workflows/deploy.yml`
- Verification step enforces that `_site/index.html` starts with `<!DOCTYPE html>` and contains the Case study section.
- Never manually overwrite `_site/`. All changes must come through a successful workflow run.

## 5. When modifying .eleventy.js

- Always test locally with `npx @11ty/eleventy` and verify `head -5 _site/index.html` starts with `<!DOCTYPE html>`.
- Any change to `eleventyComputed` must preserve the fallback pattern described above.
- After any change, push and monitor the GitHub Actions run until the verification step passes.
