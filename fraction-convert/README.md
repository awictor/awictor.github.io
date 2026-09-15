# FractionConvert

**Decimal ↔ fraction converter** — turn a decimal into the nearest simplified fraction (at your chosen denominator) and turn a fraction into a decimal. Understands mixed numbers like `1 1/2`. One offline HTML file, no signup, no tracking.

👉 **[Open FractionConvert](https://awictor.github.io/fraction-convert/)**

## Features
- Decimal → fraction, rounded to 1/8, 1/16, 1/32, 1/64, or 1/100 and simplified
- Fraction → decimal, accepting `3/4`, `1 1/2`, or plain numbers
- Live and both directions
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Cooking, woodworking, and machining constantly move between decimals and fractions. FractionConvert does both, simplified, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gcd`, `decimalToFraction`, `fractionToDecimal`, `parseFraction`) are covered by headless regression tests including round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
