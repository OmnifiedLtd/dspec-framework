---
layout: default
title: Appendix C - Pattern Library
nav_order: 17
---

# Appendix C — Pattern Library: From Invariant to Mechanism

Given a Level‑0 invariant + demand, Level‑1 can choose among patterns (non‑exclusive):

- **Partitioned unique index (single‑writer per key)** — Fast, scalable enforcement for uniqueness rules.
- **Reservation then confirm (claim service)** — Two‑phase claim for hot keys; great when concurrent creates are common.
- **DB uniqueness + idempotency + outbox** — Pragmatic, simple; keep design boundary small and let the DB enforce.
- **Saga + compensation** — For cross‑system invariants when temporary exposure is tolerable.
- **CRDT/merge** — When eventual convergence is acceptable and partitions are possible.

Choose based on throughput, contention, latency windows, failure modes, and operability.
