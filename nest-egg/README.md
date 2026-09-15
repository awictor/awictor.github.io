# NestEgg

**Savings & compound interest calculator** — future value, total contributed, and interest earned, with monthly contributions and a growth chart. One offline HTML file, no signup, no tracking.

👉 **[Open NestEgg](https://awictor.github.io/nest-egg/)**

## Features
- Future value from a starting amount + monthly contributions + annual return
- Splits the total into what you put in vs. compound interest earned
- Growth-over-time chart (SVG)
- Shareable link — the whole plan travels in the URL
- Dark mode, remembers your last inputs
- 100% client-side; works offline

## Why
See the power of compounding before you commit to a savings or investing plan — how much a monthly habit becomes over 10, 20, or 30 years. A companion to the money tools in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`grow`, `encodeState`, `decodeState`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
