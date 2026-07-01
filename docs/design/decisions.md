# Design Decisions - define-product

> One entry per disposition, append-only. Status legend: applied, open-deferred, rejected.
> Frame-gate entries (D-001..D-004) record the pre-authoring approvals; review dispositions append below.

---

## D-001 - Concrete form: skills pack + supporting package

- **Date:** 2026-07-01
- **Suggestion:** Frame gate (InputResolution / `requires approval` - concrete form)
- **Decision:** accepted
- **Rationale:** The PRD defers the concrete form to design. The only built sibling
  (`technical-design`) ships as a `skills/` pack plus `packages/` (eval-kit, evals), and the v0.7
  prior art is itself a skill. A skills pack plus a supporting package for the checkable core matches
  the house pattern and keeps the checkable slice testable.
- **Consequence:** Applied in §1 (SURF-001..003), §10, and §15 (DEL-001..003). CLI/service rejected as
  off-pattern.
- **Design round:** 1
- **Status:** applied

## D-002 - Skill decomposition deferred to build

- **Date:** 2026-07-01
- **Suggestion:** Frame gate (scope boundary)
- **Decision:** deferred
- **Rationale:** Whether the flow ships as one skill or a small pack (e.g. a separate
  validation/review skill) is a finer design decision. The use-case slices (§8) and the outward
  surfaces (§10) hold either way, so the handoff does not depend on the choice.
- **Consequence:** Tracked in §16 risks; the build decides. No handoff fact depends on it.
- **Design round:** not applied
- **Status:** resolved by D-005

## D-003 - Docs shape: lean, frame folded in

- **Date:** 2026-07-01
- **Suggestion:** Frame gate (DocStructurePlan / `requires approval` - docs shape)
- **Decision:** accepted
- **Rationale:** define-product's design is focused; the author-skill default (one
  `technical-design.md` + `decisions.md`, plus a README hub for the house pattern) fits. Frame
  provenance is folded into `technical-design.md` §2 rather than a standalone `problem-frame.md`.
- **Consequence:** Applied as the `docs/design/` tree in §2 DocStructurePlan.
- **Design round:** 1
- **Status:** applied

## D-004 - Architecture mode contract/seam design at use-case-slices depth

- **Date:** 2026-07-01
- **Suggestion:** Frame gate (architecture_mode + ddd_depth)
- **Decision:** accepted
- **Rationale:** define-product's essence is the contract it produces to plus the elicitation flow, so
  contract/seam design is the first lens. Behavior is procedural (use-case slices); tactical DDD is
  unnecessary because the output is a document, not a consistency-critical aggregate.
- **Consequence:** Applied in frontmatter and §5. Tactical ceremony explicitly omitted with rationale.
- **Design round:** 1
- **Status:** applied

## D-005 - Ships as one skill for now; extensible to a pack later

- **Date:** 2026-07-01
- **Suggestion:** Owner disposition of D-002 (skill decomposition)
- **Decision:** accepted
- **Rationale:** For now `define-product` is a single skill. It may extend into a pack later for other
  product operations (roadmap authoring, delivery-phase / MVP prioritization, and similar), but that
  is explicitly out of scope now. Refines the D-001 concrete form ("skills pack") to one skill; the
  supporting package is unchanged.
- **Consequence:** Applied in §1 (SURF-001, DEL-002), §2 InputResolution, §12, §15, §16, and
  `README.md`. Round bumped to 2. The use-case slices (§8) and outward surfaces (§10) hold either way.
- **Design round:** 2
- **Status:** applied
