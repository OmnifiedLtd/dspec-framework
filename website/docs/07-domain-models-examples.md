---
layout: default
title: Domain Models Examples
nav_order: 8
---

# Domain Models (Conceptual) — Examples

> **Runtime note:** The agent team now persists domain models as JSON files conforming to
> `specs/schemas/domain-model.schema.json`, and auto-hydrates each Level‑0 spec’s
> `meta.domain_id` with anchors into the persisted `<slug>.domain.json`. The conceptual examples
> below remain in YAML for readability—the structure is identical.

### Identity (Conceptual)

```yaml
# domains/identity.domain.json (conceptual)
meta:
  id: identity
  owner: Identity Team
  title: Identity Domain Model
  description: "Core concepts for user identity and authentication."
  notes: "This model underpins all user management and login features."

glossary:
  - id: user
    name: User
    definition: "A uniquely identified account holder"
  - id: magic-link
    name: MagicLink
    definition: "A single-use, time-bound authentication link"

lifecycles:
  - id: magic-link
    subject_ref: magic-link
    states:
      - id: issued
        name: Issued
      - id: redeemed
        name: Redeemed
      - id: expired
        name: Expired
    transitions:
      - from: issued
        to: redeemed
        trigger: magic-link-redeemed
      - from: issued
        to: expired
        trigger: magic-link-expired

predicates:
  - id: user.has-verified-email
    name: User.HasVerifiedEmail
    definition: "True if the User has completed email verification."
    subject_ref: user

invariants:
  - id: link-single-use
    name: Single Use Link
    rule: "A MagicLink in Redeemed|Expired cannot transition again"
  - id: link-expiry
    rule: "A MagicLink becomes Expired after its configured TTL elapses"

events:  # domain facts; roles only
  - id: magic-link-issued
    name: MagicLinkIssued
    definition: "MagicLinkIssued(subject: MagicLink, occurred: Time)"
    subject_ref: magic-link
  - id: magic-link-redeemed
    name: MagicLinkRedeemed
    definition: "MagicLinkRedeemed(subject: MagicLink, occurred: Time)"
    subject_ref: magic-link
  - id: magic-link-expired
    name: MagicLinkExpired
    definition: "MagicLinkExpired(subject: MagicLink, occurred: Time)"
    subject_ref: magic-link
```

### E‑Commerce: Order‑to‑Cash (Conceptual)

[See full example in `examples/ecommerce/domain-model.yaml`](/examples/ecommerce/domain-model.yaml)

### CRM: Sales‑to‑Contract (Conceptual)

[See full example in `examples/crm/domain-model.yaml`](/examples/crm/domain-model.yaml)

### Product Catalog: Brand/Product/Variant (Conceptual)

[See full example in `examples/catalog/domain-model.yaml`](/examples/catalog/domain-model.yaml)
