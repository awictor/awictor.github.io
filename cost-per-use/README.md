# CostPerUse

**Cost-per-use calculator** — work out the true cost per use (or per wear) of a purchase, factor in resale value, and compare a cheap item against a durable one. One offline HTML file, no signup, no tracking.

👉 **[Open CostPerUse](https://awictor.github.io/cost-per-use/)**

## Features
- Cost per use = (price − resale) ÷ expected uses
- Side-by-side comparison of two options with a clear winner
- Over-time helper (uses/year × years) for the math
- Dark mode; 100% client-side

## Why
A $200 jacket you wear 400 times (50¢/wear) beats a $40 one you wear 20 times ($2/wear). CostPerUse turns "is it worth it?" into a number and settles the buy-it-for-life debate, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`costPerUse`, `costPerUseOverTime`, `cheaperPerUse`) are covered by headless tests — the base formula, resale, over-time, monotonicity, the comparison winner (with resale and ties), durable-beats-cheap, negative net cost, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
