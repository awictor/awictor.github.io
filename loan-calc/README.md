# LoanCalc

**Loan & amortization calculator** — monthly payment, total interest, payoff, and a balance-over-time chart. One offline HTML file, no signup, no tracking.

👉 **[Open LoanCalc](https://awictor.github.io/loan-calc/)**

## Features
- Monthly payment for any principal, rate, and term (years or months)
- Total paid, total interest, and interest-as-% of total
- Amortization balance chart (SVG)
- Shareable link — the whole scenario travels in the URL
- Dark mode, remembers your last inputs
- 100% client-side; works offline

## Why
Mortgage, auto, or personal loan — see the real monthly payment and how much of it is interest before you sign. A companion to [Payoff](https://awictor.github.io/payoff/) (multi-debt snowball/avalanche) in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`loan`, `encodeState`, `decodeState`) are covered by headless regression tests; CI runs them on every push.

## License
MIT © Alex Wictor
