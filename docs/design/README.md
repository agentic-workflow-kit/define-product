---
title: define-product — design
status: reviewed
---

# define-product — design

Design owns **how**: the authoring flow that turns owner intent into a contract-conformant PRD, the
seams `define-product` publishes, and the gates its build must satisfy. It implements and reconciles
to the product promises in [`../product/`](../product/) — where design and product intent conflict,
name the conflict and resolve it deliberately, not by silent churn.

Start with [`technical-design.md`](./technical-design.md): the DDD-first (contract/seam-design)
design, with a `Planner Handoff Summary` that cites the PRD acceptance-criteria IDs and emits the
stable IDs a later planning step consumes. Dispositions and the frame-gate approvals are logged in
[`decisions.md`](./decisions.md).

## What design decides

- **Concrete form** — `define-product` ships as a single skill plus a supporting package (the checkable
  core: PRD template set + AC-ID/required-section validator), mirroring the built `technical-design`
  sibling. One skill for now; future product operations (roadmap, delivery-phase / MVP
  prioritization) may extend it into a pack later, out of scope now. See `technical-design.md` §10,
  §15, and §16.
- **Authoring flow** — the use-case slices (ingest -> elicit -> ground -> draft -> assign/validate IDs
  -> self-review -> hand off) that realize the product's elicitation, grounding, and altitude
  promises. See §8.
- **The owned seam** — design produces to [`../product/prd-contract.md`](../product/prd-contract.md)
  and must not redefine it; reshaping that contract is a product / cross-repo event (§1 STOP-001).
- **Enforcement** — which promises are statically checkable (AC-ID format/uniqueness, required
  sections) versus manual/eval (elicitation quality, criterion substance, altitude). See §14.

This layer is documentation; the skill and package(s) it commits to are future build work,
consistent with the org's product -> design -> build sequencing.
