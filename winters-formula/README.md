# Winters' Formula

**Expected PaCO₂ in a metabolic acidosis.** Enter bicarbonate (HCO₃⁻) to get the expected PaCO₂ by Winters' formula, and optionally a measured PaCO₂ to check whether respiratory compensation is appropriate or a mixed disorder is present. One offline HTML file, no signup, no tracking.

👉 **[Open Winters' Formula](https://awictor.github.io/winters-formula/)**

## The formula
`expected PaCO₂ = 1.5 × HCO₃⁻ + 8 (± 2)`. Measured PaCO₂ within the range → appropriate compensation; **higher** → concurrent respiratory acidosis; **lower** → concurrent respiratory alkalosis.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`expectedPCO2`, `pco2Range`, `interpret`) are covered by headless tests — the formula, the ±2 range, appropriate/high/low interpretation, boundaries, and validation. CI runs them on every push.

## Not medical advice
For education only; interpret ABGs in clinical context. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
