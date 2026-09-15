# CockcroftGault

**Creatinine clearance calculator** — estimate CrCl with the classic Cockcroft-Gault equation from age, weight, sex, and serum creatinine. The formula used for renal drug dosing. One offline HTML file, no signup, no tracking.

👉 **[Open CockcroftGault](https://awictor.github.io/cockcroft-gault/)**

## Features
- Cockcroft-Gault CrCl (mL/min) with the 0.85 female factor
- Serum creatinine in mg/dL or µmol/L
- Function-decline category (Normal → Kidney failure)
- Dark mode; 100% client-side

## Why
Cockcroft-Gault is still the reference for renal drug dosing (many drug labels specify it), and it differs from CKD-EPI [eGFR](https://awictor.github.io/egfr/). CockcroftGault computes it offline so no patient data leaves the browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
Uses actual body weight; some dosing uses ideal or adjusted weight. This tool does the arithmetic only — a clinician decides.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cockcroftGault`, `crclFrom`, `category`) are covered by headless tests — reference values, the female factor, monotonicity in creatinine/age/weight, µmol/L conversion, category bands and boundaries, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
