# Mortgage Points Calculator

See whether paying **discount points** to buy down your mortgage rate actually pays off — the monthly savings, upfront cost, **break-even months**, and net savings over the term. One offline HTML file, no signup, no tracking.

👉 **[Open Mortgage Points](https://awictor.github.io/mortgage-points/)**

## How it works
Each point costs 1% of the loan and lowers the rate. Divide the points cost by the monthly payment reduction to get the break-even — keep the loan past that and the points pay off; sell or refinance sooner and you lose.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`monthlyPayment`, `pointsCost`, `buydownAnalysis`) are covered by headless tests — the payment formula (incl. 0%), point cost, positive savings from a buydown, the break-even identity, the infinite-break-even case, the net-savings formula, bigger-cut-saves-more, more-points-longer-break-even, and validation. CI runs them on every push.

## Not financial advice
A simplified fixed-rate model.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
