# Cooking Converter

Convert kitchen volume measurements between **teaspoons, tablespoons, cups, fluid ounces, millilitres, and litres** (US customary) — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Cooking Converter](https://awictor.github.io/cooking-converter/)**

## Equivalences
1 tbsp = 3 tsp · 1 fl oz = 2 tbsp · 1 cup = 8 fl oz = 16 tbsp = 48 tsp ≈ 236.6 ml. (US units, not metric/UK cups.)

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toMl`, `fromMl`, `convert`, `all`) are covered by headless tests: the tsp/tbsp/fl oz/cup equivalences, 1 cup ≈ 236.59 ml, litre scaling, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
