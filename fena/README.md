# FENa Calculator

**Fractional excretion of sodium (FENa)** — and urea (FEUrea) — to distinguish prerenal from intrinsic acute kidney injury. Enter the urine and plasma sodium/urea and creatinine values. One offline HTML file, no signup, no tracking.

👉 **[Open FENa Calculator](https://awictor.github.io/fena/)**

## Formulas
`FENa = (U_Na × P_Cr) / (P_Na × U_Cr) × 100` — <1% prerenal, >2% intrinsic (e.g. ATN). Diuretics invalidate FENa; use `FEUrea` instead (<35% suggests prerenal).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`feNa`, `feUrea`, `interpretFeNa`, `interpretFeUrea`) are covered by headless tests — the formulas, prerenal/intrinsic examples, interpretation thresholds and boundaries, monotonicity, and validation. CI runs them on every push.

## Not medical advice
Education only; interpretation is clinical. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
