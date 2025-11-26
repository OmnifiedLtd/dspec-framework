---
layout: default
title: Level-1 Design dspec
nav_order: 10
---

# Level‑1 — Design dspec

Level‑1 translates the functional requirements of Level‑0 into a concrete logical architecture. It defines the **Application Interface**—the set of operations available to the outside world.

In "Clean Architecture" terms, this level defines your **Use Cases** and **Entities**.
In "Domain Modeling Made Functional" terms, this level defines your **Workflows** and **Read Models**.

A Level-1 Spec consists of three main parts:
1.  **Consistency Groups (Aggregates):** The boundaries where business invariants are enforced.
2.  **Commands (Writes):** Requests to change state.
3.  **Queries (Reads):** Requests to retrieve data.

## consistency_groups

These define your transactional boundaries. Every Command targets a specific Consistency Group.

```yaml
consistency_groups:
  - id: order
    name: OrderAggregate
```

## commands

Commands represent the "Write" side of your application. They enforce invariants and produce events.

```yaml
commands:
  - id: submit-order
    name: SubmitOrder
    target: order
    intent: 'Transition order from Draft to Submitted'
    preconditions: ['order-not-empty']
    postconditions:
      emits: ['order-submitted']
```

## queries

Queries represent the "Read" side. They define the questions external actors can ask the system.

```yaml
queries:
  - id: get-order-history
    name: GetOrderHistory
    intent: 'View past orders for a user'
    parameters:
      - name: userId
        type: string
    returns:
      type: List<OrderSummary>
      description: 'Summarized view of past orders'
```

## A Note on CQRS (Command Query Responsibility Segregation)

The dspec framework supports, but **does not enforce**, strict CQRS.

### Option A: Strict Separation (CQRS)
Commands only return `void` (or Ack/Nack) and publish Events. Queries return Data.
*   **Pros:** Decouples write logic from read logic; allows independent scaling.
*   **Cons:** Higher complexity; "eventual consistency" UI challenges.

### Option B: Pragmatic / Mixed
Commands can return data directly. This is often simpler for CRUD apps or where immediate feedback (like a generated ID) is required.

To support this, Commands have an optional `returns` property:

```yaml
commands:
  - id: create-user
    name: CreateUser
    # ...
    returns:
      type: UserCreatedResponse
      description: 'Contains the generated User ID'
```

---

### Example: Identity Commands

```yaml
commands:
  - id: request-magic-link
    name: RequestMagicLink
    target: magic-link
    intent: 'Issue a time-bound, single-use link'
    preconditions: ['user-verified']
    postconditions:
      emits: ['magic-link-issued']

  - id: redeem-magic-link
    name: RedeemMagicLink
    target: magic-link
    intent: 'Authenticate via issued link'
    preconditions: ['link-single-use', 'link-expiry']
    postconditions:
      emits: ['magic-link-redeemed']
    transactional_expectation: 'atomic-within-group'
    failure_modes:
      - violates: 'link-single-use'
        outcome: 'reject already-redeemed'
      - violates: 'link-expiry'
        outcome: 'reject link-expired'
```

### E‑commerce Commands

[See full example in `examples/ecommerce/level1.yaml`](/examples/ecommerce/level1.yaml)

### Product Catalog: Brand/Product/Variant (Design)

[See full example in `examples/catalog/level1.yaml`](/examples/catalog/level1.yaml)

### CRM: Sales‑to‑Contract (Design)

[See full example in `examples/crm/level1.yaml`](/examples/crm/level1.yaml)