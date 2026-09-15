# Free Water Deficit

**Estimate the free water deficit in hypernatremia.** Enter weight, a total-body-water factor, and current/target sodium to get the water needed to correct toward target. One offline HTML file, no signup, no tracking.

👉 **[Open Free Water Deficit](https://awictor.github.io/free-water-deficit/)**

## The formula
`deficit = TBW × (current Na ÷ target Na − 1)`, with `TBW = weight × factor` (0.6 adult male/child, 0.5 adult female/elderly male, 0.45 elderly female). Correct slowly — generally ≤10 mEq/L per 24 h — and account for ongoing losses.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tbw`, `freeWaterDeficit`) are covered by headless tests — TBW math, the 70 kg/Na 154 → 4.2 L example, zero at target, default target, monotonicity, sex-factor effect, negative for water excess, custom target, weight scaling, and validation. CI runs them on every push.

## Not medical advice
Education only; a starting estimate, not a prescription. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
