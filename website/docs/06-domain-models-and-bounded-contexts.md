---
layout: default
title: Domain Models & Bounded Contexts
nav_order: 7
---

# Domain Models & Bounded Contexts

A **Domain Model** is the shared language and set of rules that define your business world. It is the foundation upon which all features are built.

Before you can specify *what* a user does (a Feature), you must agree on the definitions of the things they are interacting with.

## The Domain Model

The Domain Model defines the **"Ubiquitous Language"** for your project. It ensures that when a developer, a product manager, and a stakeholder say "Order," they all mean exactly the same thing.

In DSpec, a Domain Model consists of:

1.  **Glossary:** The nouns of your system (e.g., "User", "Order", "Product").
    *   **Precision in Naming & Definition:** Every concept in the Glossary must have an **extremely precise, yet concise** definition. The choice of a concept's name is crucial, and every word in its definition counts. This rigorous approach ensures clarity and eliminates ambiguity, forming the bedrock of the Ubiquitous Language.
    *   **Intentional Abstraction:** We deliberately do *not* specify whether a glossary concept is an "Entity" or a "Value Object" at this level. These distinctions, while vital for implementation (Level-2), can be non-trivial to grasp and apply correctly. DSpec's Domain Model operates at a higher level of abstraction, allowing a concept to potentially be modeled as an Entity or a Value Object depending on the specific context and future design choices (Level-1). The focus here is purely on *meaning*, not *mechanism*.
2.  **Invariants (Rules):** The canonical library of business rules that must always be true (e.g., "Price cannot be negative," "User must be 18+").
3.  **Lifecycles:** The valid states and transitions for your entities (e.g., `Order: Draft -> Submitted -> Shipped`).
4.  **Events (Facts):** Past-tense statements of things that have happened (e.g., `OrderSubmitted`, `PaymentReceived`).

**Key Insight:** The Domain Model holds the **Definitions** of rules. The Feature Specs (Level-0) simply **Reference** them.

## Bounded Contexts

As systems grow, a single Domain Model can become too large and contradictory. For example, the concept of a "Product" looks very different to the **Sales Team** (marketing copy, price) versus the **Warehouse Team** (dimensions, weight, aisle number).

This is where the **Bounded Context** comes in.

A **Bounded Context** is a linguistic boundary. It groups related Features and Domain Models together. Within one context, terms have a specific, consistent meaning.

*   **Context A (Sales):** "Product" = Price + Description.
*   **Context B (Warehouse):** "Product" = SKU + Weight + Location.

### For Simpler Projects

**Note for Developers New to DDD:** For solo developers or small/medium projects, you can simplify this: **Assume your entire project is a single Bounded Context.**

This means you have one overarching Domain Model that underpins all your features. You do not need to worry about multiple contexts until your project scales and different parts of your domain naturally diverge.

### The Workflow

1.  **Define the Model:** Agree on the nouns and rules (e.g., "What is a Valid Order?").
2.  **Write the Feature:** Describe the user journey using those nouns (e.g., "User places a Valid Order").

You cannot effectively specify a feature's "Intent" (Level‑0) if you haven't agreed on the language (Domain Model) it uses.