---
layout: default
title: Level-1 Design dspec
nav_order: 10
---

# Level‑1 — Design dspec

Level‑1 translates the functional requirements of Level‑0 into a concrete logical architecture. It defines the **Application Interface**—the set of operations available to the outside world.

In "Clean Architecture" terms, this level defines your **Use Cases** and **Entities**.
In "Domain Modeling Made Functional" terms, this level defines your **Workflows** and **Read Models**.

A Level-1 Spec consists of these main parts:
1.  **Meta:** Metadata identifying the design spec.
2.  **Extends:** Reference to the Level-0 feature this design refines.
3.  **Invariant Mechanisms:** How Level-0 invariants are enforced at the design level.
4.  **Consistency Groups (Aggregates):** The boundaries where business invariants are enforced.
5.  **Commands (Writes):** Requests to change state.
6.  **Queries (Reads):** Requests to retrieve data.

## meta

Every Level-1 spec must have a meta section identifying it:

```yaml
meta:
  id: design.passwordless-login
  name: Passwordless Login Design
  owner: Identity Team
  description: "Level-1 design for magic link authentication"
```

## extends

Links this design spec to the Level-0 feature it refines:

```yaml
extends: feature.passwordless-login
```

## invariant_mechanisms

Maps Level-0 invariants to their enforcement mechanisms. This is where you document *how* each business rule will be enforced at the design level.

```yaml
invariant_mechanisms:
  - invariant_ref: link-single-use
    mechanism: partitioned-unique-index
    notes: "Enforced via unique index on link_id where status = 'redeemed'"
  - invariant_ref: unique-model-code-per-brand
    mechanism: db-constraint
    notes: "Unique constraint on (brand_id, model_code) where active = true"
```

Common mechanisms include:
- `partitioned-unique-index` — Fast, scalable enforcement for uniqueness rules
- `reservation-then-confirm` — Two-phase claim for hot keys
- `db-constraint` — Simple database-level enforcement
- `saga-compensation` — For cross-system invariants with eventual consistency
- `application-validation` — Checked in application code before persistence

## consistency_groups

These define your transactional boundaries. Every Command targets a specific Consistency Group.

```yaml
consistency_groups:
  - id: order
    name: OrderAggregate
```

## commands

Commands represent the "Write" side of your application. They enforce invariants and produce events.

Commands now include **state_transitions** to explicitly link to domain model lifecycles, and **structured failure modes**:

```yaml
commands:
  - id: submit-order
    name: SubmitOrder
    target: order
    intent: 'Transition order from Draft to Submitted'
    preconditions: ['order-not-empty']
    postconditions:
      state_transitions:
        - entity: order
          from: draft
          to: submitted
      emits:
        - event: order-submitted
        - event: low-stock-alert
          when: inventory.below-threshold  # conditional emission
    failure_modes:
      - violates: 'order-not-empty'
        outcome:
          action: reject
          error_code: '400'
          message: 'Order must contain at least one item'
```

## queries

Queries represent the "Read" side. They define the questions external actors can ask the system.

Queries can include a **freshness** property for CQRS/eventually-consistent systems:

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
    freshness:
      tolerance: PT30S  # ISO 8601 duration
      description: 'Data may be up to 30 seconds stale'
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
    target: user
    intent: 'Register a new user account'
    postconditions:
      emits:
        - event: user-created
    returns:
      type: UserCreatedResponse
      description: 'Contains the generated User ID'
```

---

### Example: Identity Commands

```yaml
meta:
  id: design.passwordless-login
  name: Passwordless Login Design
  owner: Identity Team

extends: feature.passwordless-login

invariant_mechanisms:
  - invariant_ref: link-single-use
    mechanism: db-constraint
    notes: "Unique constraint ensures link can only be marked redeemed once"
  - invariant_ref: link-expiry
    mechanism: application-validation
    notes: "TTL checked against current time before redemption"

commands:
  - id: request-magic-link
    name: RequestMagicLink
    target: magic-link
    intent: 'Issue a time-bound, single-use link'
    preconditions: ['user-verified']
    postconditions:
      state_transitions:
        - entity: magic-link
          from: issued
          to: issued
      emits:
        - event: magic-link-issued

  - id: redeem-magic-link
    name: RedeemMagicLink
    target: magic-link
    intent: 'Authenticate via issued link'
    preconditions: ['link-single-use', 'link-expiry']
    postconditions:
      state_transitions:
        - entity: magic-link
          from: issued
          to: redeemed
      emits:
        - event: magic-link-redeemed
    transactional_expectation: 'atomic-within-group'
    failure_modes:
      - violates: 'link-single-use'
        outcome:
          action: reject
          error_code: '409'
          message: 'Link has already been redeemed'
      - violates: 'link-expiry'
        outcome:
          action: reject
          error_code: '410'
          message: 'Link has expired'
```

### E‑commerce Commands

[See full example in `examples/ecommerce/level1.yaml`](/examples/ecommerce/level1.yaml)

### Product Catalog: Brand/Product/Variant (Design)

[See full example in `examples/catalog/level1.yaml`](/examples/catalog/level1.yaml)

### CRM: Sales‑to‑Contract (Design)

[See full example in `examples/crm/level1.yaml`](/examples/crm/level1.yaml)
