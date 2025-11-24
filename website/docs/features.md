---
layout: default
title: Features
---

# Features

In the DSpec framework, a **Feature** is the primary unit of specification and delivery. It represents a distinct slice of functionality that provides value to a user or system.

While a **Domain Model** defines the *vocabulary* and *rules* of your business world (the "nouns"), a **Feature** defines how those elements are orchestrated to achieve a specific outcome (the "verbs").

## The Relationship: Features and Domain Models

A common pitfall in software specification is mixing definitions with behavior. DSpec strictly separates these:

1.  **The Domain Model** is the foundation. It defines the **Ubiquitous Language**: the entities, value objects, and invariant rules that are true regardless of any specific user workflow.
    *   *Example:* "A `BankAccount` must have a non-negative balance."

2.  **The Feature** is the application of that model. It describes a specific user intent and the expected system response, utilizing the terms defined in the Domain Model.
    *   *Example:* "User transfers money." This feature relies on the concept of `BankAccount` defined in the Domain Model but focuses on the *flow* of the transfer.

### "Features sit on top of the Domain Model"

You cannot write a concise, readable Feature spec without a Domain Model. The Domain Model acts as the dictionary. If your Feature spec is cluttered with definitions of data structures or validation rules, it’s a sign that those belong in the Domain Model.

**Visualizing the Stack:**

```mermaid
graph TD
    F[Feature (Level-0)] -->|Uses Vocabulary From| DM[Domain Model]
    F -->|Orchestrates| BC[Bounded Context]
    DM -->|Defines| E[Entities & Rules]
```

## What makes a DSpec Feature?

A DSpec Feature is typically defined at **Level-0**. It focuses entirely on the **User Intent** and the **System Consequence** (Events).

*   **Intent:** What is the user trying to do? (e.g., `PlaceOrder`)
*   **Preconditions:** What must be true for this to happen? (e.g., `UserIsLoggedIn`, `ProductIsInStock`)
*   **Outcome:** What facts are recorded in the system history? (e.g., `OrderPlaced`, `InventoryReserved`)

It does **not** describe:
*   Database schemas (That's Level-2)
*   API endpoints (That's Level-1)
*   UI interactions (That's a separate UX concern)

By stripping away the "how" and focusing on the "what," Features become stable contracts that the business and engineering teams can agree upon.
