# Egyptian Fraction

A single-file, offline tool that decomposes any proper fraction into a sum of **distinct unit fractions** (1/n) — the way ancient Egyptians wrote fractions — using the greedy Fibonacci-Sylvester algorithm.

**Live:** https://awictor.github.io/egyptian-fraction/

## Features

- **Greedy decomposition** — `1/⌈den/num⌉` repeatedly until nothing remains
- **Exact integer math** — fractions are reduced with gcd; no floating-point rounding
- Guards against overflow when greedy expansions explode
- Preset chips and a live result
- Dark mode, 100% offline, zero dependencies

## Example

`6/7 = 1/2 + 1/3 + 1/42`

## Tests

```
node tests/selftest.mjs
```

10 checks with classic decompositions and exact reconstruction (`sumUnits` inverts `egyptian`). No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
