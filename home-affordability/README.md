# Home Affordability Calculator

**How much house can you afford?** From gross income, a debt-to-income limit, other monthly debts, mortgage rate, term, and down payment, this estimates your maximum monthly payment, loan amount, and home price. One offline HTML file, no signup, no tracking.

👉 **[Open Home Affordability](https://awictor.github.io/home-affordability/)**

## How it works
`max payment = income × DTI − other debts`; the max loan is the principal whose amortized payment equals that (reverse of the standard payment formula); the price adds your down payment.

## Note
Principal + interest only — **property tax, insurance, HOA, and PMI are not included**, so your real budget is lower. A starting estimate, not a pre-approval.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `maxLoan`, `maxMonthlyPayment`, `affordability`) are covered by headless tests — the DTI payment formula, payment floor, loan↔payment inverse, zero-rate case, composition, monotonicity in income/rate/debt, down-payment addition, and validation. CI runs them on every push.

## Not financial advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
