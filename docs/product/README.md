---
title: define-product — product
status: draft — product layer
---

# define-product — product

`define-product` is the **Product layer** at the head of the agentic-workflow-kit suite. It helps a
product owner turn intent into a **PRD** — the _what_ and _why_ of a change — with stable, ID'd
acceptance criteria — externally recognizable success checks — that every downstream layer
references.

This page is the **product overview** for `define-product`: who it serves, what job it does, where
its boundaries are, and how you can tell it is working. The authoritative product definition — the
ID'd requirements, acceptance criteria, constraints, assumptions, and non-goals the design step
reconciles to — is the [PRD](./define-product.md). Product owns _what and why_; design and delivery
own _how_. For the artifact _format_ this layer produces, see [`prd-contract.md`](./prd-contract.md)
and the [minimal example](./examples/minimal-prd.md); for _how_ future Product-layer mechanics will
work, see [`../design/`](../design/) (future work).

## Product Spine

| Question            | Product answer                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User                | A product owner with the judgment to say what a change should achieve, who needs that intent captured before design or delivery begins.                         |
| Job                 | Turn that intent into a reviewable product definition — outcome, user job, recognizable success — with stable, ID'd acceptance criteria downstream layers cite. |
| Current alternative | A vague brief, a ticket, or straight-to-code, with the real product definition reconstructed later from the diff, if at all.                                    |
| Before              | Downstream cannot tell what success means or trace it; ambiguity compounds into a faithful build of the wrong thing.                                            |
| After               | Outcome, audience, and success are stated once, at the cheapest moment to review, as criteria downstream layers cite by stable ID.                              |
| Non-fit             | Not a design or architecture tool, a delivery planner, a project manager, or a substitute for the owner's product judgment.                                     |

## Where it sits

```text
define-product  ->  technical-design  ->  design-to-plan  ->  jig (run)  ->  learning loop
```

- **define-product** owns _what and why_ — the product outcome, user job, constraints, assumptions,
  non-goals, and ID'd acceptance criteria.
- **technical-design** and **design-to-plan** may cite acceptance-criteria IDs when reconciling their
  work to product intent; they must not read Product-layer internals.
- **jig** ultimately checks, at merge-on-evidence, the criteria that trace back to those IDs.

The upstream position is a strong default, not a gate: bring your own PRD and the suite accepts it at
any stage. `define-product`'s only outward contract is the [PRD / acceptance-criteria-ID
format](./prd-contract.md).

## Why it matters

Everything downstream inherits the PRD's clarity. A vague product definition does not stop the work —
it produces a faithful build of the wrong thing: design inherits the ambiguity, planning decomposes
the ambiguous design, and Jig faithfully executes a well-structured plan in the wrong direction. By
then the mistake is expensive.

The most common delivery failure is not a broken build; it is a correct build of a misunderstood
goal. `define-product` addresses that at the source — before any architecture or story decomposition
— by making the owner state the outcome, the audience, and recognizable success once, at the cheapest
possible moment to review it. **The evidence thread starts here:** the ID'd acceptance criteria
written now are the same criteria design and planning carry forward and Jig's gates eventually
evaluate.

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
  mechanics are design-owned and future work.
- **It does not decide what to build.** The owner's product judgment is the required input;
  `define-product` makes it explicit and durable — it amplifies judgment, it does not supply it.
- **It does not guarantee good criteria.** It holds acceptance criteria to a _shape_ — ID'd,
  checkable, stable — but the _substance_ of each criterion is the owner's to set well; a careless
  one can still pass vacuously.
- **No legacy migration.** It does not migrate `workflow-kit` prototype artifacts.

## Success and counter-signals

**Success looks like:**

- An owner states the product outcome and success once, and downstream layers cite it by stable ID.
- Design and planning reconcile to the PRD without reading Product-layer internals.
- Scope is bounded — constraints, assumptions, and non-goals stated — so downstream layers do not
  invent it.

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

Seeded for M3, with the product now defined for its own design step. The overview above, the
[PRD](./define-product.md) (requirements and ID'd acceptance criteria), and the outward
[acceptance-criteria-ID contract](./prd-contract.md) are defined; design mechanics, schemas, skills,
and runtime are future work derived from these product docs.

## Related

- [`define-product.md`](./define-product.md) — the PRD: the authoritative product definition and ID'd
  acceptance criteria the design step reconciles to.
- [`prd-contract.md`](./prd-contract.md) — the outward contract (PRD / acceptance-criteria-ID format)
  downstream layers cite.
- [`examples/minimal-prd.md`](./examples/minimal-prd.md) — a concrete PRD using the contract.
- [`../design/`](../design/) — how future Product-layer mechanics will work (future; the next step in
  this repo).

> **Provenance.** This product layer productizes the v0.7 `agentic-workflow-kit:define-product` skill
> and draws on the retiring `workflow-kit` prototype. Both are reference-only; this repo is the
> canonical home for the product contract.
