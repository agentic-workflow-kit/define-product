import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
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
