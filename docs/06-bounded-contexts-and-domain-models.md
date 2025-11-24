---
layout: default
title: Bounded Contexts & Domain Models
nav_order: 7
---

# Bounded Contexts & Domain Models

A **Bounded Context** is a linguistic and semantic boundary within which a specific **Domain Model** applies validly and consistently. It is effectively a group of Features that share a common language and set of rules.

In DSpec, a Feature does not exist in a vacuum; it resides within a Bounded Context. This implies a critical workflow constraint: **The Domain Model should be worked out (at least partially) even before the Level‑0 spec for the feature.**

### The Domain Model Components

Within a Bounded Context, the Domain Model consists of:

1.  **Glossary:** Ubiquitous language (e.g., "User", "Order") with precise definitions valid _only_ within this context.
2.  **Lifecycles:** State machines for key entities (e.g., `Order: Draft -> Submitted`).
3.  **Invariants (Definitions):** The canonical library of business rules that must always be true (e.g., "Price cannot be negative").
4.  **Events (Facts):** Things that have happened (e.g., `OrderSubmitted`).

**Where do Invariants live?**
There is often confusion here.

- The **Domain Model** holds the **Definition** (ID + Rule Text). It is the "Library of Laws" for the context.
- The **Level‑0 Spec** holds the **Application** (Reference + Consistency Demand). It selects which laws are relevant boundaries for _this specific feature_ and defines how strictly they must be checked (Consistency Demand).

**Why this matters:** You cannot specify a feature's "Intent" or "Boundaries" (Level‑0) if you haven't agreed on the nouns, verbs, and rules of the world (Domain Model) it operates in.

**Note for Developers New to DDD:** For solo developers or small/medium projects, the initial understanding can be simplified: assume your entire project is a single Bounded Context. This means there's one overarching Domain Model that underpins all your features. You can then introduce explicit Bounded Context separation later as your project scales and different parts of your domain naturally diverge.
