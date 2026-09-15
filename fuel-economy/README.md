# Fuel Economy Converter

Convert fuel economy between **US MPG**, **Imperial (UK) MPG**, **litres per 100 km**, and **kilometres per litre** — all four shown at once. One offline HTML file, no signup, no tracking.

👉 **[Open Fuel Economy Converter](https://awictor.github.io/fuel-economy/)**

## Why it matters
MPG and km/L measure *efficiency* (higher is better); L/100 km measures *consumption* (lower is better) — so it's the inverse. US and Imperial MPG differ because the gallons differ (3.785 L vs 4.546 L). This tool handles all of that with exact constants.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toL100km`, `fromL100km`, `convert`, `all`) are covered by headless tests: derived constants, the canonical 30 US MPG ≈ 7.84 L/100 km ≈ 12.75 km/L vector, the ~1.201 gallon ratio, L/100km↔km/L reciprocity, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
