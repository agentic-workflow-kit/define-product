// Required PRD sections, in contract order, per docs/product/prd-contract.md.
// prd-kit encodes these rules; it does not redefine them (STOP-001 / FILE-001).
export const SECTIONS = [
  {
    key: "productOutcome",
    heading: "Product Outcome",
    guidance:
      "Guidance: state what improves for the user or operator, as an observable result and explicit product fact — not a solution shape or implied narrative. Skipping this leaves reviewers unable to tell what success looks like before implementation starts.",
    guidingQuestion:
      "What does this change make possible that isn't possible today?",
    example:
      "Example: Product owners can publish a compact PRD whose acceptance criteria are stable enough for Technical Design and Planning to cite.",
  },
  {
    key: "userJob",
    heading: "User Job",
    guidance:
      "Guidance: name who benefits and the job, decision, or workflow they are trying to complete. Skipping this leaves the outcome unanchored to a real user need.",
    guidingQuestion:
      "Who is doing this job, and what are they trying to get done?",
    example:
      "Example: As a product owner, I need to record what outcome a change should create and how success will be recognized, so downstream agents preserve intent when they design and plan the work.",
  },
  {
    key: "acceptanceCriteria",
    heading: "Acceptance Criteria",
    guidance:
      "Guidance: each criterion needs a stable AC-<TOPIC>-<NNN> ID and must describe externally recognizable product success, not a prose intention or implementation proof requirement. Skipping this leaves downstream layers with nothing citable.",
    guidingQuestion:
      "How would a reviewer tell this criterion holds or not, without reading the implementation?",
    example:
      "Example: | AC-PRD-001 | The PRD states the product outcome and user job before any design or planning commitment. | Active |",
  },
  {
    key: "constraints",
    heading: "Constraints",
    guidance:
      "Guidance: record product, policy, compatibility, rollout, or operational limits the solution must honor. Keep architecture, package layout, CLI behavior, schema internals, and delivery sequencing out of this section. Skipping this lets downstream layers invent limits or miss real ones.",
    guidingQuestion: "What must the solution respect no matter how it's built?",
    example:
      "Example: The PRD stays at product altitude and does not prescribe architecture, packages, CLI behavior, or execution sequencing.",
  },
  {
    key: "assumptions",
    heading: "Assumptions",
    guidance:
      "Guidance: record load-bearing beliefs that should be reviewed or tested, and keep their grounding visible — for example Inferred, Gap/default, or Conflict. Skipping this hides risk that later surfaces as a silent surprise instead of a visible, revisitable assumption.",
    guidingQuestion:
      "What are we taking on faith, and what would change if it turned out false?",
    example:
      "Example: Downstream artifacts can preserve product traceability if they cite stable acceptance-criteria IDs.",
  },
  {
    key: "nonGoals",
    heading: "Non-Goals",
    guidance:
      "Guidance: state what this PRD does not promise, even when adjacent or likely useful later. Skipping this invites downstream layers to invent scope.",
    guidingQuestion:
      "What might a reader assume is in scope that we need to explicitly rule out?",
    example:
      "Example: No design-to-plan mechanics. No schema validator, CLI, skill runtime, or eval framework.",
  },
  {
    key: "downstreamCitationMap",
    heading: "Downstream Citation Map",
    guidance:
      "Guidance: state exactly what downstream artifacts may cite (title, outcome, user job, exact AC IDs, constraints, assumptions, non-goals) and preserve uncertainty as uncertainty. Skipping this leaves citation rules implicit and easy to violate.",
    guidingQuestion:
      "If a downstream tool could only cite a few facts from this PRD, which ones would keep it honest?",
    example:
      "Example: Technical Design may cite AC-PRD-001, AC-ID-001, AC-SCOPE-001, and AC-CITE-001 when reconciling design decisions to product intent.",
  },
];
