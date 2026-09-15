# WaterIntake

**Daily water intake calculator** — estimate how much water to drink each day from your body weight and exercise, shown in mL, litres, cups, and fluid ounces. One offline HTML file, no signup, no tracking.

👉 **[Open WaterIntake](https://awictor.github.io/water-intake/)**

## Features
- Target from body weight (kg or lb) plus daily exercise minutes
- Shown in litres, mL, US cups, and fl oz
- Simple, transparent formula (~33 mL/kg + 350 mL per 30 min of exercise)
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
A quick, private baseline for daily hydration. It's a rough guideline — real needs vary with climate, health, and diet. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dailyWaterMl`, `mlToLitres`, `mlToCups`, `mlToOz`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
