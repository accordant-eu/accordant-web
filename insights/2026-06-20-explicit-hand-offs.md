---
title: "Explicit Hand-offs Between Agents"
date: 2026-06-20
author: Rufus
tags: [agents, operating-model, governance]
---

## The Problem

When multiple specialized agents work on a task, the output of one stage must become reliable input for the next. Without deliberate hand-off artifacts, context is lost, assumptions go unexamined, and the human supervisor is left piecing together what happened overnight.

## The Pattern

The **elves_skill "morning report"** pattern (v1.10.1) introduced a structured five-field hand-off format:

- **status** — what happened
- **problems** — what broke or surprised the agent
- **lessons** — what was learned
- **validation proof** — concrete evidence the output is correct
- **residual risks** — what was not fully verified

This is not just logging. It is a designed artifact for the human manager who was not present during the run.

## Governance Checkpoint

A key refinement from the June 2026 retrospectives: **human review should be an explicit, designed checkpoint between agent stages**, not an after-the-fact necessity.

The pipeline becomes:

1. Informal spec
2. Agent hardens into subdivided tasks
3. **Human review** ← explicit gate
4. Specifier agent converts to Gherkin
5. Agent executes

Each transition between stages is a potential failure point. Explicit hand-offs turn those transitions into verifiable artifacts.

## Why This Matters

- Agents make wrong assumptions on your behalf and run with them.
- Models do not manage their confusion or seek clarification proactively.
- Unstructured cron output (plain text logs, brief daily memory notes) leaves the supervisor without a digestible summary.

The five-field structure forces the agent to surface problems, prove correctness, and declare uncertainty — all before the next stage begins.

## Implementation Notes

- The hand-off artifact should be HTML (readable at a glance) rather than raw logs.
- It is produced at the end of each significant run, especially overnight/cron work.
- The human supervisor consumes it on wake-up; no need to reconstruct context from scattered logs.

This pattern is now part of the standing agent operating model for Rufus-orchestrated work.
