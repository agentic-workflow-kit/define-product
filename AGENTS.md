# AGENTS.md — define-product

The contract for working in this repo. **Self-contained:** act on it with only this repo checked
out (including Claude or Codex cloud runs). Don't work from memory — read the doc here that owns
your subject, then plan before non-trivial work.

`define-product` is the Product layer at the head of the agentic-workflow-kit suite. It owns the
PRD and ID'd acceptance-criteria contract that Technical Design and Planning cite; changing that
contract's shape is a cross-repo event.

## Ground truth — read what your task touches

Altitude: `docs/product/` owns _what & why_; `docs/design/` owns _how_. Product is the contract
design reconciles to; where they conflict, name it rather than silently resolving.

| Task                                                              | Read                                   |
| ----------------------------------------------------------------- | -------------------------------------- |
| Product purpose and overview                                      | `docs/product/README.md`               |
| define-product's own product requirements and acceptance criteria | `docs/product/define-product.md`       |
| PRD and acceptance-criteria contract (the owned seam)             | `docs/product/prd-contract.md`         |
| Example product artifact using the contract                       | `docs/product/examples/minimal-prd.md` |
| Future design status and non-mechanics placeholder                | `docs/design/README.md`                |

## Gate and conventions

- **`pnpm check`** before claiming any change done; show its output as evidence, don't assert
  success. This docs-only repo's gate is lightweight today: Markdown/YAML/JSON formatting through
  Prettier. If this repo adds code later, work is test-driven with at least 90% coverage, aiming for
  95%, and `pnpm check` must include the relevant lint, typecheck, and test gates.
- **`main`-based:** branch from `main`, PR into it, green `check` required, review conversations
  resolved, squash-merge. Conventional commit subjects (`feat:`/`fix:`/`docs:`/…); no attribution
  footers.
- **Setup & worktrees:** `pnpm dev:setup` prepares a checkout (Node check, Corepack, frozen
  install); `pnpm worktree:new <branch>` creates a grouped external worktree at
  `worktrees/define-product/<branch>` and runs setup in it; `pnpm worktree:clean <branch>` removes the
  completed worktree and local branch after merge. Worktrees are **external siblings** of this
  checkout — never nested under the repo root (a nested worktree gets walked by broad globs and its
  duplicate `AGENTS.md` misleads agents). If a repo needs no setup beyond `pnpm install`, drop
  `dev:setup`; keep `worktree:new`, `worktree:clean`, and the external-sibling rule regardless.
- **No emojis** anywhere. **Immutability** — return new values, don't mutate inputs. Handle errors
  explicitly and validate external input at boundaries. Diagrams in Mermaid, inline. No hardcoded
  secrets — credentials via environment only; redact secrets, tokens, and PII in logs; if you find
  an exposed secret, stop and rotate it.
