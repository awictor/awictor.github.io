# CorrectedCalcium

**Albumin-corrected calcium calculator** — correct a serum calcium for a low or high albumin level (mg/dL or SI mmol/L), with a low / normal / high interpretation. One offline HTML file, no signup, no tracking.

👉 **[Open CorrectedCalcium](https://awictor.github.io/corrected-calcium/)**

## Features
- US: corrected Ca = Ca + 0.8 × (4.0 − albumin g/dL)
- SI: corrected Ca = Ca + 0.02 × (40 − albumin g/L)
- Normal / low / high category against standard reference ranges
- Dark mode; 100% client-side

## Why
Most serum calcium is bound to albumin, so a low albumin drops total calcium without lowering the active (ionized) level — correcting for it avoids over-diagnosing hypocalcemia. CorrectedCalcium does the adjustment offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
Ionized calcium is the definitive measure; this correction is an estimate a clinician interprets in context.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`correctedCalcium`, `correctedCalciumSI`, `category`) are covered by headless tests — low/normal/high albumin effects, the SI formula, category bands and boundaries (US & SI), the masked-hypocalcemia scenario, linearity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
