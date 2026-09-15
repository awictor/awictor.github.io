# CardCheck

**Credit card brand detector & Luhn validator** — paste a card number and see its brand (Visa, Mastercard, Amex, Discover, Diners, JCB, UnionPay), whether it passes the Luhn checksum, and it formatted and masked. Entirely in your browser. One offline HTML file, no signup, no tracking.

👉 **[Open CardCheck](https://awictor.github.io/card-check/)**

> ⚠️ **Local & for testing.** This checks format and the Luhn checksum only — it can't tell if a card is real, active, or funded. Nothing is transmitted; don't use it for anti-fraud.

## Features
- Brand detection from the issuer prefix (IIN), including the 2-series Mastercard range
- Luhn (mod-10) checksum validation; ignores spaces and dashes
- Brand-aware formatting (Amex 4-6-5) and last-4 masking; shows the IIN
- Dark mode; remembers your input; 100% client-side

## Why
When you're building or testing a checkout, you constantly need to know "is this a valid-looking Visa?" CardCheck answers instantly and privately, with the canonical test numbers in mind. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`luhnValid`, `cardBrand`, `formatCard`, `maskCard`, `analyze`) are covered by headless tests using canonical test PANs for every brand, tampered-number rejection, and Amex vs Diners/JCB disambiguation; CI runs them on every push.

## License
MIT © Alex Wictor
