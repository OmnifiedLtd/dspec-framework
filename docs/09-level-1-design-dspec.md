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
  - name: RequestMagicLink
    target: MagicLink
    intent: 'Issue a time-bound, single-use link'
    preconditions: ['User is verified']
    postconditions:
      emits: ['MagicLinkIssued']

  - name: RedeemMagicLink
    target: MagicLink
    intent: 'Authenticate via issued link'
    preconditions: ['link-single-use', 'link-expiry']
    postconditions:
      emits: ['MagicLinkRedeemed']
    transactional_expectation: 'atomic-within-group'
    failure_modes:
      - violates: 'link-single-use'
        outcome: 'reject AlreadyRedeemed'
      - violates: 'link-expiry'
        outcome: 'reject LinkExpired'
```

### E‑commerce Commands

[See full example in `examples/ecommerce/level1.yaml`](../examples/ecommerce/level1.yaml)

### Catalog Commands

[See full example in `examples/catalog/level1.yaml`](../examples/catalog/level1.yaml)

### CRM Commands

[See full example in `examples/crm/level1.yaml`](../examples/crm/level1.yaml)
