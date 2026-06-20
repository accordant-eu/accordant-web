---
title: "External API Error Handling Standard"
date: 2026-04-16
author: rufus@accordant.eu
tags: [agent-operating-model, error-handling, external-apis, operational-resilience, scripting]
---

# External API Error Handling Standard

**16 April 2026**

An agent system that depends on external APIs has an unavoidable operational reality: quotas get exhausted, rate limits get hit, and spending caps get reached. The question is not whether these failures happen — it is what the system does when they do.

We formalised a handling standard after observing what happened without one: silent failures, incomplete output, and no prompt notification until the next scheduled briefing, sometimes hours later.

## The standard

For any tool or script that calls an external API — xAI, Google, Alpaca, or others — four rules apply:

**1. Detect quota and rate-limit errors explicitly.**

Match on HTTP 429 and on error message patterns: "quota", "exhausted", "spending limit", "rate limit". Do not treat these as generic errors. They need specific handling — not just a log line and a stack trace.

**2. Alert to Telegram immediately when quota is exhausted.**

Do not wait for the next scheduled briefing. A quota exhaustion at 22:00 that is discovered at 09:00 the next morning is eight hours of silent degradation. The alert goes out the moment the error is detected. Short message: which API, which script, what the limit was. Enough to act on.

**3. Fail gracefully.**

When an API call fails with a quota or rate error, skip the remaining work for that run. Do not crash. Do not silently produce partial output and report success. Skipping is the correct outcome: the run is incomplete, and that should be the declared state.

**4. Module-level flag pattern for multi-step scripts.**

In scripts that make multiple calls to the same API across a loop or sequence, use a module-level flag. On first quota failure: set the flag, send the alert, skip all subsequent calls in that run. Do not retry the same API in the same session. The flag prevents a pattern where a script hits quota on step three, retries anyway, burns more quota, and eventually exits with a cascade of partial failures that are hard to interpret.

## Why this matters

The failure mode this standard addresses is quiet degradation. An agent system running automated scripts can fail in ways that are invisible unless specifically designed to be visible. A cron job that exits silently with partial output looks like success from the outside. An API that returns 429 and is swallowed by a generic error handler continues to be called by subsequent steps without any awareness that the session is already compromised.

Silent degradation is worse than a clean failure. A clean failure stops work, generates a clear signal, and requires a deliberate restart. Silent degradation produces incomplete work that may be acted on as if it were complete, alerts that never arrive because the alerting step itself failed, and accumulated confusion about what the system's actual state is.

The immediate Telegram alert is the most important element because it closes the loop quickly. Everything else — graceful skipping, the module-level flag — reduces wasted API calls and keeps the failure blast radius small. But the alert is what makes the failure visible when it matters.

## Application across the stack

The standard applies across the tooling surface:

- **xurl / xAI**: daily digest scripts, bookmark ingestion, research queries
- **Google APIs**: calendar lookups, email triage, workspace operations
- **Alpaca**: market data calls, trade execution scripts in the rebalancing engine

Any script that calls an external API must implement this pattern. New scripts are not considered production-ready until they do.

## What changed

Before this standard, quota failures in automated scripts produced a mix of outcomes depending on how the script happened to handle exceptions. Some crashed. Some continued and produced partial output. Some sent no notification at all. The inconsistency meant there was no reliable way to know whether an automated run had completed cleanly.

After the standard, every quota failure produces a defined outcome: incomplete run declared, Telegram notification sent, no further calls to the exhausted API in that session. The system's state is knowable.

## The operating principle

**Quota failures are expected events, not edge cases. Design for them explicitly.**

External APIs have limits. An agent system that runs scripts autonomously against those APIs will hit the limits eventually. The handling standard is the mechanism that keeps those events from degrading into silent, compounding failures. Build it in from the start, not after the first incident.
