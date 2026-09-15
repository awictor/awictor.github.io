# Bloom Filter Calculator

A single-file, offline calculator for sizing a **Bloom filter** — the compact probabilistic set used in databases, caches, and networking. Enter your expected item count and target false-positive rate; get the optimal bit array size, hash function count, memory needed, and the actual false-positive rate.

**Live:** https://awictor.github.io/bloom-filter/

## Features

- **Optimal bits** — `m = −n·ln(p) / (ln2)²`
- **Optimal hashes** — `k = (m/n)·ln2 = −log₂(p)`
- **Bits per element** (independent of item size)
- **Actual FP rate** at the chosen m and k, plus expected fill ratio
- Human-readable memory estimate (B/KB/MB/GB)
- Dark mode, 100% offline, zero dependencies

## Good to know

A 1% Bloom filter needs about **9.6 bits per element** no matter how large each item is. Tightening to 0.1% roughly adds another ~4.8 bits per element.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions with known Bloom-filter identities. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
