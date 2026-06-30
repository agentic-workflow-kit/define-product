# define-product

Product-layer PRD and acceptance-criteria contracts for the agentic-workflow-kit suite.

## Status

Seeded for M3. This repo currently defines the product-facing contract only: how a PRD records
outcomes, constraints, assumptions, non-goals, and stable acceptance-criteria IDs. Design mechanics,
schemas, CLIs, and runtime behavior are future work.

## Development

```bash
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` is the single required local and CI gate.

## Documentation

- [`docs/product/`](docs/product/) — what & why (audience-facing).
- [`docs/design/`](docs/design/) — how (mechanics, decisions, contracts).
- [`docs/product/prd-contract.md`](docs/product/prd-contract.md) — PRD and
  acceptance-criteria-ID contract.
- [`docs/product/examples/minimal-prd.md`](docs/product/examples/minimal-prd.md) — minimal PRD
  fixture.

## Relationship to the suite

`define-product` sits at the head of the suite spine:

```text
define / PRD -> technical-design -> design -> plan -> jig (run) -> learning loop
```

Technical Design and Planning may cite PRD and acceptance-criteria IDs from this repo's product
contract. They must not depend on future Product-layer implementation internals.

## License

MIT License. See [LICENSE](LICENSE).
