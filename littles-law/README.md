# Little's Law

A single-file, offline calculator for **Little's Law** — `L = λ · W` — with an **M/M/1 queue** sidecar. Solve for any of WIP, throughput, or lead time, and see how utilization drives expected system size and wait time.

**Live:** https://awictor.github.io/littles-law/

## Features

- Solve any of the three variables from the other two
- Instant WIP ↔ throughput ↔ lead-time reasoning for kanban, Ops, and capacity planning
- **M/M/1 sidecar** — utilization ρ = λ/μ, expected in-system L = ρ/(1−ρ), wait time W = 1/(μ−λ)
- Stability flag when λ ≥ μ
- Dark mode, 100% offline, zero dependencies

## Why it matters

Little's Law is the most useful law in queueing theory: it holds for *any* stable system, no matter the arrival pattern or scheduling. If your team is bogged down, the lever is almost always to cut WIP or add throughput — this tool makes the tradeoff concrete.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions, including cross-consistency between Little's Law and M/M/1. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
