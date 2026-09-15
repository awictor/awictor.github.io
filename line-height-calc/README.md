# Line Height Calculator

Convert line-height between a **unitless ratio** and **pixels** for a given font size, see the **leading** and half-leading, and get a recommended body-text range. One offline HTML file, no signup, no tracking.

👉 **[Open Line Height Calculator](https://awictor.github.io/line-height-calc/)**

## Notes
Unitless line-height scales with font size (the recommended CSS value): 16px × 1.5 = 24px. Leading = line-height − font size, split half above/below. Aim for ~1.4–1.6 for body text.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pxLineHeight`, `ratioFromPx`, `leading`, `halfLeading`, `recommend`) are covered by headless tests: the 16px×1.5=24 vector, px↔ratio round-trip, leading/half-leading, the 1.4–1.6 recommended band (and custom bands), monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
