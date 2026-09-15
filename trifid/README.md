# Trifid Cipher

Encrypt and decrypt with the **Trifid cipher** — Félix Delastelle's three-dimensional fractionation over a 27-symbol **3×3×3 cube**, the 3-D sequel to [Bifid](https://awictor.github.io/bifid/). Supports an optional keyword and a period. One offline HTML file, no signup, no tracking.

👉 **[Open Trifid Cipher](https://awictor.github.io/trifid/)**

## How it works
Each of the 27 symbols (A–Z plus one extra) has a layer, row and column in the cube. Within each block (the period), all layers are listed, then all rows, then all columns; that stream is re-read in groups of three to form the ciphertext — spreading three coordinates across the block for strong diffusion.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `charToCoord`, `coordToChar`, `clean`, `trifidEncrypt`, `trifidDecrypt`) are covered by headless tests — cube building with keywords, coordinate round-trips over all 27 cells, normalization, a hand-computed vector (`HI`→`CX`), and full round-trips with keyword and periods. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
