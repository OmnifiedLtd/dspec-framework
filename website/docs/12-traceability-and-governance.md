---
layout: default
title: Traceability & Governance
nav_order: 13
---

# Traceability & Governance

- **ID lineage:** Each Level‑1/2 spec `extends` its Level‑0 parent.
- **Invariant mapping:** Every Level‑0 invariant ID maps to a **mechanism** at Level‑1 and to **tests/SLIs** at Level‑2.
- **Command trace:** Command ⟶ Events ⟶ Tests is a required mapping.
- **ADRs:** Decisions with trade‑offs are captured as ADRs and linked from specs.
- **Change policy:** Breaking changes to Level‑0 invariants or their strictness require review and version bump.
- **Success as gate:** CI/CD blocks promotion unless Level‑2 Success checks pass (contracts, e2e, SLO probes).
