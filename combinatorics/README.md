# Combinations & Permutations

Compute **combinations (nCr)**, **permutations (nPr)**, and **factorials** exactly — for probability, counting, and odds problems. Uses an exact multiplicative method, so big counts like the 2,598,960 possible poker hands are precise. One offline HTML file, no signup, no tracking.

👉 **[Open Combinations & Permutations](https://awictor.github.io/combinatorics/)**

## Formulas
- Combinations (order ignored): `nCr = n! / (r!·(n−r)!)`
- Permutations (order matters): `nPr = n! / (n−r)!`
- Always `nPr = nCr · r!`

## Tests
```
node tests/selftest.mjs
```
Pure functions (`factorial`, `permutations`, `combinations`) are covered by headless tests: worked values, exact 52C5 / 49C6, combination symmetry, Pascal's identity, the nPr = nCr·r! relationship, agreement with the factorial formula, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
