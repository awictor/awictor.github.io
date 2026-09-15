# Wallpaper Calculator

Work out **how many rolls of wallpaper a room needs** from wall dimensions, roll size, pattern repeat and spares — with proper pattern-matching allowance. One offline HTML file, no signup, no tracking.

👉 **[Open Wallpaper Calculator](https://awictor.github.io/wallpaper-calc/)**

## How it works
Each vertical strip ("drop") must be as tall as the wall **plus one pattern repeat** so the pattern lines up — the main source of waste. The tool counts drops per roll, drops needed around the perimeter, and rounds up to whole rolls. Metric units; a typical roll is 0.53 m × 10 m.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dropLength`, `dropsPerRoll`, `dropsNeeded`, `rollsNeeded`, `totalRunLength`) are covered by headless tests — the pattern-repeat drop length, floor/ceil rounding, worked plain and patterned examples, monotonicity in perimeter and height, perimeter summing, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
