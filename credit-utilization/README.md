# CreditUtilization

**Credit card utilization calculator** — enter your cards' balances and limits to get per-card and overall utilization, see where you land against the 30%/10% guidelines, and how much to pay down to hit a target ratio. One offline HTML file, no signup, no tracking.

👉 **[Open CreditUtilization](https://awictor.github.io/credit-utilization/)**

## Features
- Per-card and overall utilization (balance ÷ limit)
- Category with a color gauge: Excellent < 10%, Good < 30%, Fair, High, Very high
- **Paydown-to-target**: the exact amount to pay to reach a target utilization
- Add/remove cards; dark mode; 100% client-side

## Why
Utilization is one of the biggest factors in a credit score, and it's the balances-to-limits ratio — not how much you owe in dollars. CreditUtilization shows the ratio and the paydown needed to improve it, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not financial advice
Scoring models vary; this computes utilization only. Use it to plan paydowns, not as a score guarantee.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`utilization`, `overallUtilization`, `category`, `paydownToTarget`) are covered by headless tests — ratio math, over-limit, aggregation, category bands and boundaries, exact paydown (and never-negative), and validation. CI runs them on every push.

## License
MIT © Alex Wictor
