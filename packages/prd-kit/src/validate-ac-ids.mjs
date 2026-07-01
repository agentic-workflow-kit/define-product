const AC_ID_PATTERN = /^AC-[A-Z]{2,8}-\d{3}$/;
const SEPARATOR_ROW_PATTERN = /^:?-+:?$/;
const ACTIVE_PATTERN = /^Active$/;
const SUPERSEDED_PATTERN = /^Superseded by (AC-[A-Z]{2,8}-\d{3})$/;
const WITHDRAWN_WITH_REASON_PATTERN = /^Withdrawn\s*[:\-–—]\s*\S.*$/;

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

function checkStatus(id, status, presentIds) {
  if (ACTIVE_PATTERN.test(status)) return null;

  if (status.startsWith("Superseded by")) {
    const match = status.match(SUPERSEDED_PATTERN);
    if (!match) return { token: "invalid-status", id, status };
    const target = match[1];
    if (target === id) return { token: "self-supersession", id };
    if (!presentIds.has(target))
      return { token: "missing-supersession-target", id, target };
    return null;
  }

  if (status.startsWith("Withdrawn")) {
    return WITHDRAWN_WITH_REASON_PATTERN.test(status)
      ? null
      : { token: "withdrawn-missing-reason", id };
  }

  return { token: "invalid-status", id, status };
}

// ENF-001 / INV-001: AC-ID format, within-document uniqueness, and status/supersession
// integrity. This only checks the document in front of it — "never reused after publication"
// is a cross-time property no single-document check can enforce. It also passes vacuously when
// there is no Acceptance Criteria section, or no parseable table, since zero rows means zero
// errors — that is a deliberate scope limit (this checks shape, not completeness), not a bug;
// callers that need "finished PRD is valid" should pair this with validateSections.
export function validateAcIds(markdown) {
  const rows = parseTableRows(extractAcceptanceCriteriaSection(markdown));
  // Every ID appearing in the table, valid-format or not — a Superseded-by target must exist
  // in this PRD, regardless of whether the referencing row itself has other problems.
  const presentIds = new Set(rows.map(([id]) => id));
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

    const statusError = checkStatus(id, status, presentIds);
    if (statusError) errors.push(statusError);
  }

  return { valid: errors.length === 0, errors, rowCount: rows.length };
}
