# Credit Card Validator

Check a card number with the **Luhn algorithm** and detect its **brand** (Visa, Mastercard — including the 2221–2720 2-series — American Express, Discover, Diners Club, JCB) from the leading digits, plus a per-brand length check. **Nothing is transmitted** — it all runs in your browser. One offline HTML file, no signup, no tracking.

👉 **[Open Credit Card Validator](https://awictor.github.io/credit-card/)**

## Note
A passing Luhn check only means the number is well-formed — it does not mean the card exists or has funds. The built-in examples are the industry **test numbers** (safe, non-real).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cleanNumber`, `luhnValid`, `detectBrand`, `validate`) are covered by headless tests against the standard test numbers for every brand, the 2-series Mastercard range, tampered/invalid numbers, the canonical Luhn example (79927398713), and combined validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
