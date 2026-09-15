# Soundex

**Phonetic name code & sound-alike matcher** — compute the American Soundex code for a word or name, and check whether two names sound alike. One offline HTML file, no signup, no tracking.

👉 **[Open Soundex](https://awictor.github.io/soundex/)**

## Features
- American Soundex (letter + 3 digits), with the correct H/W-merge and vowel-separator rules
- "Sound alike?" comparison of two names
- Case-insensitive; ignores apostrophes/punctuation
- Dark mode; 100% client-side

## Why
Soundex is the classic algorithm behind fuzzy name search and genealogy matching — Robert and Rupert both code to `R163`. Soundex computes it offline so you can build or debug phonetic matching. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`soundex`, `soundsAlike`) are covered by headless tests against the canonical vectors — Robert/Rupert `R163`, Rubin `R150`, Pfister `P236`, Tymczak `T522`, Honeyman `H555`, Ashcraft/Ashcroft `A261` — plus format, case-insensitivity, matching, and edge cases. CI runs them on every push.

## License
MIT © Alex Wictor
