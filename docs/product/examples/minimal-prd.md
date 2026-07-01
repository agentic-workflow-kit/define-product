---
title: Minimal PRD example
status: example
---

# Minimal PRD Example

This fixture demonstrates the PRD and acceptance-criteria contract. It is intentionally small and
does not define design or planning mechanics.

## Product Outcome

Product owners can publish a compact PRD whose acceptance criteria are stable enough for Technical
Design and Planning to cite.

## User Job

As a product owner, I need to record what outcome a change should create and how success will be
recognized, so downstream agents preserve intent when they design and plan the work.

## Acceptance Criteria

| ID           | Criterion                                                                                                                                                               | Status |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| AC-PRD-001   | The PRD states the product outcome and user job before any design or planning commitment.                                                                               | Active |
| AC-ID-001    | Each acceptance criterion has a stable ID that downstream artifacts can cite.                                                                                           | Active |
| AC-SCOPE-001 | The PRD names constraints, assumptions, and non-goals so downstream layers do not invent scope.                                                                         | Active |
| AC-CITE-001  | Technical Design and Planning can cite the published product facts and acceptance-criteria IDs without reading implementation internals or reinterpreting them locally. | Active |

## Constraints

- The PRD stays at product altitude and does not prescribe architecture, package layout, CLI
  behavior, schema internals, or delivery sequencing.
- Acceptance criteria describe recognizable product success, not delivery tasks.

## Assumptions

- Inferred: Downstream artifacts can preserve product traceability if they cite stable
  acceptance-criteria IDs and published product facts directly.
- Gap/default: No additional product-policy constraints are known beyond the stated non-goals; if one
  appears, the PRD must revise its constraints and affected acceptance criteria explicitly.

## Non-Goals

- No design-to-plan mechanics.
- No schema validator, CLI, skill runtime, package exports, or eval framework.
- No migration of legacy workflow-kit artifacts.

## Downstream Citation Map

- Technical Design may cite the Product Outcome, User Job, and exact IDs `AC-PRD-001`,
  `AC-ID-001`, `AC-SCOPE-001`, and `AC-CITE-001` when reconciling design decisions to product
  intent.
- Planning may cite the same IDs and the published assumptions above as assumptions; it must not
  promote them to settled fact or infer implementation behavior from this PRD.
