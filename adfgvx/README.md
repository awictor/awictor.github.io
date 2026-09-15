# ADFGVX Cipher

Encrypt and decrypt with the **ADFGVX cipher** — the WWI/WWII German field cipher that fractionates each character through a keyword-mixed **6×6 Polybius square** (26 letters + 10 digits, rows/columns labelled A D F G V X) and then scrambles the result with a **columnar transposition**. One offline HTML file, no signup, no tracking.

👉 **[Open ADFGVX Cipher](https://awictor.github.io/adfgvx/)**

## How it works
Substitution then transposition: each letter/digit becomes a pair of ADFGVX labels, then that doubled string is written under a transposition keyword and read out column-by-column in alphabetical order.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `charToPair`, `pairToChar`, `fractionate`, `columnarEncrypt/Decrypt`, `adfgvxEncrypt/Decrypt`) are covered by headless tests — square building, label pairs, coordinate round-trips over all 36 cells, fractionation length, columnar round-trips (incl. ragged), full ADFGVX round-trips with digits, ciphertext alphabet, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
