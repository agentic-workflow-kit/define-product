# Example: guided interview with thin material

The owner opens with one sentence: "we should let users export their data."

**Step 1 - Ingest.** Nothing else is supplied. Every section is a gap.

**Step 2 - Elicit.** A gap is not automatically blocking. Ask only what a coherent PRD cannot proceed
without:

- "What outcome does export create for the user - compliance, portability, something else?"
  (blocks Product Outcome and User Job)
- "Is there a format or destination this must support, or is that open?" (blocks whether a
  constraint exists at all)

Do not ask about Non-Goals or Downstream Citation Map yet - those can be drafted from the answers
above and reviewed, not interrogated one by one.

**Step 3 - Ground.** The owner answers: outcome is user trust/portability (not compliance-driven);
format is "whatever's reasonable, no hard requirement yet." That second answer is recorded as a
visible assumption (`Gap/default: no format constraint stated; downstream design chooses one`)
rather than asked further, because it does not change the PRD's meaning enough to block on.

**Step 4 - Draft.** `bootstrapTemplate` fills Product Outcome and User Job from the answers.
Acceptance Criteria, Constraints, Non-Goals, and Downstream Citation Map are left as placeholders
(guidance + guiding question + example) for the owner to complete or approve, since Step 2 stopped
short of drafting checkable criteria the owner has not reviewed.

**Step 5-7.** Deferred until the owner fills or approves the placeholder sections; `validatePrdForHandoff`
now fails while placeholder markers remain or until the Acceptance Criteria table contains real rows,
so the draft cannot be handed off early by mistake.
