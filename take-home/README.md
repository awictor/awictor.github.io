# Take-Home Pay Calculator

Estimate **take-home pay** from a gross salary — pre-tax deductions, your effective income-tax rate, and FICA (Social Security + Medicare) — shown per year, month or paycheck. One offline HTML file, no signup, no tracking.

👉 **[Open Take-Home Pay](https://awictor.github.io/take-home/)**

## How it's estimated
Take-home = gross − pre-tax deductions − income tax − FICA. FICA = 6.2% Social Security up to the wage base ($168,600 in 2024) + 1.45% Medicare on all wages. You supply your own effective income-tax rate, applied to pay after pre-tax deductions.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ficaTax`, `takeHome`, `perPeriod`) are covered by headless tests — the 7.65% FICA, the SS wage-base cap, a worked take-home example, pre-tax deduction effects, per-period division, tax-rate monotonicity, the zero-tax case, tax-on-post-deduction pay, FICA-on-gross, and validation. CI runs them on every push.

## Not tax advice
A simplified US estimate; use your pay stub for exact figures.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
