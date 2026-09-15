# RomanNumeral

**Roman numeral converter** — turn numbers (1–3999) into Roman numerals and back, with canonical-form validation (so `IIII` and `IL` are correctly rejected). One offline HTML file, no signup, no tracking.

👉 **[Open RomanNumeral](https://awictor.github.io/roman-numeral/)**

## Features
- Number → Roman and Roman → number, both live
- Validates standard/canonical form; case-insensitive input
- Range 1–3999
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Dates, chapters, and clock faces still use Roman numerals — this converts either way instantly, and tells you when a numeral isn't written correctly. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toRoman`, `fromRoman`) are covered by headless regression tests, including canonical-form rejection and full round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
