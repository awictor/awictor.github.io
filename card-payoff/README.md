# Card Payoff

See the **true cost of paying only the minimum** on a credit card — how many years it takes and how much interest it costs — then compare against a fixed higher payment and watch the savings. One offline HTML file, no signup, no tracking.

👉 **[Open Card Payoff](https://awictor.github.io/card-payoff/)**

## How the minimum works
Most issuers set the minimum as **a small percent of the balance plus that month's interest**, with a dollar floor (often $25–$35). Because the payment shrinks as the balance falls, minimum-only payoff drags on for years. This tool simulates each month for both plans.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyRate`, `minPaymentFor`, `amortizeMinimum`, `amortizeFixed`) are covered by headless tests — the monthly-rate conversion, the floor-vs-percent minimum rule, a never-overpay cap, a worked fixed-payment amortization, the "payment can't cover interest" guard, minimum-payoff termination, the minimum-costs-more property, and validation. CI runs them on every push.

## Not financial advice
Estimates assume a fixed APR and no new charges; your issuer's exact rule may differ.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
