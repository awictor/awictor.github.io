# Dividend Calculator

**Calculate dividend yield and income.** Enter a share price, annual dividend per share, and shares held to get the yield, annual and per-payment income, monthly average, and yield on cost. One offline HTML file, no signup, no tracking.

👉 **[Open Dividend Calculator](https://awictor.github.io/dividend-calc/)**

## Features
- Dividend yield (dividend ÷ price)
- Annual income, per-payment (quarterly/monthly/etc.), and monthly average
- **Yield on cost** vs your original cost basis
- Dark mode; 100% client-side

## Notes
Yield on cost uses the price you paid, so it rises as a company grows its dividend even though current yield tracks the market price. Figures ignore taxes and assume a constant dividend.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dividendYield`, `annualIncome`, `yieldOnCost`, `dividendFromYield`, `perPayment`) are covered by headless tests — yield math, income scaling, yield-on-cost, inversion, per-payment splitting, and validation. CI runs them on every push.

## Not investment advice
Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
