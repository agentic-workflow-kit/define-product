# Example: resume an existing PRD (idempotent extend)

The owner re-invokes the skill on a PRD drafted last week that has Product Outcome, User Job, and
Non-Goals filled in, but Constraints and Assumptions still carry the `prd-kit` placeholder marker,
and Acceptance Criteria has two real criteria plus a third row the owner half-wrote and abandoned.

**Step 0.** A PRD already exists at the target path - skip straight to Step 8, not a fresh draft.

**Step 8 - Resume.** Treat Product Outcome, User Job, and Non-Goals as **provided** (already real
content) - do not touch them. Constraints and Assumptions are still placeholders - run Steps 1-3
against new owner input for just those two sections. The half-written third acceptance criterion is
not a placeholder and not empty, so it is not silently overwritten: surface it to the owner
("this criterion looks unfinished - keep, finish, or withdraw it?") and wait for a decision rather
than guessing.

If an existing assumption is already published as `Inferred:`, `Gap/default:`, or `Conflict:`, keep
that status unless the owner explicitly resolves it; a resume pass must not silently promote it into
settled fact.

**Step 5.** Once the owner resolves the third criterion, re-run `validateAcIds` across the whole
section (not just the new rows) - a resume pass can reintroduce a duplicate or malformed ID as
easily as a fresh draft can.

**Step 7.** Handoff proceeds only after the full document - old and newly-filled sections together -
passes both validators; nothing about resuming lowers that bar.
