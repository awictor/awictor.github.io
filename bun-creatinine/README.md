# BUN/Creatinine Ratio

Calculate the **BUN-to-creatinine ratio** (both in mg/dL) and see the typical interpretation band — a quick way to localize the cause of kidney dysfunction. One offline HTML file, no signup, no tracking.

👉 **[Open BUN/Creatinine Ratio](https://awictor.github.io/bun-creatinine/)**

## Interpretation
Normal ≈ 10–20:1. High (>20) suggests a prerenal cause (dehydration, GI bleed); low (<10) suggests intrinsic renal disease or low protein intake.

> Educational aid, not medical advice.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ratio`, `category`, `analyze`) are covered by headless tests: the ratio formula, the 10/20 band boundaries, prerenal/intrinsic worked examples, monotonicity, unit-independence, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
