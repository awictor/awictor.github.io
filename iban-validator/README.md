# IbanCheck

**IBAN validator & formatter** — paste an International Bank Account Number and instantly check its mod-97 checksum and format, see the country and expected length, and get it grouped in fours. One offline HTML file, no signup, no tracking.

👉 **[Open IbanCheck](https://awictor.github.io/iban-validator/)**

## Features
- ISO 13616 validation — structure regex + the mod-97 checksum rule
- Country name and expected length for 20 common countries, with a length check
- Clean formatting in groups of four; shows check digits and BBAN
- Dark mode; remembers your input; **100% client-side — nothing is transmitted**

## Why
A mistyped IBAN can send money nowhere (or somewhere wrong). IbanCheck catches checksum and length errors before you submit a transfer — locally, without pasting bank details into a random website. Part of the [Toolkit](https://awictor.github.io/toolkit/).

> Validates the checksum and format only; it can't confirm the account exists.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isValidIban`, `mod97`, `ibanToCheckString`, `formatIban`, `ibanInfo`, `normalizeIban`) are covered by headless tests with canonical valid IBANs (GB/DE/FR/NL) and tampered/malformed rejections; CI runs them on every push.

## License
MIT © Alex Wictor
