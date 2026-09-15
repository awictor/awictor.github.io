# TDEECalc

**Calorie & TDEE calculator** — estimate your daily energy needs: BMR via the Mifflin–St Jeor equation, TDEE by activity level, and calorie targets for losing, maintaining, or gaining. Metric or imperial. One offline HTML file, no signup, no tracking.

👉 **[Open TDEECalc](https://awictor.github.io/tdee-calc/)**

## Features
- BMR (Mifflin–St Jeor) and TDEE by activity level
- Goal targets: −500 (lose), maintain, +500 (gain)
- Metric (kg, cm) and imperial (lb, in)
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Calorie planning starts with knowing your maintenance number. TDEECalc computes it locally with the widely-used Mifflin–St Jeor formula. (Estimates only, not medical advice.) Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bmrMifflin`, `tdee`, `goalCalories`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
