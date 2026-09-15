# Remove Diacritics

Strip accents and diacritics from text down to the closest plain **ASCII** — `café → cafe`, `Zürich → Zurich`, `piñata → pinata` — including letters that don't decompose, like `ø → o`, `ß → ss`, and `æ → ae`. Handy for URL slugs, sortable keys, and accent-insensitive search. One offline HTML file, no signup, no tracking.

👉 **[Open Remove Diacritics](https://awictor.github.io/remove-diacritics/)**

## How it works
Unicode **NFD** decomposition splits each letter from its combining accent, which is then dropped; a small map covers letters without a decomposition.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`removeDiacritics`, `hasDiacritics`, `SPECIAL`) are covered by headless tests: accented words and phrases, tildes/cedillas, the special-letter map (ø/ß/æ/þ), ASCII passthrough, whitespace preservation, uppercase folding, detection, idempotency, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
