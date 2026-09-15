# Force Converter

Convert force between **newtons, kilonewtons, kilogram-force, pound-force, ounce-force, and dynes** — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Force Converter](https://awictor.github.io/force-converter/)**

## Reference
1 kgf = 9.80665 N, 1 lbf ≈ 4.448 N, 1 N = 100,000 dyne, 16 ozf = 1 lbf. Converts through newtons.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toNewtons`, `fromNewtons`, `convert`, `all`) are covered by headless tests: kgf/lbf/dyne vectors, the kgf→lbf ≈ 2.205 ratio, 16 ozf = 1 lbf, kN scaling, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
