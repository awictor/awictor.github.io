# Emergency Fund Calculator

**How long would your savings last?** Enter your savings and monthly expenses to see months of coverage, set a target (e.g. 6 months), and find how long it takes to close the gap at your monthly saving rate. One offline HTML file, no signup, no tracking.

👉 **[Open Emergency Fund](https://awictor.github.io/emergency-fund/)**

## Features
- Months covered = savings ÷ monthly expenses
- Target fund and remaining gap for N months
- Time-to-target at your monthly saving rate
- Status tiers (Critical / Starter / Solid / Well-funded)
- Dark mode; 100% client-side

## Rule of thumb
3–6 months of essential expenses; more if income is variable or single-earner. Keep it liquid.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthsCovered`, `targetFund`, `gap`, `monthlyToReach`, `fundStatus`) are covered by headless tests — the core ratios, gap flooring, time-to-target, status tiers and boundaries, monotonicity, and validation. CI runs them on every push.

## Not financial advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
