# OneRepMax

**1RM calculator** — estimate your one-rep max from a weight and reps using the Epley and Brzycki formulas, and get a training-percentage table (95% down to 50% of your max). One offline HTML file, no signup, no tracking.

👉 **[Open OneRepMax](https://awictor.github.io/one-rep-max/)**

## Features
- Epley and Brzycki estimates, plus their average
- Training-percentage table for programming your sets
- kg or lb
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Knowing your 1RM (without actually maxing out) is the basis of most strength programs. OneRepMax estimates it from a working set and shows the percentages you'll train at. Estimates only — lift safely. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`epley`, `brzycki`, `oneRepMax`, `percentOfMax`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
