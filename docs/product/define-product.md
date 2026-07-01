---
title: define-product PRD
status: v0
---

# define-product PRD

This is the product definition for **define-product the tool** — the authoritative source of its
requirements, acceptance criteria, constraints, assumptions, and non-goals. The [product
overview](./README.md) narrates the _what and why_ for readers; this PRD is what the design step
reconciles to. It conforms to this repo's own [PRD / acceptance-criteria-ID
contract](./prd-contract.md); that contract is the seam define-product produces to, not the thing
this PRD designs.

**Product identity.** define-product is an AI-assisted authoring tool that turns a product owner's
intent into a clear, reviewable PRD. It is meant to be useful two ways: **on its own**, for anyone
who needs a sharp product definition, and as the **Product layer** of the
agentic-workflow-kit suite — in both cases producing a PRD that conforms to the
[acceptance-criteria-ID contract](./prd-contract.md). Its concrete form — a skill, a CLI, a service,
or an embedded flow — is a design decision, not a product one (see Non-Goals).

## Product Outcome

A product owner can turn intent into a reviewable product definition — the product outcome, the user
job, and recognizable success — and review it once, at the cheapest moment, instead of reconstructing
it later from a diff. The definition's acceptance criteria carry stable IDs, so any later reader,
tool, or teammate cites product intent by ID rather than re-interpreting it; in the
agentic-workflow-kit suite, Technical Design and Planning cite those same IDs.

## User Job

A product owner with the judgment to say what a change should achieve needs that intent captured as a
durable, structured PRD before any architecture or story decomposition. They have notes, a brief, or
answers in their head — not a finished document — and they want the tool to draft what their material
supports, ask only what it genuinely cannot proceed without, and produce a definition that stands on
its own and that others — a teammate or a downstream tool — can cite by ID.

## Acceptance Criteria

| ID              | Criterion                                                                                                                                                                                                           | Status |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| AC-ELICIT-001   | define-product asks only the questions that block a coherent PRD; it does not run an exhaustive interview when the supplied material already answers a section.                                                     | Active |
| AC-ELICIT-002   | Every non-blocking unknown is recorded as a stated, reviewable assumption in the PRD rather than left silent or resolved without the owner's visibility.                                                            | Active |
| AC-GROUND-001   | define-product distinguishes owner-supplied intent, inferred assumptions, unresolved gaps, and conflicting source material, and does not silently invent or resolve product facts without the owner's visibility.   | Active |
| AC-PRD-001      | The output is a PRD that covers every required section of [`prd-contract.md`](./prd-contract.md): product outcome, user job, acceptance criteria, constraints, assumptions, non-goals, and downstream citation map. | Active |
| AC-PRD-002      | The produced PRD is a durable, standalone artifact — it can be read and acted on without the session that produced it.                                                                                              | Active |
| AC-ID-001       | Every acceptance criterion in a produced PRD carries a stable ID that follows the contract's ID format and stability rules, so downstream artifacts can cite it.                                                    | Active |
| AC-CHECK-001    | Every acceptance criterion in a produced PRD describes externally recognizable success a reviewer can tell holds or not — not a prose intention.                                                                    | Active |
| AC-TEMPLATE-001 | define-product offers a repeatable starting point covering every required contract section, as a default to adapt rather than a fixed form to obey.                                                                 | Active |
| AC-GUIDE-001    | define-product surfaces guidance on why each section matters and the failure modes it prevents; the guidance is recommended, not enforced, and the tool does not block on ignoring it.                              | Active |
| AC-SCOPE-001    | define-product keeps output at product altitude — it does not prescribe architecture, packages, CLI or command behavior, schemas, or execution sequencing, and it does not decide what to build for the owner.      | Active |

## Constraints

- define-product conforms to, and does not redefine, the PRD / acceptance-criteria-ID contract in
  [`prd-contract.md`](./prd-contract.md). That contract is the owned cross-repo seam it produces to;
  changing the contract's shape is a separate, cross-repo event, not part of building this tool.
- Produced PRDs stay at product altitude. The technical _how_ is decided downstream by Technical
  Design and Planning.
- define-product is an optional strong default: the suite accepts a product definition authored any
  other way, and define-product does not gate entry to design or delivery.
- Human product judgment is a required input. define-product elicits and structures it; it does not
  supply it.
- The legacy `workflow-kit` define-product material and the v0.7 `agentic-workflow-kit:define-product`
  skill are prior art only — reference, not authority, and not ported wholesale.

## Assumptions

- Owners can supply enough intent — notes, a brief, existing docs, or answers to blocking questions —
  for a coherent PRD to be drafted.
- Downstream layers preserve product traceability by citing stable acceptance-criteria IDs rather
  than re-reading Product-layer internals.
- A product-altitude PRD, with no design mechanics, is enough for the design step to begin; richer
  authoring tooling can be designed later without reopening these product decisions.
- The required sections and ID rules in [`prd-contract.md`](./prd-contract.md) are stable enough to
  author produced PRDs against.

## Non-Goals

- Designing or implementing the authoring runtime, CLI, skill package, schema, validator, or eval
  harness — the tool's concrete form and mechanics are design- and implementation-owned.
- Deciding technical architecture, packages, or execution sequencing for the owner's product.
- Planning delivery decomposition or running execution — in the suite, those are `design-to-plan`
  and Jig.
- Migrating legacy `workflow-kit` artifacts.
- Guaranteeing the substance of an owner's criteria — define-product holds criteria to a checkable
  shape, but a careless author can still write one that passes vacuously.

## Downstream Citation Map

In the agentic-workflow-kit suite, Technical Design and Planning — and any other tool that consumes
this PRD — may cite:

- this PRD's title and path;
- the Product Outcome and User Job summaries;
- acceptance-criteria IDs `AC-ELICIT-001`, `AC-ELICIT-002`, `AC-GROUND-001`, `AC-PRD-001`,
  `AC-PRD-002`, `AC-ID-001`, `AC-CHECK-001`, `AC-TEMPLATE-001`, `AC-GUIDE-001`, and `AC-SCOPE-001`;
- the constraints, assumptions, and non-goals above.

Downstream artifacts must not treat this PRD as a runtime contract, a design for the authoring tool,
or authority to bypass the [`prd-contract.md`](./prd-contract.md) seam.
