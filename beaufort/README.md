# Beaufort

**Wind speed → Beaufort scale** — enter a wind speed in mph, km/h, knots, or m/s and get its Beaufort force number (0–12), name, and description, plus the speed in every unit. One offline HTML file, no signup, no tracking.

👉 **[Open Beaufort](https://awictor.github.io/beaufort/)**

## Features
- Force 0 (Calm) through 12 (Hurricane force) with names and land/sea effects
- Input in mph / km·h / knots / m·s; shows all four conversions
- Monotonic, spec-accurate thresholds
- Dark mode; 100% client-side

## Why
Weather and marine reports quote wind in different units and forecasters think in Beaufort. Beaufort maps any wind speed to the right force and describes what it means, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toMs`, `beaufort`) are covered by headless tests — unit conversions, force boundaries (calm, mid-scale, hurricane), name mapping, the 40 mph = gale case, monotonicity across the range, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor
