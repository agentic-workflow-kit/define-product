---
title: define-product — product
status: draft — product layer
---

# define-product — product

`define-product` helps a product owner turn intent into a clear, reviewable **PRD** — the _what_ and
_why_ of a change — with stable, ID'd acceptance criteria that make success externally recognizable
and easy to cite. It stands on its own as a standalone tool or independent skills pack — a sharp PRD is worth having whether or not you use anything else — and it doubles as the **Product layer** at the head of the agentic-workflow-kit suite, where the downstream layers cite its acceptance-criteria IDs.

This page is the **product overview** for `define-product`: who it serves, what job it does, where
its boundaries are, and how you can tell it is working. The authoritative product definition — the
ID'd requirements, acceptance criteria, constraints, assumptions, and non-goals the design step
reconciles to — is the [PRD](./define-product.md). Product owns _what and why_; design and delivery
own _how_. For the artifact _format_ this layer produces, see [`prd-contract.md`](./prd-contract.md)
and the [minimal example](./examples/minimal-prd.md); for _how_ those mechanics are designed, see
[`../design/`](../design/).

## Product Spine

| Question            | Product answer                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User                | A product owner with the judgment to say what a change should achieve, who needs that intent captured before design or delivery begins.                  |
| Job                 | Turn that intent into a reviewable product definition — outcome, user job, recognizable success — with stable, ID'd acceptance criteria others can cite. |
| Current alternative | A vague brief, a ticket, or straight-to-code, with the real product definition reconstructed later from the diff, if at all.                             |
| Before              | Whoever builds it cannot tell what success means or trace it; ambiguity compounds into a faithful build of the wrong thing.                              |
| After               | Outcome, audience, and success are stated once, at the cheapest moment to review, as criteria others can cite by stable ID.                              |
| Non-fit             | Not a design or architecture tool, a delivery planner, a project manager, or a substitute for the owner's product judgment.                              |

## Standalone, and in the suite

Use `define-product` on its own whenever you need a product definition you can stand behind: it
produces a durable PRD with recognizable, citable acceptance criteria and needs nothing else to be
useful.

It is also the first stage of the agentic-workflow-kit suite, where the later layers cite its
acceptance-criteria IDs:

```text
define-product  ->  technical-design  ->  design-to-plan  ->  jig (run)  ->  learning loop
```

- **define-product** owns _what and why_ — the product outcome, user job, constraints, assumptions,
  non-goals, and ID'd acceptance criteria.
- **technical-design** and **design-to-plan** may cite acceptance-criteria IDs when reconciling their
  work to product intent; they must not read Product-layer internals.
- **jig** lands work only on evidence, checked against execution-plan conditions that trace back to
  those product ACs.

Even inside the suite, the upstream position is a strong default, not a gate: bring your own PRD and
the suite accepts it at any stage. Either way, `define-product`'s only outward contract is the [PRD /
acceptance-criteria-ID format](./prd-contract.md).

## Why it matters

Everything built from a PRD inherits its clarity. A vague product definition does not stop the work —
it produces a faithful build of the wrong thing: whoever designs, plans, and builds it inherits the
ambiguity and carries a well-structured effort in the wrong direction. (In the suite that chain is
technical-design, planning, and Jig — but the failure is the same on any team.) By then the mistake
is expensive.

The most common delivery failure is not a broken build; it is a correct build of a misunderstood
goal. `define-product` addresses that at the source — before any architecture or story decomposition
— by making the owner state the outcome, the audience, and recognizable success once, at the cheapest
possible moment to review it. **The evidence thread starts here:** the ID'd acceptance criteria
written now are what everything downstream is checked against — and in the suite, design and planning
carry those criteria forward into the execution plan, whose checks Jig's gates evaluate on evidence.

## What it does

- **Elicits minimally.** It asks only the questions that block a coherent PRD and records every other
  unknown as a stated, reviewable assumption — a complete PRD, not an exhaustive interview.
- **Produces the PRD.** A durable, structured artifact stating the product outcome, user job, ID'd
  acceptance criteria, constraints, assumptions, and non-goals — one that stands alone without the
  session that produced it.
- **Makes criteria checkable.** Acceptance criteria are ID'd for stable downstream citation and
  describe externally recognizable success, so a reviewer can tell whether they hold rather than
  parse prose intentions. The [PRD contract](./prd-contract.md) is the authority on that format.

The authoritative, ID'd requirements behind these behaviors are the acceptance criteria in the
[PRD](./define-product.md#acceptance-criteria).

### Guide, not gate

`define-product` encodes a product practice as a repeatable starting point, not a mandate. It is an
optional strong default: it structures and fills in around what the owner supplies, and the suite
still accepts a product definition authored any other way. The kit enables the owner's path; it does
not require this one.

## Product Boundaries

Product owns outcomes, user jobs, constraints, assumptions, non-goals, and acceptance criteria. It
does not prescribe architecture, packages, CLI behavior, schemas, or execution sequencing — those are
design- and delivery-owned.

Downstream layers cite acceptance-criteria IDs and the published contract; they must not depend on
Product-layer prose ordering, future tooling, or local implementation details. The [PRD
contract](./prd-contract.md) states the full citation rules and the ID stability and supersession
model, and the PRD's [Constraints](./define-product.md#constraints) are the authoritative list.

## What define-product isn't (yet)

Honest edges — deliberate non-goals and deferrals, not gaps. The
[PRD](./define-product.md#non-goals) carries the authoritative non-goals:

- **Not a validator, CLI, skill runtime, or eval framework.** The contract is documentation today;
  the mechanics are now specified in [`../design/`](../design/), and building them is future work.
- **It does not decide what to build.** The owner's product judgment is the required input;
  `define-product` makes it explicit and durable — it amplifies judgment, it does not supply it.
- **It does not guarantee good criteria.** It holds acceptance criteria to a _shape_ — ID'd,
  checkable, stable — but the _substance_ of each criterion is the owner's to set well; a careless
  one can still pass vacuously.
- **No legacy migration.** It does not migrate `workflow-kit` prototype artifacts.

## Success and counter-signals

**Success looks like:**

- An owner states the product outcome and success once, and others cite it by stable ID instead of
  guessing.
- Whoever designs and plans the work reconciles to the PRD without reading Product-layer internals.
- Scope is bounded — constraints, assumptions, and non-goals stated — so no one downstream invents it.

**Counter-signals look like:**

- PRDs restate design or prescribe architecture instead of staying at product altitude.
- Acceptance criteria read as prose intentions rather than externally recognizable success.
- A downstream artifact reinterprets an acceptance-criteria ID locally instead of citing its
  published meaning.

## Open questions

- How much of the authoring flow — elicitation, drafting, templates — should become a shipped skill
  versus remain guidance? The v0.7 `agentic-workflow-kit:define-product` skill is prior art, not the
  settled target shape.
- Which parts of the contract, if any, warrant machine-checkable validation rather than documented
  convention.

## Status

Seeded for M3, with the product defined and its design step now taken. The overview above, the
[PRD](./define-product.md) (requirements and ID'd acceptance criteria), and the outward
[acceptance-criteria-ID contract](./prd-contract.md) are defined; the [design layer](../design/)
derives the mechanics from them, and the skills and runtime it commits to are future build work.

## Related

- [`define-product.md`](./define-product.md) — the PRD: the authoritative product definition and ID'd
  acceptance criteria the design step reconciles to.
- [`prd-contract.md`](./prd-contract.md) — the outward contract (PRD / acceptance-criteria-ID format)
  downstream layers cite.
- [`examples/minimal-prd.md`](./examples/minimal-prd.md) — a concrete PRD using the contract.
- [`../design/`](../design/) — how the Product-layer mechanics are designed (the technical design
  derived from this PRD).

> **Provenance.** This product layer productizes the v0.7 `agentic-workflow-kit:define-product` skill
> and draws on the retiring `workflow-kit` prototype. Both are reference-only; this repo is the
> canonical home for the product contract.
