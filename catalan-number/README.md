# Catalan Numbers

Compute the **nth Catalan number**, list the **sequence**, and test whether a number **is** Catalan. Catalan numbers count balanced parentheses, binary search trees, polygon triangulations, and more. One offline HTML file, no signup, no tracking.

👉 **[Open Catalan Numbers](https://awictor.github.io/catalan-number/)**

## Formula
`Cₙ = (2n)! / ((n+1)!·n!) = C(2n, n) / (n+1)`. Sequence: 1, 1, 2, 5, 14, 42, 132… Exact up to C(30) (JavaScript's safe integer range).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`catalan`, `sequence`, `isCatalan`) are covered by headless tests: the first terms, C(10)/C(15)/C(20)/C(30), agreement with the binomial formula, the product recurrence, membership recognize/reject, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
