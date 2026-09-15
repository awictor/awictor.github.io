# DiscountCalc

**Discount & sale price calculator** — enter an original price and one or more discounts (they *stack*), and see the final price, the money saved, and the **effective single discount**. One offline HTML file, no signup, no tracking.

👉 **[Open DiscountCalc](https://awictor.github.io/discount-calc/)**

## Features
- Up to three stacked discounts (e.g. "20% off, then an extra 10%")
- Final price, total saved, and the real effective discount
- Shows the truth: 20% + 10% stacked = **28% off**, not 30%
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Store "extra % off" offers stack multiplicatively, not additively, and it's easy to overestimate the deal. DiscountCalc shows the actual price you'll pay. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`applyDiscount`, `applyStacked`, `effectivePct`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
