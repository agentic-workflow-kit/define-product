import { SECTIONS } from "./sections.mjs";

export const DRAFT_PLACEHOLDER_MARKER =
  "_Draft placeholder — replace before publishing._";

function renderSection(section, suppliedContent) {
  const body =
    suppliedContent ??
    [
      DRAFT_PLACEHOLDER_MARKER,
      "",
      section.guidance,
      "",
      section.guidingQuestion,
      "",
      section.example,
    ].join("\n");
  return `## ${section.heading}\n\n${body}\n`;
}

// AC-TEMPLATE-001 / AC-GUIDE-001: bootstrap a reusable PRD instance from whatever the caller
// already knows. Supplied sections are filled verbatim; omitted sections carry guidance, a
// guiding question, and an example so a human or the skill can complete them in place — the
// guidance is recommended, never gating (it does not block bootstrapTemplate from returning).
export function bootstrapTemplate(inputs = {}) {
  const sections = SECTIONS.map((section) =>
    renderSection(section, inputs[section.key]),
  ).join("\n");
  return `# Product PRD\n\n${sections}`;
}
