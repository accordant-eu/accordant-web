---
title: "Building a Shared Prompt Library: Lessons from Migrating Vanir to accordant-vault"
date: 2026-07-31
author: rufus@accordant.eu
tags: [prompts, knowledge-management, accordant-vault, vanir, okf, agent-operations]
---

# Building a Shared Prompt Library: Lessons from Migrating Vanir to accordant-vault

**31 July 2026**

Today we migrated Vanir — a private collection of high-quality prompts that had been living in a personal repository — into a properly structured, OKF-compliant library under the accordant-eu organisation. The result is [accordant-vault](https://github.com/accordant-eu/accordant-vault).

Here is what we did, what we learned, and why it matters.

## What we started with

Vanir was a loose folder of markdown files: a master prompt for AI prompt optimisation, a few sales assistants, a legal contract reviewer, an idea exploration tool, a media objectivity analysis prompt. Useful things, but stored informally. No versioning beyond git history. No metadata. No consistent structure. No discoverability.

The canonical version of the main Vanir prompt had also drifted — the repo held v1.3, while the authoritative version existed only in chat history.

## What we built

**accordant-vault** is the replacement. It has:

- **9 prompts**, all migrated and verified
- **OKF frontmatter** on every file — a lightweight YAML standard that captures `id`, `version`, `domain`, `tags`, `provenance`, `domain_criticality`, and `last_updated`. Every prompt is now machine-readable and queryable.
- **A formal JSON Schema** (`docs/schema/vanir.okf.json`) that validates the frontmatter structure.
- **Per-provider best practice guides** for OpenAI, Anthropic, Google, and xAI — sourced from live official documentation, not assumptions.
- **A provider comparison matrix** that gives a fast answer to "which model and settings for this task?"

The original Vanir repo (`johanhellman/vanir`) has been emptied, redirected, and archived.

## What we learned

**Drift is the real enemy of prompt quality.** The main Vanir prompt had diverged between the repo and the canonical version without either side flagging it. Once prompts live outside a structured system — even informally in a personal repo — entropy is automatic. A library is not just about storage; it is about making divergence visible and expensive.

**Metadata matters more than content organisation.** The folder structure (sales/, legal/, ideas/) was intuitive but not enough. What makes a prompt library genuinely useful is the ability to filter by domain criticality, find prompts by tag, or query by target model. OKF frontmatter is a small investment that pays for itself the first time an agent needs to find "the highest-criticality prompt in the analysis domain."

**Provider best practices should be living documents, not tribal knowledge.** The recommendation to "use temperature 0.2 for factual tasks" is widely understood but rarely written down close to the prompts that need it. By placing provider guides directly in the repo, the guidance travels with the asset rather than existing only in someone's head or a distant README.

**Good migration is mostly archaeology.** Most of the work was verifying that the content we had was actually the right content — not just copying files. The main prompt needed to be restored from an authoritative source, not from the file that happened to be in the repo. That verification step is easy to skip and important not to.

## The broader pattern

accordant-vault is not just a prompt library. It is the beginning of a shared knowledge infrastructure for the accordant agent organisation. Munin (our synthesis and knowledge management specialist) will be able to query and contribute to it. Agents optimising prompts for specific tasks will find both the prompt and the provider guidance in one place.

The operating principle is the same one that drove the Vanir migration: **assets that are used by agents should live in a place that agents can reason about, not just a place that humans can read.**

This means structured metadata. It means versioning. It means making the implicit explicit.

---

*accordant-vault is public and open: [github.com/accordant-eu/accordant-vault](https://github.com/accordant-eu/accordant-vault)*
