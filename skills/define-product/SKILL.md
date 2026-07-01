---
name: define-product
description: "Use when a product owner wants to turn intent - notes, a brief, existing docs, or answers in their head - into a durable, reviewable PRD with stable acceptance-criteria IDs. Asks only the questions that block a coherent PRD, records every non-blocking unknown as a visible assumption, validates the result against the PRD contract, and hands off a contract-conformant PRD plus one next-step recommendation. Does not decide architecture, packages, CLI behavior, or delivery sequencing."
---

# define-product

Turn a product owner's intent into a PRD that conforms to
[`prd-contract.md`](../../docs/product/prd-contract.md): the required-section shape and the
`AC-<TOPIC>-<NNN>` acceptance-criteria contract downstream layers (Technical Design, Planning) cite.
This skill produces to that contract; it never redefines it. Where the owner's material would push
the PRD into design or delivery mechanics, redirect it back to product altitude rather than
recording it.

## References

- Owned seam (do not redefine): [`../../docs/product/prd-contract.md`](../../docs/product/prd-contract.md)
- Bootstrap + validators: [`../../packages/prd-kit/src/index.mjs`](../../packages/prd-kit/src/index.mjs)
  - `bootstrapTemplate(inputs)` - produce a filled-or-placeholder PRD instance from whatever the
    owner already supplied (Step 4).
  - `validatePrdForHandoff(markdown)` - runs the required-section check and the AC-ID
    format/uniqueness/status/supersession check together; use this, not the two checks below in
    isolation, to decide whether a draft is finished (Step 5).
  - `validateSections(markdown)` / `validateAcIds(markdown)` - the individual checks
    `validatePrdForHandoff` composes; only reach for these directly when you need one result in
    isolation (e.g. reporting which specific section is missing).
  - `SECTIONS` - per-section guidance, guiding question, and example the templates surface.
- Worked example: [`../../docs/product/examples/minimal-prd.md`](../../docs/product/examples/minimal-prd.md)
- This tool's own PRD, useful as a second worked example, not to be edited by this skill:
  [`../../docs/product/define-product.md`](../../docs/product/define-product.md)

## Step 0 - Show the flow

Before acting, show the assumed flow:

```text
I will do: ingest your material -> ask only what blocks a coherent PRD -> ground every remaining
unknown as a visible assumption -> draft the PRD -> assign and validate acceptance-criteria IDs ->
self-review for altitude and guidance -> hand off the PRD plus one next-step recommendation.
```

If a PRD already exists at the target path, say so now and switch to Step 8 (Resume / extend)
instead of drafting from scratch.

## Step 1 - Ingest material

Read whatever the owner has already supplied - notes, a brief, an existing doc, prior answers - and
any material they point to. For each required section
(`SECTIONS` in `prd-kit`: Product Outcome, User Job, Acceptance Criteria, Constraints, Assumptions,
Non-Goals, Downstream Citation Map), classify what you found as one of:

- **provided** - the material states it directly;
- **inferred** - the material implies it but does not state it;
- **gap** - the material says nothing;
- **conflict** - the material disagrees with itself or with a named source.

Do not ask about anything already answered by the material. This classification is the input to
Step 2 and Step 3 - do not discard it.

## Step 2 - Elicit (blocking-only)

A question is blocking only if its answer would change the PRD's meaning in a way no safe default
resolves - e.g. which outcome the change targets, who the user is, or an acceptance criterion whose
substance the owner alone can judge. Ask only those.

For every **gap** or **conflict** from Step 1 that is not blocking, do not ask - carry it forward to
Step 3 as a candidate assumption instead. Running an exhaustive interview when the material already
answers a section, or asking about something a reasonable default resolves, is the failure mode this
step exists to prevent.

If the material is insufficient to draft a coherent PRD even after blocking questions are asked and
answered, stop here and return the blocking questions to the owner rather than inventing product
facts (**FAIL-001** / **STOP-002**).

## Step 3 - Ground and record assumptions

For every **inferred**, **gap**, or **conflict** item not resolved by Step 2's answers, record it
visibly in the PRD's Assumptions section (or as a stated conflict, if two sources disagree) instead
of silently resolving it. Never invent a product fact and present it as owner-supplied. This is the
grounding the product layer requires (`AC-GROUND-001`): provided, inferred, gap, and conflict must
stay distinguishable to the reader, not collapsed into uniform prose.

## Step 4 - Draft the PRD

Call `bootstrapTemplate(inputs)` from `prd-kit` with whatever Steps 1-3 resolved, keyed by section:
`productOutcome`, `userJob`, `acceptanceCriteria`, `constraints`, `assumptions`, `nonGoals`,
`downstreamCitationMap`. Sections with resolved content are filled verbatim; sections still open
after Step 2 are left as the template's placeholder (guidance + guiding question + example) rather
than filled with invented content - the owner or a follow-up pass completes them deliberately.

The **Acceptance Criteria** section needs the owner's judgment on substance (what counts as
recognizable success) even when its shape is templated - do not draft criteria the owner has not
actually reviewed as their own.

## Step 5 - Assign and validate acceptance-criteria IDs

Assign each criterion a stable ID following `AC-<TOPIC>-<NNN>` (2-8 uppercase letters, zero-padded
number starting at `001`, unique within the PRD). Then run `validatePrdForHandoff` against the
draft - it runs the required-section check and the AC-ID check together, so a PRD missing a whole
section cannot slip through just because its (nonexistent) AC table has nothing to flag:

- if the result is not `valid`, **do not emit the PRD as finished** - surface the specific findings
  from `result.errors` (missing sections, malformed/duplicate/invalid-status IDs) and fix them
  before proceeding (**FAIL-002**);
- when editing an existing criterion, change the text in place only if the meaning is unchanged; if
  the meaning changes, mint a new ID and mark the old one `Superseded by AC-<new-id>` - never edit a
  cited ID's meaning silently (`INV-001`);
- if a criterion no longer applies, mark it `Withdrawn` with a reason; do not delete or renumber it.

## Step 6 - Self-review: guidance and altitude

Before handoff:

- **Guidance is recommended, never gating** (`AC-GUIDE-001`): surface the section guidance and
  guiding questions from `SECTIONS` to the owner for any section still thin, but do not block
  handoff on the owner acting on it.
- **Altitude guard** (`INV-004`): scan the draft for architecture, package, CLI/command, schema, or
  execution-sequencing content. If found, do not fold it into the PRD - name it explicitly to the
  owner and redirect it to the design step (`design-technical-solution`) instead.

## Step 7 - Hand off

Publish the validated PRD and exactly one next-step recommendation from:

- `design-technical-solution` - when the product has meaningful technical complexity;
- `design-to-plan` - when the feature is simple enough to plan directly;
- a UX/content pass or validation/research step - when the PRD's open questions are about users or
  desirability rather than build complexity.

Do not read or call any downstream layer's internals (`CTX-003`) - the PRD plus the recommendation is
the entire handoff surface.

## Step 8 - Resume or extend (idempotent)

If a PRD already exists at the target path, do not overwrite it. Re-run Steps 1-3 against the
existing PRD's current sections (treating already-filled sections as **provided**), fill only
sections that are missing or still carry the `prd-kit` placeholder marker, and confirm with the
owner before replacing any section that already has real content (**FAIL-003**). The PRD is the
durable audit record (`OBS-001`) - resuming must not erase assumptions or citations a downstream
artifact may already depend on.
