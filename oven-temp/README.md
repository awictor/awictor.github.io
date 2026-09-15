# OvenTemp

**Oven temperature converter** — convert between Celsius, Fahrenheit, and UK gas marks, with the nearest gas mark and a heat description. One offline HTML file, no signup, no tracking.

👉 **[Open OvenTemp](https://awictor.github.io/oven-temp/)**

## Features
- Exact °C ⇄ °F; nearest UK gas mark (¼–9)
- Tap a gas mark to set the temperature
- Heat description (Very cool → Very hot)
- Dark mode; 100% client-side

## Why
Recipes mix °C, °F, and gas marks freely, and gas marks are discrete steps that don't map cleanly to round Celsius numbers. OvenTemp converts all three offline. Complements the volume/weight [cooking converter](https://awictor.github.io/toolkit/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cToF`, `fToC`, `gasMarkToF`, `fToGasMark`, `describe`) are covered by headless tests — C⇄F, the 250+25N gas-mark rule, fractional marks, nearest-mark rounding, monotonic marks, heat bands, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
