---
title: define-product — product
status: draft
---

# define-product — product

`define-product` helps a product owner produce a PRD with stable, ID'd acceptance criteria. Those
IDs give Technical Design and Planning durable product-intent references without making downstream
repos read Product-layer internals.

## Product Outcome

Owners need a compact, reviewable way to express what a software change should achieve, why it
matters, and how success will be recognized before design or delivery decomposes the work.

This repo's M3 contract defines the document shape for that product intent. It does not design a
workflow, runtime, CLI, schema validator, or planning decomposition.

## Product Contract

- [`prd-contract.md`](./prd-contract.md) defines required PRD sections and the stable
  acceptance-criteria-ID rules.
- [`examples/minimal-prd.md`](./examples/minimal-prd.md) is a concrete fixture using the contract.

## Boundaries

- Product owns outcomes, user jobs, constraints, assumptions, non-goals, and acceptance criteria.
- Technical Design may cite acceptance-criteria IDs when explaining how design decisions satisfy
  product intent.
- Planning may cite acceptance-criteria IDs when preserving product traceability into execution
  plans.
- Downstream layers must not treat Product-layer prose order, headings outside the contract, future
  tooling, or local implementation details as dependencies.
