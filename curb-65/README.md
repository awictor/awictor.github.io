# CURB-65

Score **CURB-65** for community-acquired pneumonia severity — tick the five signs and get the point total, a risk band, and disposition guidance. One offline HTML file, no signup, no tracking.

👉 **[Open CURB-65](https://awictor.github.io/curb-65/)**

## The five points
**C**onfusion (new) · **U**rea > 7 mmol/L (BUN > 19 mg/dL) · **R**espiratory rate ≥ 30 · low **B**lood pressure (SBP < 90 or DBP ≤ 60) · age ≥ **65**. Guidance: 0–1 outpatient, 2 consider admission, 3–5 admit / assess ICU.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`curb65`, `curb65Risk`, `disposition`) are covered by headless tests — the empty case, per-criterion points, the maximum, mixed sums, risk-band thresholds, disposition text, the criteria composition, the 0..5 range, unknown-key handling, and validation. CI runs them on every push.

## Not medical advice
A decision aid, not a substitute for clinical judgement.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
