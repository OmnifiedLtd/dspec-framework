---
layout: default
title: Purpose & Scope
nav_order: 2
---

# Purpose & Scope

DSpec lets teams describe features in **short, declarative specs** that are readable by humans and consumable by tools and in particular, by AI Agents. The process begins by establishing a clear **Domain Model**—defining the Ubiquitous Language and core concepts—before moving on to feature-level specifications. Specs then progressively constrain the solution space—from business intent (Level‑0) to design (Level‑1) and then to concrete technology (Level‑2)—**without** polluting earlier layers with implementation details.

### Problem

With the new power of AI-agentic workflows, software is more and more being driven by markdown based specifications. These specifications
have hugely varying strucuture and are extremely lengthy. Usually as a result people don't read them.

### Solution

Provide a structured, opinionated way of describing software via concise, human-readable specifications with a predicable structure.

### Problem: Concept Drift in AI Development

When developing rapidly with AI agents, there is a risk that an agent might subtly alter the definition or behavior of a core concept to satisfy the immediate needs of a new feature. Over time, this "concept drift" can break existing functionality that relied on the original definition, leading to regressions and a fragile codebase.

### Solution: Domain Model as an Anchor

A rigorously defined **Domain Model** acts as an immutable anchor for the AI. By establishing the Ubiquitous Language and invariant rules *before* feature development, you ensure that all features—present and future—adhere to a consistent understanding of the business. This prevents the "rug pull" effect where new features inadvertently undermine the foundation of the system.
