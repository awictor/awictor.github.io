# Pressure Converter

Convert pressure between **pascals, kilopascals, megapascals, bar, atmospheres, psi, mmHg (Torr), and inHg** — every unit at once. One offline HTML file, no signup, no tracking.

👉 **[Open Pressure Converter](https://awictor.github.io/pressure-converter/)**

## Reference
1 atm = 101,325 Pa = 1.01325 bar = 760 mmHg ≈ 14.696 psi (atm and bar are exact by definition). Values convert through pascals so every unit stays consistent.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toPa`, `fromPa`, `convert`, `all`) are covered by headless tests: exact atm/bar factors, the 1 atm = 101.325 kPa = 760 mmHg ≈ 14.696 psi vectors, 1 bar ≈ 14.504 psi, identity, round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
