# Perfect Numbers

Check whether a number is **perfect**, **abundant**, or **deficient** from its proper-divisor sum, see the divisors, and list the perfect numbers up to a limit. One offline HTML file, no signup, no tracking.

👉 **[Open Perfect Numbers](https://awictor.github.io/perfect-number/)**

## Definitions
A **perfect** number equals the sum of its proper divisors (6 = 1+2+3; also 28, 496, 8128). If the sum exceeds the number it's **abundant**; if it's less, **deficient**.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`properDivisors`, `divisorSum`, `classify`, `isPerfect`, `perfectUpTo`) are covered by headless tests: divisors of composites/primes, divisor sums, the four known perfect numbers ≤ 10000, abundant/deficient classification, sum consistency, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
