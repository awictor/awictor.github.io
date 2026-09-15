# Four-Square Cipher

Encrypt and decrypt with the **Four-square cipher** — a digraph substitution using two keyword-mixed 5×5 squares. Because it enciphers letter pairs, it resists single-letter frequency analysis far better than a simple substitution. One offline HTML file, no signup, no tracking.

👉 **[Open Four-Square Cipher](https://awictor.github.io/four-square/)**

## How it works
Four grids form a 2×2 block: plain alphabet top-left and bottom-right, two keyword squares top-right and bottom-left. For each pair, find the first letter in the top-left grid and the second in the bottom-right, then read ciphertext from the top-right (row of first, column of second) and bottom-left (row of second, column of first). I/J share a cell; odd text is padded with X.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `clean`, `posIn`, `at`, `fourSquareEncrypt`, `fourSquareDecrypt`) are covered by headless tests — square building with keywords, coordinate round-trips, normalization, the empty-key digraph swap, the canonical `HE`→`FY` first digraph, full round-trips with several keys, X padding, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
