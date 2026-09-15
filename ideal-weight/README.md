# IdealWeight

**Ideal body weight calculator** — estimate ideal weight with the four classic formulas (Devine, Robinson, Miller, Hamwi) and see the healthy weight range from BMI 18.5–24.9 for your height. One offline HTML file, no signup, no tracking.

👉 **[Open IdealWeight](https://awictor.github.io/ideal-weight/)**

## Features
- Devine, Robinson, Miller, and Hamwi formulas side by side
- Healthy weight range derived from BMI for your height
- Optional current weight to see where you land in the range
- Male / female; dark mode; remembers your inputs
- 100% client-side; works offline

## Why
"Ideal weight" has no single answer — clinicians use several formulas that disagree by a few kilos, and a BMI-based range is often more useful than any single number. IdealWeight shows them all. Estimates only, not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`inchesOver5ft`, `idealWeights`, `healthyRange`, `averageIdeal`) are covered by headless regression tests against worked values, the 5ft base case, and BMI-range math; CI runs them on every push.

## License
MIT © Alex Wictor
