# Corrected Sodium

**Glucose-corrected serum sodium.** In hyperglycemia, high glucose dilutes sodium so it reads falsely low. Enter measured sodium and glucose to get the corrected value, using either the Katz (1.6) or Hillier/Adrogué (2.4) factor. One offline HTML file, no signup, no tracking.

👉 **[Open Corrected Sodium](https://awictor.github.io/corrected-sodium/)**

## The formula
`corrected Na = measured Na + factor × (glucose − 100) / 100` (glucose in mg/dL). The 1.6 factor is traditional; 2.4 is more accurate above ~400 mg/dL. Normal range 135–145 mEq/L.

## Features
- Katz 1.6 and Hillier 2.4 factors
- Measured vs corrected and the correction delta
- Sodium status (hypo / normal / hyper)
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`correctedSodium`, `sodiumStatus`) are covered by headless tests — both factors, the no-correction-at-100 case, negative correction below 100, linearity, default factor, and status boundaries. CI runs them on every push.

## Not medical advice
For education only. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
