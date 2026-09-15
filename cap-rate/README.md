# Cap Rate Calculator

Calculate a rental property's **net operating income, cap rate, cash-on-cash return** and **gross rent multiplier** — the core numbers real-estate investors screen deals with. One offline HTML file, no signup, no tracking.

👉 **[Open Cap Rate Calculator](https://awictor.github.io/cap-rate/)**

## The metrics
NOI = rent − operating expenses (before mortgage). Cap rate = NOI ÷ price (unleveraged yield). Cash-on-cash = (NOI − debt service) ÷ cash invested (leveraged return). GRM = price ÷ gross rent.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`noi`, `capRate`, `grossRentMultiplier`, `cashOnCash`) are covered by headless tests — the NOI, cap-rate, GRM and cash-on-cash formulas, monotonicity, negative-NOI and negative-cash-flow cases, an end-to-end example, and validation. CI runs them on every push.

## Not financial advice
A simplified model; verify with a full pro forma.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
