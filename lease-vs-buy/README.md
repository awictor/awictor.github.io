# Lease vs Buy Calculator (Auto)

Compare the true cost of **leasing a car versus buying/financing** over the same period — down payments, interest, disposition fee and resale value all in. One offline HTML file, no signup, no tracking.

👉 **[Open Lease vs Buy](https://awictor.github.io/lease-vs-buy/)**

## The comparison
**Lease** = drive-off + monthly payments + disposition fee (own nothing). **Buy** = down + payments made + remaining loan balance − resale value (keep the equity). Lower net cost wins.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `remainingBalance`, `leaseTotal`, `buyNetCost`, `compareLeaseBuy`) are covered by headless tests — the payment formula, balance at 0/term, the lease sum, resale subtraction, comparison consistency, resale and lease-payment monotonicity, the past-loan-term case, and validation. CI runs them on every push.

## Not financial advice
Ignores taxes, insurance, maintenance and time value of money.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
