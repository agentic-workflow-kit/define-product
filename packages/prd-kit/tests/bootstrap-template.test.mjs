import { describe, expect, it } from "vitest";
import {
  bootstrapTemplate,
  DRAFT_PLACEHOLDER_MARKER,
} from "../src/bootstrap-template.mjs";
import { validateSections } from "../src/validate-sections.mjs";
import { validateAcIds } from "../src/validate-ac-ids.mjs";
import { SECTIONS } from "../src/sections.mjs";

describe("bootstrapTemplate", () => {
  it("fills a section verbatim when the caller supplies it", () => {
    const doc = bootstrapTemplate({
      productOutcome: "Owners can publish a PRD reviewers trust.",
    });
    expect(doc).toContain("Owners can publish a PRD reviewers trust.");
  });

  it("leaves an omitted section as a placeholder carrying guidance, a guiding question, and an example", () => {
    const doc = bootstrapTemplate({});
    const userJobSection = SECTIONS.find(
      (section) => section.key === "userJob",
    );
    expect(doc).toContain(userJobSection.guidance);
    expect(doc).toContain(userJobSection.guidingQuestion);
    expect(doc).toContain(userJobSection.example);
  });

  it("covers every required section exactly once, in contract order", () => {
    const doc = bootstrapTemplate({});
    const headings = [...doc.matchAll(/^## (.+)$/gm)].map((match) =>
      match[1].trim(),
    );
    expect(headings).toEqual([
      "Product Outcome",
      "User Job",
      "Acceptance Criteria",
      "Constraints",
      "Assumptions",
      "Non-Goals",
      "Downstream Citation Map",
    ]);
  });

  it("does not silently invent content for a section the caller left blank", () => {
    const doc = bootstrapTemplate({ productOutcome: "Supplied outcome." });
    const constraintsSection = SECTIONS.find(
      (section) => section.key === "constraints",
    );
    expect(doc).toContain(constraintsSection.guidance);
  });

  it("produces a section-complete instance when every section is supplied", () => {
    const doc = bootstrapTemplate({
      productOutcome: "Owners can publish a PRD reviewers trust.",
      userJob: "As an owner, I need to capture intent before design starts.",
      acceptanceCriteria:
        "| ID | Criterion | Status |\n| --- | --- | --- |\n| AC-DEMO-001 | Reviewer can tell success from the criterion alone. | Active |",
      constraints: "- Stays at product altitude.",
      assumptions: "- Owners can supply enough intent to draft from.",
      nonGoals: "- Does not design the solution.",
      downstreamCitationMap: "- Downstream may cite AC-DEMO-001.",
    });
    expect(validateSections(doc).valid).toBe(true);
    expect(validateAcIds(doc).valid).toBe(true);
  });

  it("marks every unfilled section with the draft-placeholder marker, so a claim of completeness is never silent", () => {
    const doc = bootstrapTemplate({ productOutcome: "Supplied outcome." });
    const placeholderCount = doc.split(DRAFT_PLACEHOLDER_MARKER).length - 1;
    expect(placeholderCount).toBe(SECTIONS.length - 1);
  });

  it("passes section-presence validation even with placeholders (ENF-002 checks heading presence, not content substance)", () => {
    const doc = bootstrapTemplate({});
    expect(validateSections(doc).valid).toBe(true);
  });
});
