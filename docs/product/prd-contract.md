---
title: PRD and acceptance-criteria contract
status: v0
---

# PRD and Acceptance-Criteria Contract

This contract defines the product artifact that downstream layers cite. It is a product-format
contract, not a design method, planning method, schema, CLI, or runtime behavior.

## Purpose

A PRD records the product outcome a change should create and the acceptance criteria that prove the
outcome is satisfied. Stable acceptance-criteria IDs are the cross-layer citation surface:
Technical Design and Planning cite those IDs, not Product-layer implementation details.

## Required Sections

Every PRD that follows this contract includes these sections:

| Section                 | Owns                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Product outcome         | The desired user or operator outcome in product language.                               |
| User job                | The job, decision, or workflow the intended user is trying to complete.                 |
| Acceptance criteria     | Stable, ID'd criteria that define externally recognizable success.                      |
| Constraints             | Product, policy, compatibility, rollout, or operational limits the solution must honor. |
| Assumptions             | Load-bearing beliefs that should be tested or reviewed.                                 |
| Non-goals               | Explicitly excluded outcomes or audiences.                                              |
| Downstream citation map | Guidance for what Technical Design and Planning may cite.                               |

## Product Outcome and User Job

The product outcome states what improves for the user or operator. It should be phrased as an
observable result, not as a solution shape.

The user job names who benefits and what they are trying to do. It can include context, triggers,
and friction, but it must not prescribe technical architecture or execution sequencing.

## Acceptance Criteria

Acceptance criteria are product-owned success checks. They must be:

- externally meaningful to the user, operator, or reviewing owner;
- traceable to the product outcome or user job;
- written without requiring a specific implementation package, CLI command, design pattern, or
  delivery plan;
- stable enough for downstream citation.

### ID Format

Each criterion has an ID:

```text
AC-<topic>-<number>
```

Rules:

- `<topic>` is an uppercase mnemonic for the product area, usually 2-8 letters.
- `<number>` is a zero-padded sequence within the topic, starting at `001`.
- IDs are unique within one PRD.
- IDs are never reused after publication, even if a criterion is removed.

Examples:

- `AC-PRD-001`
- `AC-ID-002`
- `AC-CITE-001`

## ID Stability and Supersession

An acceptance-criteria ID is stable once another artifact can cite it.

- Edit text in place only for clarifications that do not change the criterion's meaning.
- If the meaning changes, create a new ID and mark the old ID as `Superseded by AC-...`.
- If a criterion no longer applies, keep the ID in the PRD and mark it `Withdrawn`, with a reason.
- Do not renumber criteria to close gaps.
- Downstream artifacts citing a superseded or withdrawn ID must update deliberately; they should not
  silently reinterpret the old ID.

## Constraints

Constraints describe limits the solution must respect. They may come from product policy,
compatibility, migration posture, user trust, timing, cost, or organizational boundaries.

Constraints are not acceptance criteria unless satisfying them is itself a user-visible success
condition.

## Assumptions

Assumptions are load-bearing beliefs. Each assumption should be reviewable, testable, or disposable.
If disproven, it should be clear which outcome, criterion, constraint, or non-goal must be revisited.

## Non-Goals

Non-goals prevent downstream layers from inventing scope. They state what this PRD does not promise,
even when that work is adjacent or likely to be useful later.

## Downstream Citation Rules

Technical Design and Planning may cite:

- PRD title and stable artifact path or URL;
- product outcome and user job summaries;
- acceptance-criteria IDs and their text;
- constraints, assumptions, and non-goals;
- supersession or withdrawal state for an acceptance-criteria ID.

Technical Design and Planning must not depend on:

- Product-layer implementation internals;
- future Product-layer workflow mechanics, CLIs, schemas, validators, skills, or evals;
- prose ordering outside the required sections;
- unpublished scratch notes or local-only artifacts;
- acceptance-criteria IDs whose meaning they reinterpret locally.

## Minimal PRD Shape

Use this outline for a PRD:

```md
# <Product or Feature Name> PRD

## Product Outcome

## User Job

## Acceptance Criteria

| ID         | Criterion | Status |
| ---------- | --------- | ------ |
| AC-XXX-001 | ...       | Active |

## Constraints

## Assumptions

## Non-Goals

## Downstream Citation Map
```

The example fixture in [`examples/minimal-prd.md`](./examples/minimal-prd.md) shows the contract in
use without defining design or planning mechanics.
