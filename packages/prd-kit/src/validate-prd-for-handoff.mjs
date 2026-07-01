import { validateSections } from "./validate-sections.mjs";
import { validateAcIds } from "./validate-ac-ids.mjs";

// Single entrypoint for "is this PRD finished" (INV-002 + INV-001 together). validateSections and
// validateAcIds each check one half of the contract and can pass on a PRD that fails the other
// half — e.g. a missing Acceptance Criteria section vacuously passes validateAcIds since there is
// no table to check. Callers deciding whether a PRD is ready for handoff should call this, not
// either validator alone.
export function validatePrdForHandoff(markdown) {
  const sections = validateSections(markdown);
  const acIds = validateAcIds(markdown);
  const errors = [
    ...sections.missing.map((heading) => ({
      token: "missing-required-section",
      heading,
    })),
    ...acIds.errors,
  ];

  return { valid: sections.valid && acIds.valid, errors, sections, acIds };
}
