# Columnar Transposition Cipher

**Encrypt and decrypt with the keyword columnar transposition cipher.** The message is written into a grid under a keyword, and the columns are read out in the keyword's alphabetical order. One offline HTML file, no signup, no tracking. Great for puzzles and CTFs.

👉 **[Open Columnar Transposition](https://awictor.github.io/columnar/)**

## How it works
Write the plaintext row-by-row into columns headed by the keyword. Number the columns by the alphabetical rank of the keyword letters (ties left-to-right), then read the columns in that order. The grid is padded with **X** so every column is full. Decryption fills the columns back in the same order.

## Features
- Encrypt / decrypt with any keyword
- Alphabetical column ordering with left-to-right tie-breaking
- Letters-only, X-padded; dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`columnOrder`, `encrypt`, `decrypt`) are covered by headless tests — column ordering and tie-breaking, a hand-computed vector, the canonical `ZEBRAS` → `EVLNXACDTX…` example, round trips, single-column pass-through, and padding. CI runs them on every push.

## License
MIT © Alex Wictor
