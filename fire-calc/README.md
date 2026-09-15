# FireCalc

**Financial Independence / Retire Early calculator** — find your FIRE number from the safe-withdrawal rate, estimate how many years until you're financially independent, and see your savings rate. One offline HTML file, no signup, no tracking.

👉 **[Open FireCalc](https://awictor.github.io/fire-calc/)**

## Features
- **FIRE number** — annual spending ÷ withdrawal rate (the classic "4% rule", adjustable)
- **Years to FI** — solves the future-value-of-an-annuity for your current savings, contributions, and expected real return
- **Savings rate** — the single biggest lever on time-to-FI
- Progress bar toward your target; dark mode; 100% client-side

## Why
The FIRE math is simple but easy to get wrong, and most calculators phone home. FireCalc runs the numbers entirely in your browser so your finances stay private. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not financial advice
Estimates assume a constant real return and steady contributions — reality varies. Use it to build intuition, not to make decisions in isolation.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`fireNumber`, `savingsRate`, `yearsToFI`) are covered by headless tests — the 4% rule, the annuity solve (with and without contributions), the zero-return linear case, never-reachable → Infinity, monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
