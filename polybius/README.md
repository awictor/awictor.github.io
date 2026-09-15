# Polybius Square Cipher

**Encode and decode with the Polybius square.** Each letter becomes its row/column coordinates on a 5×5 grid (I and J share a cell), so A = 11, H = 23, Z = 55. Add a keyword to scramble the grid. One offline HTML file, no signup, no tracking. Great for puzzles, escape rooms, and CTFs.

👉 **[Open Polybius Square](https://awictor.github.io/polybius/)**

## Features
- Encode / decode with a live 5×5 grid
- Optional keyword fills the grid first (then the rest of the alphabet)
- I/J share a cell; non-letters ignored; grouped or ungrouped digits both decode
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`buildSquare`, `encode`, `decode`) are covered by headless tests — the default A–Z grid, standard coordinates (A=11 … Z=55), the canonical `HELLO` → `2315313134`, I/J sharing, keyword scrambling, and round trips. CI runs them on every push.

## License
MIT © Alex Wictor
