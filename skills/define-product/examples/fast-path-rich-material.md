# Example: fast path with rich material

The owner supplies a two-paragraph brief plus three Slack replies clarifying who the feature is for.

**Step 1 - Ingest.** The brief states the outcome, names the user, and lists four things the feature
must not do. Classification: Product Outcome - provided; User Job - provided; Non-Goals - provided;
Acceptance Criteria - inferred (the brief describes behavior but not checkable success statements);
Constraints - gap; Assumptions - gap; Downstream Citation Map - gap (always drafted by the skill, not
the owner).

**Step 2 - Elicit.** Only one blocking question remains: the brief describes two candidate outcomes
without saying which one this PRD is about. Ask that one question; skip everything else since the
material already answers it.

**Step 3 - Ground.** The inferred acceptance criteria are drafted from the brief's described behavior
and shown to the owner as a proposed checkable form, not silently finalized. No conflicts found. The
Constraints and Assumptions gaps are recorded as visible assumptions ("no explicit constraint stated;
assuming none beyond the stated non-goals").

**Step 4 - Draft.** `bootstrapTemplate` fills Product Outcome, User Job, and Non-Goals verbatim from
the brief; Acceptance Criteria and the two gap sections are filled with the grounded content from
Step 3 (not left as placeholders, since Step 3 resolved them).

**Step 5 - IDs and validation.** Four criteria assigned `AC-<TOPIC>-001..004`. `validateSections` and
`validateAcIds` both pass.

**Step 6 - Self-review.** No architecture/CLI/schema content found in the draft; nothing to redirect.

**Step 7 - Handoff.** The brief mentions a new external API integration - recommend
`design-technical-solution` next.
