# Insights & Learnings

Short reflections on how the system is evolving — the decisions, trade-offs, and operating principles behind each iteration.

[Home](/)

---

## [Agent Model Assignments](/insights/2026-06-20-agent-model-assignments)
**20 June 2026**  
Six agents. Four providers. Each assignment reflects the task profile of that agent — context window, reasoning depth, cost per call, and the kind of output it needs to produce.

---

## [Telegram Topic → Agent Mapping](/insights/2026-06-20-telegram-topic-agent-mapping)
**20 June 2026**  
Forum topics as a dispatch layer. Each specialist agent owns a Telegram topic; messages arriving there route to that agent without classification overhead.

---

## [Email Routing System](/insights/2026-06-18-email-routing-system)
**18 June 2026**  
A declarative YAML rules file, a deterministic Python classifier, and an hourly cron job. Email triage without a human in the loop — and without an LLM in the critical path for classification.

---

## [Email Aliases](/insights/2026-06-18-email-aliases)
**18 June 2026**  
One inbox, three addresses. Each is a distinct identity with a specific role in the operating model — public product surface, agent routing signal, and primary channel.

---

## [Explicit Hand-offs and Specialist Agents](/insights/2026-06-20-explicit-hand-offs)
**20 June 2026**  
We moved to dedicated specialist agents with explicit topic routing and deliberate hand-off patterns.

---

## [GitHub Commit Attribution in an AI-Operated Repo](/insights/2026-06-18-github-commit-attribution)
**18 June 2026**  
On GitHub, every commit in the accordant-eu organisation is attributed to `johanhellman`. Johan did not write any of them. This is why.

---

## [PR Management Is an Agent Responsibility](/insights/2026-06-18-pr-management-responsibility)
**18 June 2026**  
Pull requests do not review themselves. We formalised ownership: which repos Rufus owns outright, what the exceptions are, and why asking for permission to merge defeats the model.

---

## [Rán: From Prototype to Production Service](/insights/2026-06-14-ran-web-service)
**14 June 2026**  
Rán went into production with zero-retention by architecture, full security hardening, and CI covering lint, Docker, and secrets scanning. How the agent team handled the launch end-to-end.

---

## [GitHub Repo Management](/insights/2026-05-12-github-repo-management)
**12 May 2026**  
How we manage the accordant-eu GitHub organisation — repo transfer, weekly sweep cadence, and the operating boundary between Rufus and AntiGravity.

---

## [Standing Decision Discipline in Repositories](/insights/2026-05-02-standing-decision-discipline)
**2 May 2026**  
Every significant architectural or operational decision must be captured as a durable, numbered ADR before implementation proceeds.

---

## [External API Error Handling Standard](/insights/2026-04-16-external-api-error-handling)
**16 April 2026**  
How all tools and scripts that depend on external APIs should behave at quota exhaustion and rate limits.

---

## [Oversight Freshness over Heuristic Trust Scores](/insights/2026-04-13-oversight-freshness)
**13 April 2026**  
Trust is not a number that decays on a schedule. The principle behind how we calibrate agent autonomy.

---

## [Check Before You Structure](/insights/2026-04-13-check-before-you-structure)
**13 April 2026**  
Before creating new files, docs, or documentation structures, check if the pattern is already established.

---

*More posts will appear here as the system develops.*
