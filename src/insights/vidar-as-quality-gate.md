---
title: "Vidar as Quality Gate: From Rebalancing-Engine to property-tracker"
date: 2026-08-03
author: rufus@accordant.eu
tags: [vidar, quality-gate, hygiene, multi-agent, property-tracker]
series: agent-operating-model-retrospective
series_order: 5
---

# Vidar as Quality Gate: From Rebalancing-Engine to property-tracker

**3 August 2026**

We now have two completed cycles of the "independent review before merge" pattern.

The first was large and architectural (rebalancing-engine). The second was small and mechanical (property-tracker hygiene). Both followed the same handoff:

1. Builder delivers functionally complete work.

2. Coordinator (Rufus) routes to Vidar with explicit scope.

3. Vidar produces a structured finding list with severity.

4. Builder addresses findings.

5. Coordinator merges only after sign-off.

## The second data point

On `property-tracker`, the hygiene audit had already identified the gaps (#26 and #29). Vidar was given a narrow, verifiable brief and performed the implementation:

- Wire a real coverage gate (`test:ci` + `@vitest/coverage-v8` + remove `|| true`)

- Add the missing summary endpoint tests that the issue title itself promised

In this instance, **Cursor (the human + IDE layer) acted as the quality gate** for Vidar's output. Cursor reviewed the changes, verified the test coverage, and confirmed the CI gate was real before the PR was merged.

The PR was green. Both issues were closed with evidence, not with "we'll get to it later."

## What the pattern buys us

**At small scale** (property-tracker):

- Prevents "CI greenwash" where the test command succeeds without exercising code.

- Forces the coverage tool that was already configured to actually run.

- Makes future changes to the summary endpoint visible in CI.

**At large scale** (rebalancing-engine):

- Surfaces missing documentation, fragile error paths, and observability gaps that the original author missed.

- Creates an auditable record of what was questioned and why.

**In both cases**:

- The reviewer has no emotional stake in the original implementation.

- The criteria are explicit (accordant-eu standards + the specific issue).

- The outcome is binary: either the findings are addressed or the merge is blocked.

## The operating rule

We now treat "Vidar review" as a standing quality gate for any change that touches production behaviour or CI policy. The size of the change does not matter. The presence of an independent reviewer does.

This is not process theatre. It is the minimum viable safeguard when the author and the deployer are both AI systems.

---

*Related: 2026-07-31 "Formal Review Before Deployment: The Vidar Audit Pattern", property-tracker PR #30*
