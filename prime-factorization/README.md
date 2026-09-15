# Prime Factorization

Break any integer into its **prime factors** (`360 = 2³ × 3² × 5`), test whether it's prime, and see its divisor count. One offline HTML file, no signup, no tracking.

👉 **[Open Prime Factorization](https://awictor.github.io/prime-factorization/)**

## Details
By the fundamental theorem of arithmetic, every integer > 1 has a unique prime factorization. This tool uses trial division up to √n — instant for everyday numbers. Divisor count = product of (each exponent + 1).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`primeFactors`, `factorList`, `isPrime`, `divisorCount`, `factorString`) are covered by headless tests: the 360 and 1,000,000 factorizations, product-reconstructs-n across many values, isPrime cross-checked against factorization for 2–199, divisor counts, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
