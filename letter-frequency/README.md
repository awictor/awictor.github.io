# Letter Frequency Analyzer

**Analyze letter frequency in any text** — per-letter counts and percentages, charted against standard English frequencies. Useful for cryptanalysis (breaking substitution ciphers), typography (type specimens), and word games. One offline HTML file, no signup, no tracking.

👉 **[Open Letter Frequency](https://awictor.github.io/letter-frequency/)**

## Features
- Counts and percentages for all 26 letters
- Bar chart with the standard English-frequency baseline overlaid
- Sort by frequency or alphabetically; most-common letter callout
- Dark mode; 100% client-side

## Why
In a monoalphabetic substitution cipher, the most frequent ciphertext letter is often E or T. Comparing a text's distribution to the English baseline is the classic first step in frequency analysis — and it's handy for choosing typefaces or checking pangrams too.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`letterFrequency`, `mostCommon`) are covered by headless tests — counts/totals, percentages, case-insensitivity, non-letter handling, all-26 coverage, percentages summing to 100, empty text, most-common, and the English baseline. CI runs them on every push.

## License
MIT © Alex Wictor
