# DSpec Framework/Specification — Complete Guide (v0.4.0)

**Version:** 0.4.0

DSpec is a lightweight, human‑readable, way to drive software development from layered declarative specifications.

The aim is to provide a structured way to declare feature specifications that will remain clear and human readable, such that development can be fully driven from the

---

## Table of Contents

1. [Purpose & Scope](#purpose--scope)
2. [Relation to WBS](#relation-to-wbs)
3. [Core Principles](#core-principles)
4. [Events‑as‑Facts vs Messages](#events-as-facts-vs-messages)
5. [Spec Levels at a Glance](#spec-levels-at-a-glance)
6. [Bounded Contexts & Domain Models](#bounded-contexts--domain-models)
7. [Domain Models (Conceptual) — Examples](#domain-models-conceptual--examples)
   - [Identity](#identity-conceptual)
   - [E‑Commerce: Order‑to‑Cash](#e-commerce-order-to-cash-conceptual)
   - [CRM: Sales‑to‑Contract](#crm-sales-to-contract-conceptual)
   - [Product Catalog: Brand/Product/Variant](#product-catalog-brandproductvariant-conceptual)
8. [Level‑0 — Feature dspec (Conceptual)](#level-0--feature-dspec-conceptual)
   - [Simple Example: Passwordless Login](#simple-example-passwordless-login-level-0)
   - [Example Level‑0 Feature: Publish Product](#example-level-0-feature-publish-product)
9. [Level‑1 — Design dspec (Consistency Groups, Commands & Mechanisms)](#level-1--design-dspec-consistency-groups-commands--mechanisms)
   - [Identity Commands](#identity-commands)
   - [E‑commerce Commands](#e-commerce-commands)
   - [Catalog Commands](#catalog-commands)
   - [CRM Commands](#crm-commands)
10. [Level‑2 — Implementation dspec (Technology Binding)](#level-2--implementation-dspec-technology-binding)
11. [Why Aggregates Aren’t Included at Level‑0](#why-aggregates-arent-included-at-level-0)
12. [Traceability & Governance](#traceability--governance)
13. [Adoption Guide (Quick Start)](#adoption-guide-quick-start)
14. [Appendix A — JSON Schemas](#appendix-a--json-schemas)
15. [Appendix B — Level‑0 Checklist](#appendix-b--level-0-checklist)
16. [Appendix C — Pattern Library: From Invariant to Mechanism](#appendix-c--pattern-library-from-invariant-to-mechanism)

---

## Purpose & Scope

DSpec lets teams describe features in **short, declarative specs** that are readable by humans and consumable by tools and in particular, by AI Agents. Specs progressively constrain the solution space—from business intent (Level‑0) to design (Level‑1) and then to concrete technology (Level‑2)—**without** polluting earlier layers with implementation details.

- Preserve **domain meaning** at Level‑0.
- Apply **constructive constraints** to reduce the solution space before building.
- Define **necessary & sufficient** success criteria so validity is checkable, not subjective.

---

## Relation to WBS

WBS comprises three interlocking components: **What** (intent/space), **Boundaries** (hard constraints that _eliminate_ invalid solutions), and **Success** (criteria that are **necessary and sufficient**). DSpec maps directly onto this: Level‑0 captures the **What** and the domain **Boundaries** (as invariants and their demands) without mechanism; later levels commit to designs and verifications.

---

## Core Principles

1. **Separate meaning from mechanism.** Level‑0 records **facts, lifecycles, invariants** and **consistency demands**; Level‑1 chooses **consistency groups**, **commands**, and **mechanisms**; Level‑2 binds to technology.
2. **Progressive constraint.** Each level narrows the solution space while keeping earlier layers stable—exactly the WBS move from **What** → **Boundaries** → **Success**.
3. **Deterministic validation.** Success criteria at each level are _necessary & sufficient_; anything meeting them is valid, and anything valid must meet them.
4. **Composability & traceability.** Domain artifacts are shared; features reference only what they need.

---

## Events‑as‑Facts vs Messages

“Events” can mean two different things:

- **Domain facts**: business‑level occurrences that change lifecycle or invariants (Level‑0).
- **Integration messages**: serialized payloads and transports (Level‑2).

At **Level‑0**, list **facts** (with minimal roles/obligations), not message shapes. This keeps the model **implementation‑agnostic** while still constraining the solution space per WBS.

---

## Spec Levels at a Glance

| Level | Name                     | Audience              | Purpose                                                      | Contains                     |
| ----- | ------------------------ | --------------------- | ------------------------------------------------------------ | ---------------------------- |
| 0     | **Feature dspec**        | Product + Engineering | Define intent, domain semantics, invariants, consistency demands, scope, and success criteria. | **No boundaries/mechanisms** |
| 1     | **Design dspec**         | Engineering           | Define consistency groups (aggregates), commands, and enforcement mechanisms for invariants. | Design, not tools            |
| 2     | **Implementation dspec** | Engineering + Ops     | Bind design to APIs, schemas, infrastructure, SLOs, and tests. | Tools, transports, formats   |

---

## Bounded Contexts & Domain Models

A **Bounded Context** is a linguistic and semantic boundary within which a specific **Domain Model** applies validly and consistently. It is effectively a group of Features that share a common language and set of rules.

In DSpec, a Feature does not exist in a vacuum; it resides within a Bounded Context. This implies a critical workflow constraint: **The Domain Model should be worked out (at least partially) even before the Level‑0 spec for the feature.**

### The Domain Model Components

Within a Bounded Context, the Domain Model consists of:

1.  **Glossary:** Ubiquitous language (e.g., "User", "Order") with precise definitions valid _only_ within this context.
2.  **Lifecycles:** State machines for key entities (e.g., `Order: Draft -> Submitted`).
3.  **Invariants (Definitions):** The canonical library of business rules that must always be true (e.g., "Price cannot be negative").
4.  **Events (Facts):** Things that have happened (e.g., `OrderSubmitted`).

**Where do Invariants live?**
There is often confusion here.

- The **Domain Model** holds the **Definition** (ID + Rule Text). It is the "Library of Laws" for the context.
- The **Level‑0 Spec** holds the **Application** (Reference + Consistency Demand). It selects which laws are relevant boundaries for _this specific feature_ and defines how strictly they must be checked (Consistency Demand).

**Why this matters:** You cannot specify a feature's "Intent" or "Boundaries" (Level‑0) if you haven't agreed on the nouns, verbs, and rules of the world (Domain Model) it operates in.

**Note for Developers New to DDD:** For solo developers or small/medium projects, the initial understanding can be simplified: assume your entire project is a single Bounded Context. This means there's one overarching Domain Model that underpins all your features. You can then introduce explicit Bounded Context separation later as your project scales and different parts of your domain naturally diverge.

---

## Domain Models (Conceptual) — Examples

> **Runtime note:** The agent team now persists domain models as JSON files conforming to
> `specs/schemas/domain-model.schema.json`, and auto-hydrates each Level‑0 spec’s
> `what.domain_refs` with anchors into the persisted `<slug>.domain.json`. The conceptual examples
> below remain in YAML for readability—the structure is identical.

### Identity (Conceptual)

```yaml
# domains/identity.domain.json (conceptual)
meta:
  id: identity
  version: 0.1.0
  owner: Identity Team

glossary:
  User: "A uniquely identified account holder"
  MagicLink: "A single-use, time-bound authentication link"

lifecycles:
  MagicLink:
    states: ["Issued", "Redeemed", "Expired"]
    transitions:
      - "Issued -> Redeemed"
      - "Issued -> Expired"

invariants:
  - id: link-single-use
    rule: "A MagicLink in Redeemed|Expired cannot transition again"
  - id: link-expiry
    rule: "A MagicLink becomes Expired after its configured TTL elapses"

events:  # domain facts; roles only
  MagicLinkIssued(subject: MagicLink, occurred: Time)
  MagicLinkRedeemed(subject: MagicLink, occurred: Time)
  MagicLinkExpired(subject: MagicLink, occurred: Time)
```

### E‑Commerce: Order‑to‑Cash (Conceptual)

[See full example in `examples/ecommerce/domain-model.yaml`](examples/ecommerce/domain-model.yaml)

### CRM: Sales‑to‑Contract (Conceptual)

[See full example in `examples/crm/domain-model.yaml`](examples/crm/domain-model.yaml)

### Product Catalog: Brand/Product/Variant (Conceptual)

[See full example in `examples/catalog/domain-model.yaml`](examples/catalog/domain-model.yaml)

---

## Level‑0 — Feature dspec (Conceptual)

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

### Example Level‑0 Feature: Publish Product

[See full example in `examples/catalog/level0.yaml`](examples/catalog/level0.yaml)

---

## Level‑1 — Design dspec (Consistency Groups, Commands & Mechanisms)

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

[See full example in `examples/ecommerce/level1.yaml`](examples/ecommerce/level1.yaml)

### Catalog Commands

[See full example in `examples/catalog/level1.yaml`](examples/catalog/level1.yaml)

### CRM Commands

[See full example in `examples/crm/level1.yaml`](examples/crm/level1.yaml)

---

## Level‑2 — Implementation dspec (Technology Binding)

---

## Why Aggregates Aren’t Included at Level‑0

- **Aggregate = mechanism, not meaning.** Aggregates (consistency groups) are **design‑time** choices for how you keep rules true. Level‑0 defines _which rules_ must be true and _when_ (the **consistency intent**), not how.
- **Premature boundaries distort models.** Locking in boundaries before you know volumes, hotspots, and latency windows often couples the model to storage/memory limits.
- **WBS alignment.** Level‑0 should define **What** and **Boundaries** as constraints on meaning (invariants and their strictness), letting later stages pick mechanisms. This preserves **constructive constraint** and avoids over‑specifying early.

**Rule of thumb:** Decide boundaries only after you know (1) the invariants, (2) the **moments of truth** where they must hold, and (3) the scale/latency drivers. Then map each invariant to a mechanism at Level‑1.

---

---

## Traceability & Governance

- **ID lineage:** Each Level‑1/2 spec `extends` its Level‑0 parent.
- **Invariant mapping:** Every Level‑0 invariant ID maps to a **mechanism** at Level‑1 and to **tests/SLIs** at Level‑2.
- **Command trace:** Command ⟶ Events ⟶ Tests is a required mapping.
- **ADRs:** Decisions with trade‑offs are captured as ADRs and linked from specs.
- **Change policy:** Breaking changes to Level‑0 invariants or their strictness require review and version bump.
- **Success as gate:** CI/CD blocks promotion unless Level‑2 Success checks pass (contracts, e2e, SLO probes).

---

## Adoption Guide (Quick Start)

1.  **Identify the Bounded Context** (e.g., "Identity", "Catalog").
2.  **Define/Curate the Domain Model** (Glossary, Lifecycles, Invariants) for that context.
3.  **Author a Level‑0 dspec** for one feature, referencing the Domain Model.
4.  Annotate **invariants** with **moment_of_truth** and **consistency_demand**.
5.  Draft a **Level‑1 design dspec** mapping invariants → mechanisms and defining **commands**.
6.  Bind **Level‑2** (APIs, schemas, SLOs, tests).
7.  Add a CI gate on Level‑2 **Success**.
8.  Iterate: move details **down**, never **up**.

---

## Appendix A — JSON Schemas

For validation and tooling, use the canonical JSON schemas provided in the `schemas/` directory relative to this guide:

- **Domain Model:** [`schemas/domain-model.schema.json`](schemas/domain-model.schema.json)
- **Level-0 (Feature):** [`schemas/level0.schema.json`](schemas/level0.schema.json)
- **Level-1 (Design):** [`schemas/level1.schema.json`](schemas/level1.schema.json)
- **Level-2 (Implementation):** [`schemas/level2.schema.json`](schemas/level2.schema.json)

---

## Appendix B — Level‑0 Checklist

- [ ] **Intent** is clear and business‑framed.
- [ ] **Domain refs** link to glossary, lifecycles, and conceptual events.
- [ ] **Scope** says what’s in/out.
- [ ] **Invariants** have **moment_of_truth** and **consistency_demand** where relevant.
- [ ] **No boundaries/mechanisms** (no aggregates, transactions, or schemas).
- [ ] **Success** uses necessary & sufficient acceptance criteria.
- [ ] **Verification** points to executable checks where feasible.
- [ ] **System constraints** note volumes, rates, and data gravity that inform Level‑1.

---

## Appendix C — Pattern Library: From Invariant to Mechanism

Given a Level‑0 invariant + demand, Level‑1 can choose among patterns (non‑exclusive):

- **Partitioned unique index (single‑writer per key)** — Fast, scalable enforcement for uniqueness rules.
- **Reservation then confirm (claim service)** — Two‑phase claim for hot keys; great when concurrent creates are common.
- **DB uniqueness + idempotency + outbox** — Pragmatic, simple; keep design boundary small and let the DB enforce.
- **Saga + compensation** — For cross‑system invariants when temporary exposure is tolerable.
- **CRDT/merge** — When eventual convergence is acceptable and partitions are possible.

Choose based on throughput, contention, latency windows, failure modes, and operability.

---

**WBS alignment reminder:** Level‑0 defines **What** and **domain Boundaries** as constraints on meaning (invariants + strictness) while avoiding mechanism; **Success** criteria remain necessary & sufficient at each level. This preserves WBS’s constructive constraint while keeping early specs human‑readable and tool‑friendly.
