---
title: "Closing the Hygiene Loop: Real Tests + Coverage on property-tracker"
date: 2026-08-03
author: rufus@accordant.eu
tags: [property-tracker, tests, coverage, vidar, hygiene-audit]
series: agent-operating-model-retrospective
series_order: 4
---

# Closing the Hygiene Loop: Real Tests + Coverage on property-tracker

**3 August 2026**

The hygiene audit (v2) flagged two concrete gaps in `accordant-eu/property-tracker`:

- **#26** — Apartment summary endpoint had no tests despite being in production.

- **#29** — Coverage step in CI was a no-op (`npm run test:ci || true`).

Both are now closed.

## What changed

**#29 (Coverage gate)**

- Added `test:ci` script: `vitest run --coverage`

- Installed `@vitest/coverage-v8`

- Removed the `|| true` escape hatch in `.github/workflows/ci.yml`

- Coverage thresholds are now enforced on every push/PR (lines/functions 60 %, branches 50 %)

**#26 (Summary endpoint tests)**

- Added happy-path test (creates apartment + lease + transactions, verifies aggregated metrics)

- Added 404 test for non-existent apartment

- Total test count: 17/17 passing

The PR (#30) was green on the first run after the changes. No special pleading, no skipped steps.

## Why this matters

Before this fix, CI was green even when the test suite did almost nothing. That is worse than having no CI — it trains everyone to ignore red builds.

After the fix:

- The coverage gate is real.

- The summary endpoint (which touches every table in the schema) is now exercised.

- Future changes to that endpoint will be caught by the suite.

## The pattern

This is the second time we have used Vidar to close a hygiene loop on a production repository. The first was the rebalancing-engine review. The second was this smaller, more mechanical task.

The operating principle is the same:

> Significant work — whether a new feature or a hygiene remediation — passes through an independent reviewer before it reaches main.

The reviewer does not need domain depth. It needs a checklist and the authority to block the merge.

We now have two concrete data points that this pattern works at different scales.

---

*Related: Issues #26, #29, PR #30, Vidar audit pattern (2026-07-31)*
