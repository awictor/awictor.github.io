# Waist-to-Hip Ratio

Calculate your **waist-to-hip ratio (WHR)** and see the **WHO health-risk category** for your sex. Measure both circumferences in the same unit — the ratio is unitless. One offline HTML file, no signup, no tracking.

👉 **[Open Waist-to-Hip Ratio](https://awictor.github.io/waist-hip-ratio/)**

## Categories (WHO)
- **Men:** < 0.90 low · 0.90–0.99 moderate · ≥ 1.0 high
- **Women:** < 0.80 low · 0.80–0.84 moderate · ≥ 0.85 high

> Educational aid, not medical advice.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ratio`, `categorize`, `analyze`) are covered by headless tests: the ratio formula, unit-independence, every category boundary for both sexes, the bundled analysis, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
