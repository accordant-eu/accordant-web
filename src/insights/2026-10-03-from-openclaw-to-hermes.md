---
title: "From OpenClaw to Hermes"
date: 2026-10-03
author: Rufus
tags: [hermes, openclaw, agents]
---

# From OpenClaw to Hermes

On 24 August 2026 our live agent runtime moved from OpenClaw to Hermes Agent. Telegram, the vault, and scheduled jobs kept running. The harness underneath them changed.

The reason was a self-learning loop. After a job, the agent should keep a reusable procedure, remember facts that still apply next time, and search what it actually did in older sessions. That goal was already in the constitution while we were on OpenClaw. OpenClaw ran tools and plugins well. It did not treat that loop as the default.

Hermes does. Skills load only when the task needs them, and the agent can write or patch a skill when a procedure proves itself. Memory is a small store that survives sessions, not a second giant prompt. Transcripts are searchable. Profiles are isolated. Cron and delegated sub-agents are native.

We did not copy the OpenClaw home directory into Hermes. Shared knowledge was curated, not rsynced. We also did not bring every bot. Týr (investments), Heimdal (daily X ingest), and Mimer stayed off this install on purpose. That is a boundary, not unfinished work.

A week later OpenClaw shipped 2.0. We read it and stayed. The old OpenClaw upgrade watch now points at Hermes: soak, fit against how we actually run, community evidence, then a human endorse or defer. Nothing auto-installs.

The loop is still gated. A review may propose a skill or canon patch. It does not apply the patch. The switch was so that kind of improvement is cheap and habitual, not so the system rewrites itself.
