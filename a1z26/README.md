# A1Z26 Cipher

A single-file, offline **A1Z26** encoder/decoder — the classic puzzle cipher where A=1, B=2, … Z=26. Encode text to numbers and decode it back, with a customizable separator.

**Live:** https://awictor.github.io/a1z26/

## Features

- **Text → Numbers** and **Numbers → Text**
- Word breaks preserved (space); letters joined by your chosen separator
- Decoder tolerates any non-digit separator (`-`, `.`, `,`, spaces)
- Case-insensitive; punctuation dropped
- Dark mode, 100% offline, zero dependencies

## Example

`HELLO WORLD` → `8-5-12-12-15 23-15-18-12-4`

## Tests

```
node tests/selftest.mjs
```

10 checks including full round-trips, custom separators, and letter↔number inversion. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
