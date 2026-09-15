# Fibonacci Calculator

Find the **nth Fibonacci number**, list the **sequence**, and test whether a number **is** a Fibonacci number. One offline HTML file, no signup, no tracking.

👉 **[Open Fibonacci Calculator](https://awictor.github.io/fibonacci/)**

## Notes
`F(0)=0, F(1)=1, F(n)=F(n−1)+F(n−2)`. Membership uses the identity: x is Fibonacci iff 5x²+4 or 5x²−4 is a perfect square. Exact up to F(78) (JavaScript's safe integer range).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`fib`, `sequence`, `isFibonacci`) are covered by headless tests: known terms, the recurrence over 40 terms, F(78) exactness, membership recognize/reject, generated-terms-are-Fibonacci, golden-ratio convergence, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
