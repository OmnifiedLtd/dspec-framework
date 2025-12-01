---
layout: default
title: Why Aggregates not at Level-0
nav_order: 12
---

# Why Aggregates Aren’t Included at Level‑0

Aggregates, a core concept in Domain-Driven Design (DDD), are deliberately not included at Level-0 specifications.

- **Aggregate = mechanism, not meaning.** Aggregates (consistency groups) are **design‑time** choices for how you keep rules true. Level‑0 defines _which rules_ must be true and _when_ (the **consistency intent**), not how.
- **Premature boundaries distort models.** Locking in boundaries before you know volumes, hotspots, and latency windows often couples the model to storage/memory limits.
- **Clarity of intent.** Level‑0 should define **What** and **Boundaries** as constraints on meaning (invariants and their strictness), letting later stages pick mechanisms. This preserves **constructive constraint** and avoids over‑specifying early.

**Rule of thumb:** Decide boundaries only after you know (1) the invariants, (2) the **moments of truth** where they must hold, and (3) the scale/latency drivers. Then map each invariant to a mechanism at Level‑1.
