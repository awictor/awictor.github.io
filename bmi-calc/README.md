# BMICalc

**BMI calculator** — compute your Body Mass Index in metric or imperial units, see your WHO category, and get your healthy weight range. One offline HTML file, no signup, no tracking.

👉 **[Open BMICalc](https://awictor.github.io/bmi-calc/)**

## Features
- Metric (kg, cm) and imperial (lb, ft/in) input
- WHO category (Underweight / Normal / Overweight / Obese) with a colored scale
- Healthy weight range for your height
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
BMI is the most common quick health screen, and it should be instant and private. BMICalc computes it locally with both unit systems. (BMI is a rough screen, not a diagnosis.) Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bmi`, `bmiImperial`, `bmiCategory`, `healthyRange`) are covered by headless regression tests, including WHO thresholds; CI runs them on every push.

## License
MIT © Alex Wictor
