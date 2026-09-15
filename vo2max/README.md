# VO2Max

**VO₂max estimator & fitness rating** — estimate your maximal oxygen uptake from a 12-minute Cooper run or your resting heart rate, then see where it puts you on the Cooper Institute fitness scale for your age and sex. One offline HTML file, no signup, no tracking.

👉 **[Open VO2Max](https://awictor.github.io/vo2max/)**

> ⚠️ Estimates only — not medical advice. Consult a professional before starting a fitness program.

## Features
- Two methods: 12-minute Cooper run distance, or the Uth–Sørensen resting-heart-rate estimate
- Auto max-HR from age (220 − age) when you don't measure it
- Fitness category (Very poor → Superior) from Cooper Institute norms by age decade and sex
- Dark mode; 100% client-side

## Why
VO₂max is the single best field measure of aerobic fitness, and both the Cooper run and the resting-HR method give a solid estimate without a lab. VO2Max does the math and tells you how you rank. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cooper`, `uth`, `hrMaxFromAge`, `ageBracket`, `category`) are covered by headless tests — both estimation formulas, age bracketing, the category ladder, sex-specific norms, and age shifts. CI runs them on every push.

## License
MIT © Alex Wictor
