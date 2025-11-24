---
layout: default
title: Spec Levels at a Glance
nav_order: 6
---

# Spec Levels at a Glance

| Level | Name                     | Audience              | Purpose                                                                                        | Contains                     |
| ----- | ------------------------ | --------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| 0     | **Feature dspec**        | Product + Engineering | Define intent, domain semantics, invariants, consistency demands, scope, and success criteria. | **No boundaries/mechanisms** |
| 1     | **Design dspec**         | Engineering           | Define consistency groups (aggregates), commands, and enforcement mechanisms for invariants.   | Design, not tools            |
| 2     | **Implementation dspec** | Engineering + Ops     | Bind design to APIs, schemas, infrastructure, SLOs, and tests.                                 | Tools, transports, formats   |
