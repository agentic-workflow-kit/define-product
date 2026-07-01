import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { bootstrapTemplate } from "../src/bootstrap-template.mjs";
import { validatePrdForHandoff } from "../src/validate-prd-for-handoff.mjs";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const read = (path) =>
  readFileSync(new URL(path, `file://${repoRoot}`), "utf8");

describe("validatePrdForHandoff", () => {
  it("passes the repo's own define-product PRD", () => {
    const result = validatePrdForHandoff(
      read("docs/product/define-product.md"),
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("passes the minimal-prd example fixture", () => {
    const result = validatePrdForHandoff(
      read("docs/product/examples/minimal-prd.md"),
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("fails a placeholder-heavy bootstrap draft as not ready for handoff", () => {
    const result = validatePrdForHandoff(
      bootstrapTemplate({
        productOutcome: "Owners can publish a trustworthy PRD.",
      }),
    );
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "draft-placeholder-present" }),
        expect.objectContaining({ token: "missing-acceptance-criteria-rows" }),
      ]),
    );
  });

  it("catches a missing required section even though the AC table (what there is of it) is fine", () => {
    // This is exactly the half-contract gap the paired-validators approach could miss: calling
    // only validateAcIds on this fixture says "valid" (there's no Acceptance Criteria section to
    // check), but the PRD is missing a whole required section.
    const doc = readFileSync(
      new URL(
        "./fixtures/invalid/missing-acceptance-criteria.md",
        import.meta.url,
      ),
      "utf8",
    );
    const result = validatePrdForHandoff(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          token: "missing-required-section",
          heading: "Acceptance Criteria",
        }),
      ]),
    );
  });

  it("catches an AC-ID problem even when every required section is present", () => {
    const doc = readFileSync(
      new URL("./fixtures/invalid/duplicate-ac-id.md", import.meta.url),
      "utf8",
    );
    const result = validatePrdForHandoff(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "duplicate-ac-id", id: "AC-PRD-001" }),
      ]),
    );
  });

  it("fails when the Acceptance Criteria section exists but has no parseable criteria rows", () => {
    const doc = [
      "# Product PRD",
      "",
      "## Product Outcome",
      "",
      "Owners can publish a trustworthy PRD.",
      "",
      "## User Job",
      "",
      "As an owner, I need to capture intent before design starts.",
      "",
      "## Acceptance Criteria",
      "",
      "Still drafting these.",
      "",
      "## Constraints",
      "",
      "- Stays at product altitude.",
      "",
      "## Assumptions",
      "",
      "- Inferred: downstream layers cite stable AC IDs.",
      "",
      "## Non-Goals",
      "",
      "- Does not design the solution.",
      "",
      "## Downstream Citation Map",
      "",
      "- Downstream may cite the product outcome and exact AC IDs once published.",
      "",
    ].join("\n");
    const result = validatePrdForHandoff(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "missing-acceptance-criteria-rows" }),
      ]),
    );
  });

  it("reports both kinds of problems together when both are present", () => {
    const doc = [
      "## Product Outcome",
      "",
      "Some outcome.",
      "",
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-bad | Malformed ID. | Active |",
      "",
    ].join("\n");
    const result = validatePrdForHandoff(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          token: "missing-required-section",
          heading: "User Job",
        }),
        expect.objectContaining({ token: "malformed-ac-id" }),
      ]),
    );
  });

  it("exposes the underlying section and AC-ID results for callers that want the detail", () => {
    const result = validatePrdForHandoff(
      read("docs/product/examples/minimal-prd.md"),
    );
    expect(result.sections.valid).toBe(true);
    expect(result.acIds.valid).toBe(true);
  });
});
