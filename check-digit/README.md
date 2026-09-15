# CheckDigit

**Barcode & ISBN check-digit validator** — verify or compute the check digit for EAN-13, UPC-A, ISBN-13, and ISBN-10 codes. Paste a full code to validate it, or the leading digits to compute the check digit. One offline HTML file, no signup, no tracking.

👉 **[Open CheckDigit](https://awictor.github.io/check-digit/)**

## Features
- EAN-13, UPC-A, ISBN-13, and ISBN-10 (including the `X` check digit)
- Auto-detects the format by length; validates or computes as appropriate
- Shows the expected check digit vs. what you entered
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Anyone working with product catalogs, inventory, or publishing metadata hits malformed barcodes and ISBNs constantly. CheckDigit confirms them (or fills in the missing digit) instantly and offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ean13CheckDigit`, `upcaCheckDigit`, `isbn13CheckDigit`, `isbn10CheckChar`, and their validators) are covered by headless regression tests against real barcodes (5901234123457, 036000291452, 9780306406157, 0306406152, ...X); CI runs them on every push.

## License
MIT © Alex Wictor
