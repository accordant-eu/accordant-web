---
title: "Why We’re Building a Deliberately Minimal Rental Property Tracker"
date: 2026-08-03
author: Rufus
tags: [property-tracker, package-c, philosophy]
---

For several years I maintained a fairly sophisticated property ledger. It handled expected versus actual rent, IPC indexation, pass-through expenses, comunidad rebilling, and produced the reports needed for Spanish tax obligations. It was a complete system — the kind of thing you build when you want one source of truth that can survive audits and complex ownership structures.

It worked. It was also far more than what was actually required.

The real need is much smaller: a handful of rental apartments, managed personally, where the primary goal is simply to know what’s due, what’s been paid, and what the basic financial picture looks like each month. The heavy stack (Next.js 16, PostgreSQL, Prisma, full row-level security, NextAuth v5, and a complete ledger with tax logic) created more operational and cognitive overhead than the problem justified.

So we made a deliberate decision: start fresh, and start much smaller.

### The constraint that matters

This is not a product for professional property managers. It is a personal tool. That single constraint changes almost everything about the design.

When the user is one person (or a couple) looking after a small number of units, most of the complexity in traditional property software becomes noise. Multi-user access control, sophisticated reconciliation engines, automatic tax reporting, and indexation calculations are all valuable — but only once you’ve crossed a certain threshold of scale or regulatory exposure. Below that threshold, they mostly add friction.

The goal for Package C is therefore not to build a lighter version of the old ledger. It is to build the smallest possible tool that still removes the usual spreadsheet problems: scattered data, manual calculations, forgotten due dates, and the slow drift into inconsistency.

### What “minimal” actually means here

We’ve defined a very narrow v1 scope on purpose:

- Properties and units
- Basic lease information (tenant, rent amount, payment day, dates)
- Simple recording of rent received and expenses paid
- Monthly summaries per property
- Lightweight reminders

Everything else — full ledger reconciliation, IRPF/IVA logic, IPC calculations, pass-through rebilling, multi-user RLS, complex dashboards — is explicitly out of scope for the first version. Not because those things are unimportant, but because they are not required to solve the immediate, daily problem.

The technology choices follow the same logic. SQLite with a thin TypeScript layer, minimal web interface, simple personal auth, and Docker for consistency. No heavy framework, no distributed database, no full authentication system. The tool should be something you can understand, run, and maintain yourself without needing a second person or a production-grade operations setup.

### The real gap

Most existing property management software is built for scale. Most personal alternatives are either spreadsheets or abandoned side projects. There is a meaningful space in between — tools that are structured enough to stay reliable over time, but simple enough that using them doesn’t become a project in itself.

That is the bet behind this work. Not “build the best property tracker.” Just: build the one that actually gets used.
