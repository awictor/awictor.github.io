# InflationCalc

**Inflation & purchasing power calculator** — see what an amount will cost in the future at a given inflation rate, and what a future amount is worth in today's money. One offline HTML file, no signup, no tracking.

👉 **[Open InflationCalc](https://awictor.github.io/inflation-calc/)**

## Features
- Future cost of today's money (compounded annually)
- Today's purchasing power of a future amount
- Any rate and horizon
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Inflation quietly changes what money is worth. InflationCalc makes it concrete in both directions — how much more you'll need later, and how much a future sum is really worth now. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`futureValue`, `purchasingPower`) are covered by headless regression tests, including that they invert each other; CI runs them on every push.

## License
MIT © Alex Wictor
