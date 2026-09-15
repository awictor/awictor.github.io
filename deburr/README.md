# Deburr

**Remove accents & fold to ASCII** — strip diacritics from text (café → cafe, Zürich → Zurich) and, in full-fold mode, map special letters too (Straße → Strasse, Æther → AEther, Øystein → Oystein). One offline HTML file, no signup, no tracking.

👉 **[Open Deburr](https://awictor.github.io/deburr/)**

## Features
- **Diacritics only** — Unicode NFD then strip combining marks
- **Full ASCII fold** — also maps ß, æ/œ, ø, ł, đ, þ, ð and their capitals
- Preserves punctuation, digits, and spacing
- Copy-ready output; dark mode; 100% client-side

## Why
Slugs, filenames, search keys, and legacy systems often need plain ASCII. Deburr folds accented and special-letter text down to ASCII correctly, offline. Pairs with [Slugify](https://awictor.github.io/slugify/) in the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`removeDiacritics`, `toAscii`) are covered by headless tests — accent stripping, plain-ASCII passthrough, ß/ligature/slashed-letter folding, combined accents, punctuation preservation, and coercion. CI runs them on every push.

## License
MIT © Alex Wictor
