# BACCalc

**Blood alcohol content (BAC) estimator** — enter your weight, sex, drinks and time to estimate your BAC with the Widmark formula, plus how long until you're sober and back under 0.08. One offline HTML file, no signup, no tracking.

👉 **[Open BACCalc](https://awictor.github.io/bac-calc/)**

> ⚠️ **Educational estimate only.** The Widmark formula is a rough approximation and can be off by a wide margin depending on food, metabolism, medication and more. **Never use it to decide whether to drive.** If you've been drinking, don't drive.

## Features
- Widmark estimate from weight (kg/lb), sex, standard drinks and elapsed hours
- Adjustable grams-per-drink (14 g US, ~8–10 g UK/AU) and elimination rate
- Estimated time until sober and time until under the 0.08 limit
- Plain-language impairment status; dark mode; remembers your inputs
- 100% client-side; works offline

## Why
Curiosity about "roughly where am I" is common, but the arithmetic is fiddly and most online calculators send your data somewhere. BACCalc does the Widmark math locally and is loud about its limits. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bac`, `alcoholGrams`, `standardDrinksToGrams`, `timeToZero`, `timeToLegal`, `bacStatus`) are covered by headless tests with known Widmark values, elimination over time, and status thresholds; CI runs them on every push.

## License
MIT © Alex Wictor
