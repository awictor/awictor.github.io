# LDL Cholesterol Calculator

Estimate **LDL cholesterol** with the Friedewald equation, plus **non-HDL cholesterol** and the **total-to-HDL ratio**, in mg/dL or mmol/L. One offline HTML file, no signup, no tracking.

👉 **[Open LDL Cholesterol Calculator](https://awictor.github.io/ldl-calc/)**

## The formula
**LDL = Total − HDL − Triglycerides ÷ 5** (mg/dL; ÷ 2.19 for mmol/L). It becomes unreliable at high triglycerides (≥ 400 mg/dL), so the tool blocks that case and points you to non-HDL, which stays valid.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ldlFriedewald`, `nonHdl`, `cholRatio`, `classifyLdl`) are covered by headless tests — the mg/dL and mmol/L formulas, the high-triglyceride guard in both units, non-HDL and ratio, the LDL/non-HDL relationship, monotonicity in triglycerides, category boundaries, and validation. CI runs them on every push.

## Not medical advice
Education only; discuss results with a clinician.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
