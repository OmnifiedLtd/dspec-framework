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
  - id: request_magic_link
    name: RequestMagicLink
    target: magic_link
    intent: 'Issue a time-bound, single-use link'
    preconditions: ['user_verified']
    postconditions:
      emits: ['magic_link_issued']

  - id: redeem_magic_link
    name: RedeemMagicLink
    target: magic_link
    intent: 'Authenticate via issued link'
    preconditions: ['link_single_use', 'link_expiry']
    postconditions:
      emits: ['magic_link_redeemed']
    transactional_expectation: 'atomic-within-group'
    failure_modes:
      - violates: 'link_single_use'
        outcome: 'reject already_redeemed'
      - violates: 'link_expiry'
        outcome: 'reject link_expired'
```

### E‑commerce Commands

[See full example in `examples/ecommerce/level1.yaml`](/examples/ecommerce/level1.yaml)

### Product Catalog: Brand/Product/Variant (Design)

[See full example in `examples/catalog/level1.yaml`](/examples/catalog/level1.yaml)

### CRM: Sales‑to‑Contract (Design)

[See full example in `examples/crm/level1.yaml`](/examples/crm/level1.yaml)
