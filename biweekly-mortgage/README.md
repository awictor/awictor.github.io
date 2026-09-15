# Biweekly Mortgage Calculator

See how paying your mortgage **biweekly** — half your monthly payment every two weeks — shortens the loan and cuts total interest versus paying monthly. One offline HTML file, no signup, no tracking.

👉 **[Open Biweekly Mortgage](https://awictor.github.io/biweekly-mortgage/)**

## Why it works
52 weeks ÷ 2 = **26 half-payments = 13 full payments** a year — one extra payment straight at principal. Over 30 years that typically saves several years and tens of thousands in interest.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `amortizePeriods`, `biweeklyPlan`) are covered by headless tests — the payment formula (incl. 0%), amortization reproducing the loan term, the 0% case, faster biweekly payoff, interest saved, the half-payment relationship, months-saved consistency, loan-size scaling, and validation. CI runs them on every push.

## Not financial advice
Confirm your lender applies biweekly payments to principal without a fee.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
