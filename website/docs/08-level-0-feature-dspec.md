---
layout: default
title: Level-0 Feature dspec
nav_order: 9
---

# Level‑0 — Feature dspec (Conceptual)

---

**💡 Tip: Varying Consistency Demands**

While a **Domain Invariant** represents a universal business rule within its Bounded Context, the **Consistency Demand** specified in a Level‑0 Feature dspec acknowledges that its enforcement _strictness_ can vary depending on the feature's specific context, user experience requirements, and the cost of violation versus the cost of enforcement.

**Example: "Unique Username" Invariant**

- **Invariant:** `Username must be unique across all active user accounts.`

- **Feature A: New User Registration**

  - **Context:** A user signs up interactively.
  - **Consistency Demand:** `strength: write-time` (or `read-your-write`).
  - **Justification:** The system must immediately verify username uniqueness and provide feedback. A temporary violation (allowing a duplicate to exist for even a short period) would lead to a poor user experience and data integrity issues. The cost of a strict, synchronous check is acceptable.

- **Feature B: Bulk User Import (Enterprise Migration)**
  - **Context:** Importing 100,000 users from a legacy system.
  - **Consistency Demand:** `strength: eventual` (or `tolerance: ≤ PT1H`).
  - **Justification:** Performing 100,000 synchronous, strict uniqueness checks would be prohibitively slow and potentially cause timeouts. The business might accept that duplicate usernames could temporarily exist in the system during the import process, with a background job resolving conflicts (e.g., appending numbers to make them unique: `john.doe_1`, `john.doe_2`). The cost of temporary violation is low compared to the cost of strict enforcement for this specific bulk operation.

This distinction allows DSpec to capture the ideal state (the invariant) while also specifying pragmatic, feature-specific enforcement requirements.

### Simple Example: Passwordless Login (Level‑0)

```yaml
meta:
  id: feature.passwordless-login
  name: Passwordless login via magic link
  owner: Identity Team
  version: 0.3.1
  relates_to_domain: identity

what:
  intent: >
    Allow users to authenticate without passwords by sending a time-bound,
    single-use magic link to a verified address.
  domain_refs:
    glossary: domains/identity.domain.json#glossary
    lifecycles: domains/identity.domain.json#lifecycles.MagicLink
    events: domains/identity.domain.json#events
  scope:
    in: ['request link', 'deliver link', 'redeem link to authenticate']
    out: ['MFA enrollment', 'account recovery']

boundaries:
  domain_invariants:
    - id: link-single-use
      rule: 'A magic link can be redeemed at most once.'
      moment_of_truth: 'MagicLinkRedeemed'
      consistency_demand:
        scope: 'link'
        strength: 'write-time'
        tolerance: 'none'
    - id: link-expiry
      rule: 'A magic link expires after TTL and cannot be redeemed thereafter.'
      moment_of_truth: 'MagicLinkRedeemed'
      consistency_demand:
        scope: 'link'
        strength: 'write-time'
        tolerance: 'none'
  policy_and_regulatory:
    - 'Respect user notification preferences.'
  system_constraints:
    - 'Email delivery can be delayed; UX must handle late arrivals.'
  explicit_exclusions:
    - 'No SMS links.'

success:
  acceptance_criteria:
    - id: ac-001
      statement: 'Valid, unexpired link authenticates the intended user.'
    - id: ac-002
      statement: 'Redeeming an already-used link fails with a harmless error.'
    - id: ac-003
      statement: 'Expired link cannot authenticate.'
  quality_criteria:
    - 'P95 link delivery confirmation ≤ 60s (staging).'
  verification:
    type: 'executable'
    artifacts: ['tests/identity/passwordless-login.feature']

dependencies:
  upstream: ['feature.user-verification']
  downstream: ['feature.session-issuance']
```

### Product Catalog: Brand/Product/Variant (Feature)

[See full example in `examples/catalog/level0.yaml`](/examples/catalog/level0.yaml)
