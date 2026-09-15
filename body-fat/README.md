# BodyFat

**U.S. Navy body fat estimator** — enter a few tape measurements and get an estimated body-fat percentage, its fitness category, and (with weight) your lean and fat mass. One offline HTML file, no signup, no tracking.

👉 **[Open BodyFat](https://awictor.github.io/body-fat/)**

## Features
- U.S. Navy circumference method (male and female formulas)
- ACE body-fat category (Essential → Obese)
- Optional weight → lean mass and fat mass in kg
- Dark mode, remembers your measurements
- 100% client-side; works offline

## Why
The Navy tape method needs no calipers or scale — just a measuring tape — and it's the most accessible body-fat estimate around. BodyFat does the log-based math instantly and offline. Estimate only, not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`navyBodyFat`, `bodyFatCategory`, `fatMass`, `leanMass`) are covered by headless regression tests against worked examples, input validation, and category thresholds; CI runs them on every push.

## License
MIT © Alex Wictor
