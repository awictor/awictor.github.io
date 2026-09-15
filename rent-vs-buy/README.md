# Rent vs Buy Calculator

Compare the **true net cost of renting versus buying** a home over the years you plan to stay — mortgage, property tax, maintenance, insurance, appreciation, selling costs, and the opportunity cost of investing your down payment instead. One offline HTML file, no signup, no tracking.

👉 **[Open Rent vs Buy](https://awictor.github.io/rent-vs-buy/)**

## The model
**Buy** = upfront (down + closing) + mortgage payments + carrying costs − net sale proceeds (appreciated value − selling costs − remaining loan). **Rent** = total rent (growing yearly) + renters insurance − the investment growth on the equivalent down payment. Lower net cost wins.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`mortgagePayment`, `remainingBalance`, `futureValue`, `totalRentCost`, `compareRentVsBuy`) are covered by headless tests — the amortization payment (incl. 0% case), balance at 0/term and its decline, compounding, rent totals with and without growth, the composite comparison's consistency, the appreciation monotonicity, and validation. CI runs them on every push.

## Not financial advice
A simplified model with fixed rates; your situation and markets vary.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
