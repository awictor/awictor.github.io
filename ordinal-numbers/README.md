# Ordinal Numbers

Convert numbers to **ordinals** (1 → 1st, 22 → 22nd, 113 → 113th) with correct English suffix rules, and parse ordinals back to numbers. One offline HTML file, no signup, no tracking.

👉 **[Open Ordinal Numbers](https://awictor.github.io/ordinal-numbers/)**

## The rule
Suffix keys off the last digit (1→st, 2→nd, 3→rd, else th) — except numbers ending in 11, 12, or 13, which always take **th** (11th, 113th).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ordinalSuffix`, `ordinal`, `parseOrdinal`, `isOrdinal`) are covered by headless tests: single digits, the teen exception, the 21/22/23 reset, hundreds ending in teens, parse round-trip for 0–1000, wrong-suffix rejection, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
