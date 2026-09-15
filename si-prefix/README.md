# SIPrefix

**Metric / SI prefix converter** — enter a value with a prefix (kilo, milli, micro…) and see it expressed in every SI prefix at once, plus its scientific-notation base value. One offline HTML file, no signup, no tracking.

👉 **[Open SIPrefix](https://awictor.github.io/si-prefix/)**

## Features
- Full prefix ladder from peta (10¹⁵) down to femto (10⁻¹⁵)
- Converts your input into every prefix simultaneously; current prefix highlighted
- Optional unit label (g, B, Hz…) shown with each row; base value in scientific notation
- Dark mode; 100% client-side

## Why
Datasheets and lab notes mix prefixes freely — "2500 mV = 2.5 V = 0.0025 kV". SIPrefix lays out the whole ladder instantly so you never miscount zeros, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`convertPrefix`, `toBase`, `allPrefixes`) are covered by headless tests — key conversions (kilo↔base, mega↔kilo, milli↔micro), identity, `toBase` scaling, the full prefix span, and round-trips through base. CI runs them on every push.

## License
MIT © Alex Wictor
