# Bifid Cipher

Encrypt and decrypt with the **Bifid cipher** — Félix Delastelle's classic that fractionates each letter's row and column through a 5×5 Polybius square, then re-reads the coordinate stream in pairs. Supports an optional keyword square and a period. One offline HTML file, no signup, no tracking.

👉 **[Open Bifid Cipher](https://awictor.github.io/bifid/)**

## How it works
Each letter becomes a (row, column) pair. All rows are listed, then all columns (the "fractionation"); that combined stream is read back two-at-a-time into new letters — spreading each plaintext letter across the output. I and J share a cell. A period splits the message into independent blocks.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `charToRC`, `rcToChar`, `cleanText`, `bifidEncrypt`, `bifidDecrypt`) are covered by headless tests — square building with keywords and J-folding, coordinate round-trips over all 25 cells, text normalization, a hand-computed vector (`HI`→`GO`), single-letter fixed points, and full encrypt/decrypt round-trips with keyword and period. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
