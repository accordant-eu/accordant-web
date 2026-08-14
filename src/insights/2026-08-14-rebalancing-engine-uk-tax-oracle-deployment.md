---
title: "Production deployment: UK tax jurisdiction support, stream ticket authentication, and hardened tax optimizer adapter"
date: "2026-08-14"
tags: ["deployment", "rebalancing-engine", "agents", "security", "tax", "oracle"]
---

Fourteen days after the previous production release (`deploy/2026-07-31-ab7245f`), we deployed `c8a7cc1` of the rebalancing engine. This release completes the assimilation of the external open-source Oracle rebalancing engine into our production system and adds the first non-US tax jurisdiction.

## Scope since last deployment

The July 31 release (Tranche C) introduced the foundational shift to a **modular, pluggable optimizer architecture**:

- `TradeOptimizerInterface` abstraction and `TradeOptimizerRegistry`
- `OracleTaxOptimizerAdapter` — the HTTP RPC client that integrates the external Oracle tax-aware optimizer (`/v1/optimize`)
- Real-time SSE telemetry feed in the Command Center
- Foundational execution overlay system

That work established the orchestration layer that allows the engine to delegate tax-aware decisions to an external specialist while retaining full control over execution, auditing, and fallback behaviour.

The current release closes the loop on that integration and extends it:

- **UK Capital Gains Tax (ADR-0059)**: `SECTION_104` lot selection and `UkBedAndBreakfastOverlay` (30-day statutory rule). ~300 lines of new test coverage.
- **Security closure (#105)**: Replaced JWT query-parameter authentication on the new SSE stream endpoint with single-use 30-second stream tickets — direct remediation of the exposure introduced by the July telemetry work.
- **Architecture hardening (#106)**: Added response sanitization, request nonces, and an adapter-level `CircuitBreaker` to the `OracleTaxOptimizerAdapter`, ensuring the external Oracle integration fails safely.

In total, 22 files changed (+1,149 insertions) across a focused two-week hardening and jurisdiction-extension cycle.

## Agentic workflow across releases

The established pattern continued without deviation:

- AntiGravity signals readiness via `release-ready` issues (#104, #107).
- Vidar performs architecture and GitHub triage review (issues #103, #105, #106).
- Rufus executes red-team security/architecture review and holds deployment authority.
- The deploy workflow (Rufus-only) handles rollout and automatic GitHub release tagging.

This cycle involved six GitHub issues since July 31, with clear hand-offs between the three agents. The separation of concerns (implementation → architecture guardrail → release authority) has now been exercised across two consecutive production deployments with consistent velocity and no process deviations.

The work in this period represents the first full assimilation of an external open-source specialist engine (Oracle) into our modular orchestration layer, followed by the necessary security and resilience hardening to make that integration production-grade.

**Live:** https://rebalancing.accordant.eu  
**Release:** https://github.com/accordant-eu/rebalancing-engine/releases/tag/deploy/2026-08-14-c8a7cc1  
**Previous release:** https://github.com/accordant-eu/rebalancing-engine/releases/tag/deploy/2026-07-31-ab7245f
