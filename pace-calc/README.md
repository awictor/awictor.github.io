# PaceCalc

**Running pace calculator** — enter a distance and a finish time to get your pace per km and per mile, plus your speed in km/h and mph. Race-distance presets for 5K, 10K, half, and marathon. One offline HTML file, no signup, no tracking.

👉 **[Open PaceCalc](https://awictor.github.io/pace-calc/)**

## Features
- Distance (km or mi) + time → pace per km, pace per mile, km/h, mph
- Presets: 5K, 10K, half marathon, marathon, 1 mile
- Clean mm:ss / h:mm:ss formatting
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Runners think in pace, not just time. PaceCalc turns any run into pace and speed instantly, and the presets make race planning quick. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toSeconds`, `pacePerKm`, `speedKmh`, `fmtClock`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
