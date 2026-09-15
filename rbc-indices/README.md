# RBC Indices

Calculate the **red blood cell indices** — **MCV**, **MCH**, **MCHC** — from hemoglobin, hematocrit, and RBC count, with a microcytic / normocytic / macrocytic readout. One offline HTML file, no signup, no tracking.

👉 **[Open RBC Indices](https://awictor.github.io/rbc-indices/)**

## Formulas
- MCV (fL) = Hct% ÷ RBC × 10
- MCH (pg) = Hgb ÷ RBC × 10
- MCHC (g/dL) = Hgb ÷ Hct × 100
- MCV: <80 microcytic · 80–100 normocytic · >100 macrocytic

> Educational aid, not medical advice.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`mcv`, `mch`, `mchc`, `mcvCategory`, `analyze`) are covered by headless tests: the three formulas, category boundaries, normocytic/microcytic/macrocytic worked examples, the MCHC = MCH/MCV×100 identity, monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
