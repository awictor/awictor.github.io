# Loan-to-Value (LTV) Calculator

Calculate your mortgage **loan-to-value ratio**, **combined LTV** with a second loan, whether **PMI** applies, and how much principal to **pay down to reach 80%** (and cancel PMI). One offline HTML file, no signup, no tracking.

👉 **[Open LTV Calculator](https://awictor.github.io/ltv-calc/)**

## The metric
LTV = loan balance ÷ property value. PMI is generally required above 80% LTV on conventional mortgages and can be removed once you drop below it. CLTV adds a second mortgage/HELOC.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ltv`, `cltv`, `equityPercent`, `pmiRequired`, `payDownToReach`) are covered by headless tests — the LTV formula, combined LTV, equity, the PMI threshold (default and custom), the pay-down calculation and its zero case, monotonicity, and validation. CI runs them on every push.

## Not financial advice
A simplified model; PMI rules vary by loan type and lender.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
