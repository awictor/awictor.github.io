# Speed Converter

Convert speed between **m/s, km/h, mph, knots, and ft/s** — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Speed Converter](https://awictor.github.io/speed-converter/)**

## Reference
Exact by definition: 1 mile = 1609.344 m, 1 nautical mile = 1852 m, 1 foot = 0.3048 m. So 100 km/h = 62.137 mph = 53.996 knots, and 1 m/s = 3.6 km/h.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toMs`, `fromMs`, `convert`, `all`) are covered by headless tests: exact base factors, the 100 km/h vector set, 60 mph = 96.56064 km/h, 1 knot = 1.852 km/h, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
