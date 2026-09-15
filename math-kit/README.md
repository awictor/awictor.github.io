# MathKit

**Number theory toolbox** — enter a number (and an optional second) to get its prime status, prime factorization, divisors, factorial, and Fibonacci value, plus GCD, LCM, permutations (nPr), and combinations (nCr) for the pair. One offline HTML file, no signup, no tracking.

👉 **[Open MathKit](https://awictor.github.io/math-kit/)**

## Features
- Prime test, prime factorization, and full divisor list
- Factorial and nth Fibonacci number
- GCD, LCM, nPr, and nCr for two numbers
- Exact integer math; oversized results are flagged
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
A single place for the number-crunching that comes up in homework, interviews, and quick sanity checks — no ads, no app, no network. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isPrime`, `primeFactors`, `gcd`, `lcm`, `factorial`, `nPr`, `nCr`, `fib`, `divisors`) are covered by headless regression tests with known values and edge cases; CI runs them on every push.

## License
MIT © Alex Wictor
