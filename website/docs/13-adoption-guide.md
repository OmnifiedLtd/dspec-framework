---
layout: default
title: Adoption Guide
nav_order: 14
---

# Adoption Guide (Quick Start)

1.  **Identify the Bounded Context** (e.g., "Identity", "Catalog").
2.  **Define/Curate the Domain Model** (Glossary, Lifecycles, Invariants) for that context.
3.  **Author a Level‑0 dspec** for one feature, referencing the Domain Model.
4.  Annotate **invariants** with **moment_of_truth** and **consistency_demand**.
5.  Draft a **Level‑1 design dspec** mapping invariants → mechanisms and defining **commands**.
6.  Bind **Level‑2** (APIs, schemas, SLOs, tests).
7.  Add a CI gate on Level‑2 **Success**.
8.  Iterate: move details **down**, never **up**.
