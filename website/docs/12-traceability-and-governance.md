---
layout: default
title: Traceability & ID Stability
nav_order: 13
---

# Traceability & ID Stability

One of the core philosophies of the DSpec framework is that **specifications are code**. They are not just static documents for humans to read once and forget; they are active, living artifacts designed to be consumed by tooling, CI/CD pipelines, and **AI Agents**.

To enable this, DSpec enforces a rigorous system of **Stable Identifiers**.

## Why "IDs Everywhere"?

You will notice that almost every "leaf item" in a DSpec schema—whether it's a glossary term, a scope item, an invariant, or a quality criterion—requires a unique `id`.

### 1. Specs for Machines (and AI)
While DSpec is designed to be human-readable, it is primarily designed to be **machine-referenceable**.
*   **AI Agents:** When an AI agent analyzes your codebase to see if it meets requirements, it needs to link a specific function `validateEmail()` to a specific requirement `inv-email-format`. If the requirement is just a bullet point "Email must be valid", the link is fuzzy. If it is `id: inv.email.format`, the link is precise and verifiable.
*   **Tooling:** Verification tools can report "Requirement `req-123` failed" rather than "The second bullet point in the scope section failed."

### 2. Stability vs. Refinement
Text changes often. We refine wording, fix typos, or clarify "user" to "customer."
*   **Without IDs:** Changing the text breaks any links (comments, tests, tickets) pointing to that requirement.
*   **With IDs:** The text is just a label. The `id` is the anchor. You can completely rewrite the definition of `glossary.user`, and all code referencing `glossary.user` remains strictly linked to that concept.

## Traceability Chain

This ID system creates an unbroken chain of custody for requirements:

1.  **Level-0 (Intent):** Defines `id: feature.login` and Invariant `id: inv.unique-email`.
2.  **Level-1 (Design):** Extends `feature.login` and maps `inv.unique-email` to a Unique Index mechanism.
3.  **Level-2 (Implementation):** Extends `feature.login` and links the specific SQL migration file to `inv.unique-email`.
4.  **Tests:** Unit tests explicitly reference `inv.unique-email` in their docstrings or metadata.

## Best Practices for IDs

*   **Immutable:** Once an ID is assigned and referenced, treat it like a primary key in a database. Do not change it lightly.
*   **Machine-Friendly:** Use **kebab-case** (e.g., `unique-model-code`, `user-id`). Dot notation is permitted for structural hierarchy (e.g., `scope.publish`, `feature.catalog.publish-product`). Snake_case is deprecated.
*   **Structured (Optional):** Prefixes can help (e.g., `ac-001` for Acceptance Criteria, `inv-001` for Invariants, `scope.login` for Scope items).
*   **Opaque vs. Semantic:**
    *   *Semantic:* `inv.user.email-unique` (Easier to read, but risks becoming outdated if logic changes).
    *   *Opaque:* `inv.1024` (Perfectly stable, but requires lookup).
    *   *Recommendation:* Use **Semantic but Abstract** IDs (e.g., `inv.identity.uniqueness` rather than `inv.email.must-be-unique`).

## Governance

*   **Breaking Changes:** Deleting or renaming an ID is a breaking change. It requires a version bump of the spec and a review of all downstream dependencies (code, tests, other specs).
*   **Success as Gate:** CI/CD pipelines should block merging if code references a Spec ID that does not exist, or if a Spec ID exists that has no corresponding implementation/verification (coverage check).