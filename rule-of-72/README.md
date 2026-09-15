# RuleOf72

**Doubling time & Rule of 72 calculator** — enter a growth rate and see the exact time for money to double, the Rule of 72/70/69.3 estimates and their error, plus tripling and 10× times. One offline HTML file, no signup, no tracking.

👉 **[Open RuleOf72](https://awictor.github.io/rule-of-72/)**

## Features
- Exact doubling time: `ln 2 / ln(1 + r)`
- Rule of 72, 70, and 69.3 estimates with the error vs exact
- Tripling and 10× times; implied-rate inverse
- Rate slider; dark mode; 100% client-side

## Why
The Rule of 72 is the classic mental-math shortcut for compound growth, but it's an approximation. RuleOf72 shows the exact answer next to the estimates so you can see when the shortcut is (and isn't) good enough. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`doublingTime`, `multiplyingTime`, `ruleOf`, `impliedRate`) are covered by headless tests — the `ln2/ln(1+r)` formula, the (1+r)^t = 2 identity, tripling/10×, the Rule-of-N estimates and their closeness, the implied-rate inverse, monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
