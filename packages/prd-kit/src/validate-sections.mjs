import { SECTIONS } from "./sections.mjs";

const HEADING_PATTERN = /^##\s+(.+?)\s*$/gm;

function extractHeadings(markdown) {
  return [...markdown.matchAll(HEADING_PATTERN)].map((match) =>
    match[1].trim(),
  );
}

// ENF-002 / INV-002: every required contract section must be present before a PRD is "complete".
// Checks heading presence only — section substance (AC-CHECK-001, AC-SCOPE-001) is manual/eval.
export function validateSections(markdown) {
  const headings = new Set(extractHeadings(markdown));
  const missing = SECTIONS.filter(
    (section) => !headings.has(section.heading),
  ).map((section) => section.heading);
  return { valid: missing.length === 0, missing };
}
