# TaxCalc

**Sales tax & VAT calculator** — add tax to a net price, or reverse-calculate the net and tax hidden inside a gross total. Rate presets and both directions. One offline HTML file, no signup, no tracking.

👉 **[Open TaxCalc](https://awictor.github.io/tax-calc/)**

## Features
- Add tax: net → tax + gross
- Remove tax: gross → net + tax (reverse VAT)
- Rate presets (5, 7, 8.875, 10, 15, 20, 25%)
- Clear net / tax / gross breakdown
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Whether you're pricing with tax or backing tax out of a receipt total, TaxCalc does both instantly and locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`addTax`, `removeTax`) are covered by headless regression tests, including add/remove round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
