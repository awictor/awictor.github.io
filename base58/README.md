# Base58

**Bitcoin-style Base58 encoder / decoder** — convert text to and from Base58 using the Bitcoin alphabet (no `0`, `O`, `I`, `l`), with correct leading-zero handling. One offline HTML file, no signup, no tracking.

👉 **[Open Base58](https://awictor.github.io/base58/)**

## Features
- Encode text → Base58 and decode Base58 → text
- Bitcoin alphabet; leading zero bytes ↔ leading `1`s
- Full UTF-8; invalid characters flagged
- Dark mode; one-click copy; per-mode memory
- 100% client-side; works offline

## Why
Base58 avoids visually ambiguous characters, which is why it's used for Bitcoin addresses, IPFS CIDs, and short IDs. Base58 converts both ways instantly and offline, verified against the classic `"Hello World!" → 2NEpo7TZRRrLZSi2U` vector. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`base58Encode`, `base58Decode`, `encodeText`, `decodeText`) are covered by headless tests: the classic vector, empty input, leading-zero mapping, single bytes, round-trips (incl. unicode), and invalid-char handling; CI runs them on every push.

## License
MIT © Alex Wictor
