# PercentCalc

**Percentage calculator** — every everyday percentage in one place: X% of a number, "X is what percent of Y", percentage change, and adding or subtracting a percent. One offline HTML file, no signup, no tracking.

👉 **[Open PercentCalc](https://awictor.github.io/percent-calc/)**

## Features
- What is X% of Y
- X is what percent of Y
- Percentage change from A to B (increase / decrease)
- Add or subtract a percent (markup / discount)
- Live results; safe divide-by-zero handling
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Percentages come up constantly — tips, discounts, growth, tax — and most calculators only do one form. PercentCalc puts the common four on one screen. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`percentOf`, `whatPercent`, `percentChange`, `addPercent`, `subPercent`) are covered by headless regression tests including zero-guards; CI runs them on every push.

## License
MIT © Alex Wictor
