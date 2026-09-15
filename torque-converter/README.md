# Torque Converter

Convert torque between **newton-metres, kilonewton-metres, kilogram-force metres, pound-force feet, pound-force inches, and ounce-force inches** — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Torque Converter](https://awictor.github.io/torque-converter/)**

## Reference
1 lbf·ft ≈ 1.356 N·m, 1 kgf·m = 9.80665 N·m, 1 lbf·ft = 12 lbf·in, 1 lbf·in = 16 ozf·in. Converts through newton-metres.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toNm`, `fromNm`, `convert`, `all`) are covered by headless tests: lbf·ft/kgf·m vectors, the 12 lbf·in and 16 ozf·in identities, kN·m scaling, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
