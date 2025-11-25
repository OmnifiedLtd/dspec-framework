---
layout: default
title: Level-1 Design dspec
nav_order: 10
---

# Level‑1 — Design dspec (Consistency Groups, Commands & Mechanisms)

Level‑1 translates **consistency intent** from Level‑0 into **consistency groups** (a.k.a. aggregates), **commands** (conceptual change requests), and concrete **mechanisms** (unique indexes, reservations, sagas, etc.).

### Identity Commands

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