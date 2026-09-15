# Nihilist Cipher

**Encode and decode with the Nihilist cipher** — a Polybius square combined with a numeric key. Each letter becomes its square coordinates (A=11 … Z=55), and the key's coordinates are added, so ciphertext is a list of numbers. One offline HTML file, no signup, no tracking.

👉 **[Open Nihilist Cipher](https://awictor.github.io/nihilist/)**

## How it works
Place letters on a 5×5 Polybius square (I/J share a cell) → row-then-column number. Convert the key the same way and **add** it to the plaintext coordinates (cycling over the key). Decoding subtracts. An optional square keyword scrambles the grid.

## Features
- Encode / decode with a numeric-addition key
- Optional keyed square; I/J merge; key cycling
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `coord`, `letterAt`, `encrypt`, `decrypt`) are covered by headless tests — the default square, coordinates, a hand-computed `HELLO`/`KEY` → `48 30 85 56 49` vector, round trips, I/J merge, key cycling, keyed-square, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
