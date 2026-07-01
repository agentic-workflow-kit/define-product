import { validateSections } from "./validate-sections.mjs";
import { validateAcIds } from "./validate-ac-ids.mjs";
import { DRAFT_PLACEHOLDER_MARKER } from "./bootstrap-template.mjs";

// Single entrypoint for "is this PRD finished" (INV-002 + INV-001 together). validateSections and
// validateAcIds each check one half of the contract and can pass on a PRD that fails the other
// half — e.g. a missing Acceptance Criteria section vacuously passes validateAcIds since there is
// no table to check. Callers deciding whether a PRD is ready for handoff should call this, not
// either validator alone.
export function validatePrdForHandoff(markdown) {
  const sections = validateSections(markdown);
  const acIds = validateAcIds(markdown);
  const missingAcceptanceCriteriaSection = sections.missing.includes(
    "Acceptance Criteria",
  );
  const errors = [
    ...sections.missing.map((heading) => ({
      token: "missing-required-section",
      heading,
    })),
    ...(markdown.includes(DRAFT_PLACEHOLDER_MARKER)
      ? [{ token: "draft-placeholder-present" }]
      : []),
    ...(!missingAcceptanceCriteriaSection && acIds.rowCount === 0
      ? [{ token: "missing-acceptance-criteria-rows" }]
      : []),
    ...acIds.errors,
  ];

  return { valid: errors.length === 0, errors, sections, acIds };
}
