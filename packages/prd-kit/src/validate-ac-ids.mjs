const AC_ID_PATTERN = /^AC-[A-Z]{2,8}-\d{3}$/;
const SEPARATOR_ROW_PATTERN = /^:?-+:?$/;
const STATUS_PATTERN =
  /^(Active|Withdrawn\b.*|Superseded by AC-[A-Z]{2,8}-\d{3})$/;

function extractAcceptanceCriteriaSection(markdown) {
  const match = markdown.match(/^##\s+Acceptance Criteria\s*$/m);
  if (!match) return "";
  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const nextHeading = rest.match(/^##\s+/m);
  return nextHeading ? rest.slice(0, nextHeading.index) : rest;
}

// Standard markdown table shape: one header row, one alignment/separator row, then data rows.
// Only data rows (after the separator) carry AC IDs — the header row's cells ("ID", "Criterion",
// "Status") are not criteria and must not be checked as one.
function parseTableRows(sectionText) {
  const rows = sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim()),
    )
    .filter((cells) => cells.length >= 3);

  const separatorIndex = rows.findIndex((cells) =>
    cells.every((cell) => SEPARATOR_ROW_PATTERN.test(cell)),
  );
  return separatorIndex === -1 ? [] : rows.slice(separatorIndex + 1);
}

// ENF-001 / INV-001: AC-ID format, within-document uniqueness, and status vocabulary.
// This only checks the document in front of it — "never reused after publication" is a
// cross-time property no single-document check can enforce.
export function validateAcIds(markdown) {
  const rows = parseTableRows(extractAcceptanceCriteriaSection(markdown));
  const errors = [];
  const seen = new Map();

  for (const [id, , status] of rows) {
    if (!AC_ID_PATTERN.test(id)) {
      errors.push({ token: "malformed-ac-id", id });
      continue;
    }

    if (seen.has(id)) {
      errors.push({ token: "duplicate-ac-id", id });
    }
    seen.set(id, (seen.get(id) ?? 0) + 1);

    if (!STATUS_PATTERN.test(status)) {
      errors.push({ token: "invalid-status", id, status });
    }
  }

  return { valid: errors.length === 0, errors };
}
