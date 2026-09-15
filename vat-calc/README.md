# VatCalc

**Add or extract sales tax / VAT / GST** — add tax to a net price, or back the tax out of a gross (tax-included) price, to get net, tax, and gross instantly. One offline HTML file, no signup, no tracking.

👉 **[Open VatCalc](https://awictor.github.io/vat-calc/)**

## Features
- **Add tax**: net price → tax added on top
- **Extract tax**: gross price → the net and the included tax portion (reverse VAT)
- Rate presets (5%, 7.5%, 8.875%, 10%, 20%) or any custom rate
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
Adding tax is easy; the reverse — "this receipt total includes tax, how much *was* the tax?" — trips people up. VatCalc does both directions correctly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`addTax`, `extractTax`, `num`) are covered by headless tests — add/extract math, add↔extract round-trips, zero rate/amount, and the `tax = gross − net` invariant; CI runs them on every push.

## License
MIT © Alex Wictor
