# PxRem

**px ↔ rem / em converter** — convert pixels to rem (and back) with an adjustable root font size, plus a quick-reference table of common values. One offline HTML file, no signup, no tracking.

👉 **[Open PxRem](https://awictor.github.io/px-rem/)**

## Features
- px → rem and rem → px, live and both directions
- Adjustable base (root font size); default 16px
- Reference table for common sizes (4–64px)
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Front-end work constantly converts between px and rem/em. PxRem keeps them in sync against your chosen base and gives you a handy lookup table. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pxToRem`, `remToPx`) are covered by headless regression tests, including custom bases and round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
