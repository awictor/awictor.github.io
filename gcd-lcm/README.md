# GCD & LCM Calculator

Find the **greatest common divisor** and **least common multiple** of two or more integers. GCD reduces fractions to lowest terms; LCM finds common denominators and aligns repeating schedules. One offline HTML file, no signup, no tracking.

👉 **[Open GCD & LCM Calculator](https://awictor.github.io/gcd-lcm/)**

## Notes
Computed with the Euclidean algorithm. For two numbers, `GCD(a,b) × LCM(a,b) = a × b`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gcd`, `lcm`, `gcdAll`, `lcmAll`, `parseNumbers`) are covered by headless tests: Euclid's 1071/462 = 21, gcd-with-zero, coprimality, LCM basics, symmetry, the gcd·lcm = a·b identity, multi-number reduction, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
