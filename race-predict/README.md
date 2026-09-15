# RacePredict

**Running race time predictor** — enter a recent race time and distance and get your predicted finish times (and pace) at other distances — 1 mile, 5K, 10K, 15K, half, marathon, 50K — using Riegel's formula. One offline HTML file, no signup, no tracking.

👉 **[Open RacePredict](https://awictor.github.io/race-predict/)**

## Features
- Predicts across all standard distances from one input, with per-km pace
- Riegel's formula: `T₂ = T₁ · (D₂/D₁)^1.06`
- Accepts `mm:ss` or `h:mm:ss` times
- Dark mode; remembers your input; 100% client-side; works offline

## Why
"I ran 22:30 for 5K — what's a realistic marathon goal?" RacePredict answers instantly with the widely-used Riegel model, no login or upsell. It's a guide (assumes similar conditions and proper long-run training), not a promise. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`riegel`, `parseTime`, `formatTime`, `pacePerKm`) are covered by headless tests — time parsing/formatting round-trips, the Riegel identity and exponent, fatigue direction, and pace; CI runs them on every push.

## License
MIT © Alex Wictor
