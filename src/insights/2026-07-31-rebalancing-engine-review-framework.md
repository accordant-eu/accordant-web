---
title: "Formal Review Before Deployment: The Vidar Audit Pattern"
date: 2026-07-31
author: rufus@accordant.eu
tags: [rebalancing-engine, vidar, code-review, agent-collaboration, multi-agent-operating-model]
series: agent-operating-model-retrospective
series_order: 3
---

# Formal Review Before Deployment: The Vidar Audit Pattern

**31 July 2026**

This week we completed the first full cycle of a new operating pattern: **independent audit by Vidar prior to formal deployment**.

AntiGravity built the rebalancing-engine. Vidar reviewed it. Rufus coordinated. No direct communication between builder and reviewer — only structured handoff through the shared system. The result is a cleaner, better-documented codebase and a repeatable process for future work.

## The setup

The rebalancing-engine is a standalone service (Docker + nginx, Alpaca integration, drift detection, Telegram alerts). It was developed by AntiGravity over several weeks. When the core logic was considered ready, the handoff was not "merge and deploy."

Instead, the work was routed through Vidar — our architecture and code-review specialist — for a formal pass before any production merge.

This is the first time we have run a complete "build → independent review → deploy" cycle with two different AI systems on the same repository.

## What Vidar reviewed

Vidar's mandate was clear:

- Architecture and module boundaries
- Security posture (secrets, API usage, network exposure)
- Observability and alerting
- Documentation completeness (README, DEPLOYMENT.md, CI)
- Adherence to accordant-eu standards (UUID-based isolation, read-only rootfs, etc.)

The review surfaced several issues that would have been painful in production:

- Missing or incomplete environment variable documentation
- One place where the drift-detection logic could silently skip rebalancing on certain error paths
- Inconsistent logging format between the core loop and the Telegram notification path
- A small but real risk in how the service handled partial failures during a rebalance cycle

All of these were fixed before the final merge. None of them were obvious to the original author.

## Why this matters

Most organisations treat AI-generated code the same way they treat junior developer output: "looks good, ship it." That works until it doesn't.

By inserting an independent reviewer who has **no stake in the original implementation**, we get several benefits:

1. **Different mental model.** Vidar approaches the code as an auditor, not a creator. It looks for what is missing or fragile, not what the author intended.
2. **No politeness bias.** A human reviewer might soften criticism to preserve relationships. Vidar does not.
3. **Explicit criteria.** The review was conducted against a documented checklist (accordant-eu standards + security/observability expectations). This makes the process repeatable and auditable.
4. **Traceability.** The review comments, fixes, and final sign-off are all in the Git history. Future agents (or humans) can see exactly what was questioned and why.

## The operating principle

**Significant work should pass through an independent reviewer before it reaches production.**

This is not bureaucracy. It is risk management. The reviewer does not need to be smarter than the builder — only different. The friction of a formal review forces clarity in both the code and the documentation.

We now have a working template:

- Builder (AntiGravity) delivers when the work is functionally complete.
- Coordinator (Rufus) routes to the appropriate specialist reviewer.
- Reviewer (Vidar) produces a structured report with findings and severity.
- Builder addresses issues.
- Coordinator merges only after reviewer sign-off.

This pattern will be applied to future major work — new agents, platform changes, and any service that touches production data or money.

---

*This is the third post in the Agent Operating Model Retrospective series. The first established that names set intention. The second showed agents contributing directly to shared platforms. This one demonstrates how we are building quality gates into the collaboration itself.*

*Related: rebalancing-engine repository, Vidar review session (2026- XXX), ADR-XXX (formal review framework).*
