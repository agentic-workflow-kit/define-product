import { describe, expect, it } from "vitest";
import {
  SECTIONS,
  bootstrapTemplate,
  DRAFT_PLACEHOLDER_MARKER,
  validateSections,
  validateAcIds,
  validatePrdForHandoff,
} from "../src/index.mjs";

// The public package surface (SURF-002) is this barrel file, not the individual src modules —
// a broken re-export here would break every consumer even if the underlying modules are correct.
describe("index.mjs public exports", () => {
  it("re-exports a working end-to-end bootstrap-and-validate flow", () => {
    const doc = bootstrapTemplate({
      productOutcome: "Owners can publish a trustworthy PRD.",
    });
    expect(doc).toContain("Owners can publish a trustworthy PRD.");
    expect(doc).toContain(DRAFT_PLACEHOLDER_MARKER);
    expect(SECTIONS.length).toBeGreaterThan(0);
    // validateSections checks heading presence only — bootstrapTemplate always emits every
    // required heading, filled or placeholder, so this passes even with partial input.
    expect(validateSections(doc).valid).toBe(true);
    expect(validateAcIds(doc).valid).toBe(true);
    // validatePrdForHandoff is stricter: a placeholder-heavy draft is not ready for handoff even
    // though section presence and AC-ID shape each pass on their own.
    expect(validatePrdForHandoff(doc).valid).toBe(false);
    expect(validatePrdForHandoff(doc).sections.valid).toBe(true);
    expect(validatePrdForHandoff(doc).acIds.valid).toBe(true);
  });
});
