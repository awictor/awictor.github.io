# Vigenere

**Vigenère cipher encoder / decoder** — encode and decode text with the classic keyword-based Vigenère cipher. Preserves case and punctuation, skips non-letters, and round-trips exactly. One offline HTML file, no signup, no tracking.

👉 **[Open Vigenere](https://awictor.github.io/vigenere/)**

## Features
- Encode and decode with any alphabetic keyword
- Preserves upper/lowercase; leaves digits and punctuation untouched (they don't advance the key)
- "Use as input" to chain operations; one-click copy
- Dark mode; 100% client-side

## Why
The Vigenère cipher is a staple of puzzles, CTFs, and cryptography lessons. Vigenere runs it both ways in your browser, so you can experiment offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not secure
Vigenère is a historical cipher, broken since the 19th century. Use it for fun and learning, never to protect real secrets.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalizeKey`, `transform`, `encode`, `decode`) are covered by headless tests — the canonical `ATTACKATDAWN`/`LEMON` → `LXFOPVEFRNHR` vector, round-trips, case preservation, non-letter passthrough, mod-26 wrap-around, key repetition and normalization, and empty-key errors. CI runs them on every push.

## License
MIT © Alex Wictor
