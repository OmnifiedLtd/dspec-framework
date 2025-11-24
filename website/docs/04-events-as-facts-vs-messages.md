---
layout: default
title: Events‑as‑Facts vs Messages
nav_order: 5
---

# Events‑as‑Facts vs Messages

“Events” can mean two different things:

- **Domain facts**: business‑level occurrences that change lifecycle or invariants (Level‑0).
- **Integration messages**: serialized payloads and transports (Level‑2).

At **Level‑0**, list **facts** (with minimal roles/obligations), not message shapes. This keeps the model **implementation‑agnostic** while still constraining the solution space per WBS.
