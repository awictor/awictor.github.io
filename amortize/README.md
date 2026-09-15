# Amortize

**Loan amortization schedule calculator** — enter a loan amount, interest rate, and term to get the monthly payment, total interest, total paid, and a full month-by-month principal/interest/balance table. One offline HTML file, no signup, no tracking.

👉 **[Open Amortize](https://awictor.github.io/amortize/)**

## Features
- Monthly payment, total interest, and total-paid summary
- Complete amortization table (payment / interest / principal / balance)
- Handles 0% loans; final payment adjusted so the balance lands at exactly zero
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Loan calculators show the payment; Amortize shows where every dollar goes over the life of the loan — how interest front-loads and principal catches up. Perfect for mortgages, auto loans, and payoff planning. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `schedule`) are covered by headless regression tests: standard payment values, 0% loans, zero final balance, principal summing to the loan amount, and decreasing interest; CI runs them on every push.

## License
MIT © Alex Wictor
