# Energy Converter

Convert energy between **joules, kilojoules, calories, kilocalories (food Calories), watt-hours, kilowatt-hours, BTU, foot-pounds, and electronvolts** — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Energy Converter](https://awictor.github.io/energy-converter/)**

## Reference
1 kWh = 3,600,000 J = 3,600 kJ ≈ 860 kcal ≈ 3,412 BTU. A food Calorie is a kilocalorie (4,184 J). Converts through joules for exactness.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toJoules`, `fromJoules`, `convert`, `all`) are covered by headless tests: the kWh/kcal/BTU vectors, the eV round-trip, identity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
