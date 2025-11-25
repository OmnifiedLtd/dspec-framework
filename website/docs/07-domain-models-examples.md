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
  version: 0.1.0
  owner: Identity Team

glossary:
  - name: User
    definition: "A uniquely identified account holder"
  - name: MagicLink
    definition: "A single-use, time-bound authentication link"

lifecycles:
  MagicLink:
    states: ["Issued", "Redeemed", "Expired"]
    transitions:
      - "Issued -> Redeemed"
      - "Issued -> Expired"

predicates:
  - name: User.HasVerifiedEmail
    definition: "True if the User has completed email verification."

invariants:
  - id: link-single-use
    name: Single Use Link
    rule: "A MagicLink in Redeemed|Expired cannot transition again"
  - id: link-expiry
    rule: "A MagicLink becomes Expired after its configured TTL elapses"

events:  # domain facts; roles only
  MagicLinkIssued(subject: MagicLink, occurred: Time)
  MagicLinkRedeemed(subject: MagicLink, occurred: Time)
  MagicLinkExpired(subject: MagicLink, occurred: Time)
```

### E‑Commerce: Order‑to‑Cash (Conceptual)

[See full example in `examples/ecommerce/domain-model.yaml`](/examples/ecommerce/domain-model.yaml)

### CRM: Sales‑to‑Contract (Conceptual)

[See full example in `examples/crm/domain-model.yaml`](/examples/crm/domain-model.yaml)

### Product Catalog: Brand/Product/Variant (Conceptual)

[See full example in `examples/catalog/domain-model.yaml`](/examples/catalog/domain-model.yaml)