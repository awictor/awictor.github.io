# Divisor Sum

A single-file, offline number-theory tool. List all divisors of a number and compute the divisor sum σ(n), divisor count τ(n), and aliquot sum — and classify it as **perfect**, **abundant**, or **deficient**.

**Live:** https://awictor.github.io/divisor-sum/

## Features

- **All divisors**, sorted
- **σ(n)** divisor sum and **τ(n)** divisor count
- **Aliquot sum** (proper divisors) and abundance
- Perfect / abundant / deficient classification
- Dark mode, 100% offline, zero dependencies

## Examples

6, 28, 496, 8128 are **perfect**; 12 is **abundant**; every prime is **deficient**. σ is multiplicative: σ(12) = σ(4)·σ(3) = 28.

## Tests

```
node tests/selftest.mjs
```

10 checks including multiplicativity, perfect numbers, and prime/power-of-two deficiency. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
