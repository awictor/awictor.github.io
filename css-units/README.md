# CSS Units Converter

**Convert between CSS absolute length units** — pixels, points, picas, inches, centimetres, and millimetres. Enter a value and unit; see all the others at once. One offline HTML file, no signup, no tracking.

👉 **[Open CSS Units Converter](https://awictor.github.io/css-units/)**

## The ratios
CSS fixes absolute units to **96px = 1in**: 1in = 72pt = 6pc = 2.54cm = 25.4mm. So 12pt = 16px and 1pc = 16px. Unlike `rem`/`em`, these don't depend on font size.

## Features
- px ↔ pt ↔ pc ↔ in ↔ cm ↔ mm, all shown live
- Tap any value to copy (with its unit)
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toPx`, `convert`) are covered by headless tests — the inch equalities, 12pt=16px, pica relations, cm↔mm, identity, round-trips, linear scaling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
