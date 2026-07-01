import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateSections } from "../src/validate-sections.mjs";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const read = (path) =>
  readFileSync(new URL(path, `file://${repoRoot}`), "utf8");

describe("validateSections", () => {
  it("passes the repo's own define-product PRD", () => {
    const result = validateSections(read("docs/product/define-product.md"));
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it("passes the minimal-prd example fixture", () => {
    const result = validateSections(
      read("docs/product/examples/minimal-prd.md"),
    );
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it("fails a PRD missing Acceptance Criteria (seeded ENF-002 violation)", () => {
    const doc = readFileSync(
      new URL(
        "./fixtures/invalid/missing-acceptance-criteria.md",
        import.meta.url,
      ),
      "utf8",
    );
    const result = validateSections(doc);
    expect(result.valid).toBe(false);
    expect(result.missing).toContain("Acceptance Criteria");
  });

  it("reports every missing required section, not just the first", () => {
    const result = validateSections(
      "# Title\n\n## Product Outcome\n\nSome outcome.\n",
    );
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual([
      "User Job",
      "Acceptance Criteria",
      "Constraints",
      "Assumptions",
      "Non-Goals",
      "Downstream Citation Map",
    ]);
  });
});
