import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateAcIds } from "../src/validate-ac-ids.mjs";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const read = (path) =>
  readFileSync(new URL(path, `file://${repoRoot}`), "utf8");

describe("validateAcIds", () => {
  it("passes the repo's own define-product PRD", () => {
    const result = validateAcIds(read("docs/product/define-product.md"));
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("passes the minimal-prd example fixture", () => {
    const result = validateAcIds(read("docs/product/examples/minimal-prd.md"));
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("fails on a duplicate AC ID (seeded ENF-001 violation)", () => {
    const doc = readFileSync(
      new URL("./fixtures/invalid/duplicate-ac-id.md", import.meta.url),
      "utf8",
    );
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "duplicate-ac-id", id: "AC-PRD-001" }),
      ]),
    );
  });

  it("fails on a malformed AC ID (seeded ENF-001 violation)", () => {
    const doc = readFileSync(
      new URL("./fixtures/invalid/malformed-ac-id.md", import.meta.url),
      "utf8",
    );
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "malformed-ac-id" }),
      ]),
    );
  });

  it("fails on an unrecognized status value", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-PRD-001 | Some criterion. | Done |",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "invalid-status", id: "AC-PRD-001" }),
      ]),
    );
  });

  it("accepts Active, Superseded by, and Withdrawn statuses", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-PRD-001 | Active criterion. | Active |",
      "| AC-PRD-002 | Superseded criterion. | Superseded by AC-PRD-003 |",
      "| AC-PRD-003 | Withdrawn criterion. | Withdrawn: no longer applicable |",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("fails when Superseded by points at an AC ID absent from the PRD", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-PRD-001 | Superseded criterion. | Superseded by AC-PRD-999 |",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          token: "missing-supersession-target",
          id: "AC-PRD-001",
          target: "AC-PRD-999",
        }),
      ]),
    );
  });

  it("fails on self-supersession", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-PRD-001 | Self-superseding criterion. | Superseded by AC-PRD-001 |",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          token: "self-supersession",
          id: "AC-PRD-001",
        }),
      ]),
    );
  });

  it("fails on a bare Withdrawn status with no reason", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-PRD-001 | Withdrawn criterion. | Withdrawn |",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          token: "withdrawn-missing-reason",
          id: "AC-PRD-001",
        }),
      ]),
    );
  });

  it("fails on a Superseded-by status whose target is not itself a well-formed AC ID", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "| ID | Criterion | Status |",
      "| --- | --- | --- |",
      "| AC-PRD-001 | Badly-targeted criterion. | Superseded by AC-bad |",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ token: "invalid-status", id: "AC-PRD-001" }),
      ]),
    );
  });

  it("passes vacuously when there is no Acceptance Criteria section at all", () => {
    const result = validateAcIds("## Product Outcome\n\nSome outcome.\n");
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("passes vacuously when the Acceptance Criteria section has no table separator row", () => {
    const doc = [
      "## Acceptance Criteria",
      "",
      "not a table, just prose.",
      "",
    ].join("\n");
    const result = validateAcIds(doc);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
