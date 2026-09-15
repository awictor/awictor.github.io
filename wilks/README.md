# Wilks Calculator

**Calculate your Wilks score** — a bodyweight-adjusted powerlifting coefficient that lets lifters in different weight classes be compared fairly. Enter bodyweight and total (squat + bench + deadlift). One offline HTML file, no signup, no tracking.

👉 **[Open Wilks Calculator](https://awictor.github.io/wilks/)**

## How it works
Wilks score = total × coefficient, where the coefficient is `500 / P(bodyweight)` and P is a 5th-degree polynomial (original Wilks, separate constants for men and women). Lighter lifters get a higher coefficient. Rough guide: 300 strong, 400 elite, 500+ world-class.

## Features
- Wilks coefficient and score
- Male / female formulas; kg or lb input
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`wilksCoefficient`, `wilksScore`, `lbToKg`) are covered by headless tests — the known 100 kg male coefficient (≈0.6086), score = total × coefficient, linear scaling, lighter-lifter advantage, male/female difference, positivity, unit conversion, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
