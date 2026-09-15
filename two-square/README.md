# Two-Square Cipher

Encrypt and decrypt with the **Two-square cipher** (a "double Playfair") — two keyword-mixed 5×5 squares and a single **self-reciprocal** column-swap operation, so the same step both enciphers and deciphers. One offline HTML file, no signup, no tracking.

👉 **[Open Two-Square Cipher](https://awictor.github.io/two-square/)**

## How it works
Stack two keyword squares vertically. For each pair, find the first in the top square and second in the bottom, then swap their columns. A column swap is its own inverse, so running the ciphertext through again restores the plaintext. I/J share a cell; odd text is padded with X.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `clean`, `posIn`, `at`, `twoSquare`) are covered by headless tests — square building, coordinate round-trips, normalization, the different-column swap and same-column no-op, the self-reciprocal property, round-trips with several keys, X padding, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
