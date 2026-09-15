# Capital Gains Calculator

**Estimate the capital gain, return, and tax on a stock sale.** Enter buy/sell prices, shares, and holding period to get the realized gain or loss, return %, short vs long-term classification, and estimated tax. One offline HTML file, no signup, no tracking.

👉 **[Open Capital Gains](https://awictor.github.io/capital-gains/)**

## Features
- Gain/loss and return % from buy/sell/shares
- Short vs long-term (held over one year = 366+ days) with your rates
- Estimated tax (no tax on losses) and net after tax
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`capitalGain`, `gainPercent`, `isLongTerm`, `capitalGainsTax`, `netAfterTax`) are covered by headless tests — gain/loss math, return %, the 365-day threshold, tax on gains, no tax on losses, net after tax, share scaling, and validation. CI runs them on every push.

## Not tax advice
Estimates only; state taxes and other surtaxes may apply. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
