# NumWords

**Number to words converter** — turn any number into English words, plus check-writing / currency format (dollars and cents). Handles integers up to the quadrillions, negatives, and decimals. One offline HTML file, no signup, no tracking.

👉 **[Open NumWords](https://awictor.github.io/num-words/)**

## Features
- Cardinal words: `1,234` → "one thousand two hundred thirty-four"
- Check / currency format: `1234.56` → "One thousand two hundred thirty-four dollars and 56/100"
- Negatives and decimals (read digit-by-digit after "point")
- Cent rounding for currency; commas and `$` tolerated on input
- One-click copy, dark mode, remembers your last input
- 100% client-side; works offline

## Why
Writing a check, filling a legal form, or spelling out an invoice total all need the same thing: a number in words, correct the first time. NumWords does it instantly and offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`threeDigitsToWords`, `integerToWords`, `numberToWords`, `currencyToWords`) are covered by headless regression tests, including scale boundaries, decimals, and cent rounding; CI runs them on every push.

## License
MIT © Alex Wictor
