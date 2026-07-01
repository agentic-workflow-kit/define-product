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

## D-006 - Normalize downstream naming to design-to-plan

- **Date:** 2026-07-01
- **Suggestion:** Review (agreement-integrity - legacy skill name `plan-delivery-track` used for the Planning layer)
- **Decision:** accepted
- **Rationale:** The suite names the Planning layer `design-to-plan`; `plan-delivery-track` is the legacy v0.7 skill name and muddies the seam in a new design layer.
- **Consequence:** Replaced `plan-delivery-track` with `design-to-plan` in §1 (CTX-003, SURF-003), §6 context map, and the §13 diagram. SRC-004's reference to the v0.7 `define-product` skill is intentional and unchanged.
- **Design round:** 3
- **Status:** applied

## D-007 - Lifecycle status draft -> reviewed

- **Date:** 2026-07-01
- **Suggestion:** Review (agreement-integrity - `draft` is the wrong planning-eligibility signal once the design is consumed for implementation)
- **Decision:** accepted
- **Rationale:** The review is accepted; the handoff contract treats status as planning-eligibility metadata. `reviewed` reflects that the design passed review; `approved` is reserved for explicit post-merge sign-off.
- **Consequence:** `design_status` and Handoff Identity Status set to `reviewed`; round bumped to 3.
- **Design round:** 3
- **Status:** applied

## D-008 - Package naming (prd-kit) left illustrative

- **Date:** 2026-07-01
- **Suggestion:** Review (non-blocking - package naming)
- **Decision:** rejected
- **Rationale:** The reviewer confirmed this is fine; §16 already records that `prd-kit` is illustrative and not a handoff fact, and final naming is a build-time decision.
- **Consequence:** No change to the design. Tracked in §16 risks.
- **Design round:** not applied
- **Status:** rejected

## D-009 - Expand shorthand acceptance-criteria IDs in the handoff

- **Date:** 2026-07-01
- **Suggestion:** Codex review (agreement-integrity - shorthand `AC-ELICIT-001/002` is not a valid ID under the `AC-<topic>-<number>` contract; literal extraction loses the `-002` IDs)
- **Decision:** accepted
- **Rationale:** The Planner Handoff Summary is the citable-ID surface; downstream tooling extracts IDs literally, so each ID must appear in full contract form.
- **Consequence:** Expanded `AC-ELICIT-001/002` and `AC-PRD-001/002` to their exact IDs in SRC-001 and DEL-002; also expanded the internal `ENF-001/002` shorthand (§14, §16) for the same reason.
- **Design round:** 4
- **Status:** applied

## D-010 - Ground FAIL-003 in a repo-verifiable source

- **Date:** 2026-07-01
- **Suggestion:** Codex review (agreement-integrity - FAIL-003 sourced only to SRC-004, a background/reference-only external skill; not verifiable from the self-contained repo per AGENTS.md)
- **Decision:** accepted
- **Rationale:** A required handoff fact must be groundable from checked-out docs. Idempotent resume/extend protects the durable standalone PRD, which is a product promise (AC-PRD-002); the mechanic is productized from the v0.7 flow.
- **Consequence:** FAIL-003 source ref changed from SRC-004 to SRC-001 (AC-PRD-002), with the v0.7 provenance kept in-cell as SRC-004.
- **Design round:** 4
- **Status:** applied

## D-011 - Canonical downstream name (Codex duplicate of D-006)

- **Date:** 2026-07-01
- **Suggestion:** Codex review (agreement-integrity - `plan-delivery-track` vs canonical `design-to-plan`)
- **Decision:** accepted
- **Rationale:** Same finding as D-006, already applied in round 3; the Codex thread is against an earlier head and is now outdated.
- **Consequence:** No new change; resolved by D-006. Thread resolved with a reply.
- **Design round:** not applied (resolved by D-006)
- **Status:** applied

## D-012 - Design hub README status draft -> reviewed

- **Date:** 2026-07-01
- **Suggestion:** Rereview (non-blocking - metadata neatness: `docs/design/README.md` still said `status: draft` while the handoff-bearing design is `reviewed`)
- **Decision:** accepted
- **Rationale:** Align the hub README metadata with the reviewed design doc; avoids a stale status signal.
- **Consequence:** `docs/design/README.md` frontmatter `status: draft` -> `reviewed`. No design-content change.
- **Design round:** not applied (README metadata only)
- **Status:** applied
