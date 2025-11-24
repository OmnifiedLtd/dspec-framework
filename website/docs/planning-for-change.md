---
layout: default
title: Planning for Change
---

# Planning for Change

One of the primary strategic benefits of the DSpec framework is its ability to manage the **Rate of Change** in your software.

Not all parts of a software system change at the same speed. By separating your specifications into layers, DSpec aligns your documentation with the natural "shearing layers" of software evolution.

## The Shearing Layers of Software

Stewart Brand’s concept of "Shearing Layers" (from *How Buildings Learn*) applies perfectly to software. A building has a **Site** (eternal), **Structure** (50 years), **Services** (15 years), and **Stuff** (daily).

DSpec mirrors this stability gradient:

### 1. The Domain Model (The Foundation)
*   **Rate of Change:** Very Slow
*   **What it is:** The definitions of "User", "Account", "Transaction".
*   **Why it's stable:** The fundamental nature of your business doesn't change often. A "Bank Account" will always need a balance, regardless of whether you use SQL, NoSQL, or Blockchain.
*   **Benefit:** investing deeply here pays off forever. A robust Domain Model survives multiple rewrites of the code.

### 2. Level-0 Feature Spec (The Intent)
*   **Rate of Change:** Slow
*   **What it is:** "User places an order."
*   **Why it's stable:** User goals remain consistent even as technology shifts. The desire to "transfer money" exists whether you do it via a teller, a website, or a mobile app.
*   **Benefit:** These specs serve as a long-term "Contract of Behavior" that persists across redesigns.

### 3. Level-1 Design Spec (The Architecture)
*   **Rate of Change:** Medium
*   **What it is:** "Use a REST API," "Eventual Consistency," "Microservices."
*   **Why it changes:** As you scale, you might move from a Monolith to Microservices, or from synchronous to asynchronous processing.
*   **Benefit:** You can refactor your architecture without rewriting your business requirements (Level-0).

### 4. Level-2 Implementation Spec (The Code)
*   **Rate of Change:** Fast
*   **What it is:** "React Component," "Postgres Table `users_v2`," "Python Function."
*   **Why it changes:** Libraries update, frameworks fall out of fashion, databases are optimized.
*   **Benefit:** This layer is *disposable*. Because it is tightly constrained by the layers above, you can rewrite the implementation with confidence, knowing the constraints (Level-0 & Level-1) ensure correctness.

## The Strategy: Focus Energy on the Slow Parts

By recognizing these layers, teams can allocate their energy more effectively:

*   **Spend more time on the Domain Model & Level-0.** These are your assets. They represent the "Knowledge" of the system.
*   **Treat Level-2 as transient.** Don't get too attached to the implementation details. They will likely be rewritten in 2 years.

This structure prevents the common "Big Ball of Mud" problem, where a change to a UI library breaks a core business rule, because the two concerns were hopelessly intertwined.
