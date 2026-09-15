# Extra Payment Calculator

See how a **fixed extra monthly payment** shortens any loan and how much interest it saves, versus the standard schedule. One offline HTML file, no signup, no tracking.

👉 **[Open Extra Payment](https://awictor.github.io/extra-payment/)**

## Why it works
Every extra dollar goes straight at the principal, so it stops accruing interest for the rest of the loan. Early in a mortgage most of the payment is interest, so a modest monthly extra can cut years off the term.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `amortize`, `payoffComparison`) are covered by headless tests — the payment formula (incl. 0%), amortization reproducing the term, the 0% case, extra-payment shortening and interest savings, the zero-extra baseline, bigger-extra-sooner, the payment sum, and validation. CI runs them on every push.

## Not financial advice
A simplified fixed-rate model.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
