# eGFR

**Kidney function calculator (CKD-EPI 2021)** — estimate glomerular filtration rate from serum creatinine using the current race-free CKD-EPI 2021 equation, and see the corresponding CKD stage. One offline HTML file, no signup, no tracking.

👉 **[Open eGFR](https://awictor.github.io/egfr/)**

## Features
- CKD-EPI 2021 creatinine equation (race-free) — the current U.S. standard
- Serum creatinine in mg/dL or µmol/L; sex and age inputs
- Result in mL/min/1.73m² with color-coded CKD stage (G1–G5, including G3a/G3b)
- Dark mode; 100% client-side

## Why
eGFR is the standard measure of kidney function, and the 2021 equation removed the race coefficient. This tool applies the exact formula offline so you can interpret a creatinine result without sending health data anywhere. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
eGFR is one input among many; a clinician interprets it in context (trend, cause, other labs). This tool is informational only.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`egfr`, `egfrFrom`, `stage`) are covered by headless tests against computed reference values (male/female at 60y, low-creatinine high eGFR), monotonicity in creatinine and age, µmol/L conversion, and every CKD stage boundary. CI runs them on every push.

## License
MIT © Alex Wictor
