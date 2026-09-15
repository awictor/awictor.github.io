# Happy Numbers

Check whether a number is a **happy number** — repeatedly summing the squares of its digits reaches 1 — see the chain, and list happy numbers up to a limit. One offline HTML file, no signup, no tracking.

👉 **[Open Happy Numbers](https://awictor.github.io/happy-number/)**

## Example
`19 → 82 → 68 → 100 → 1` (happy). Unhappy numbers fall into the cycle …4, 16, 37, 58, 89, 145, 42, 20, 4… The happy numbers below 50: 1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sumSquareDigits`, `chain`, `isHappy`, `happyUpTo`) are covered by headless tests: the 19 chain, happy/unhappy spreads, `happyUpTo(50)`, chain termination, consistency with `isHappy`, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
