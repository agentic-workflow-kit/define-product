# define-product

Turn product intent into a clear, reviewable PRD with stable, ID'd acceptance criteria — usable on its own as an independent tool/skills pack, or as the Product layer of the agentic-workflow-kit suite.

## Status

Seeded for M3. The product is now defined for its own design step — see the [product
overview](docs/product/README.md) and the [define-product PRD](docs/product/define-product.md) — on
top of the outward PRD / acceptance-criteria-ID contract. Design mechanics, schemas, CLIs, and
runtime behavior are future work derived from these product docs.

## Development

```bash
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` is the single required local and CI gate.

## Documentation

- [`docs/product/`](docs/product/) — what & why (audience-facing); start with the
  [overview](docs/product/README.md).
- [`docs/product/define-product.md`](docs/product/define-product.md) — the define-product PRD:
  requirements and ID'd acceptance criteria.
- [`docs/product/prd-contract.md`](docs/product/prd-contract.md) — the outward PRD and
  acceptance-criteria-ID contract other tools cite.
- [`docs/product/examples/minimal-prd.md`](docs/product/examples/minimal-prd.md) — minimal PRD
  fixture.
- [`docs/design/`](docs/design/) — how (mechanics, decisions, contracts); future work.

## Relationship to the suite

`define-product` sits at the head of the suite spine:

```text
define-product -> technical-design -> design-to-plan -> jig (run) -> learning loop
```

Technical Design and Planning may cite PRD and acceptance-criteria IDs from this repo's product
contract. They must not depend on future Product-layer implementation internals.

## License

MIT License. See [LICENSE](LICENSE).
