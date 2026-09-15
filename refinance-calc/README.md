# Refinance Calculator

**Should you refinance your mortgage?** Enter your current loan and the new terms to see the **break-even point** (months to recoup closing costs), your monthly payment savings, and the lifetime interest difference. One offline HTML file, no signup, no tracking.

👉 **[Open Refinance Calculator](https://awictor.github.io/refinance-calc/)**

## Features
- Break-even = closing costs ÷ monthly savings
- Current vs new monthly payment (principal + interest)
- Lifetime interest change including closing costs
- Option to roll closing costs into the new loan
- Plain-English verdict; dark mode; 100% client-side

## The math
Standard amortized payment `P·r / (1 − (1+r)^−n)` with r = monthly rate, n = months. Refinancing lowers the monthly payment when the new payment is smaller, but a longer term can still increase total interest — the tool flags both.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `refinance`) are covered by headless tests — the amortization reference (100k/6%/30y ≈ 599.55), zero-rate case, break-even formula, savings sign, roll-in behavior, and lifetime-interest accounting. CI runs them on every push.

## Not financial advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
