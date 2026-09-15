# Unicode

**Character inspector** — for any text, see each character's Unicode code point (`U+XXXX`), decimal value, UTF-8 bytes, UTF-16 code units, and HTML entity. One offline HTML file, no signup, no tracking.

👉 **[Open Unicode](https://awictor.github.io/unicode/)**

## Features
- Per-code-point table: char, `U+XXXX`, decimal, UTF-8 (hex), UTF-16, `&#…;`
- Correct handling of astral characters/emoji (one code point, surrogate pair)
- Counts code points vs UTF-16 length
- Dark mode; remembers your input
- 100% client-side; works offline

## Why
Debugging encoding issues, emoji, or "why is my string length wrong?" means knowing exactly how each character is represented. Unicode shows the bytes and units at a glance. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cpHex`, `toUtf8Bytes`, `toUtf16Units`, `inspectChar`, `codePoints`) are covered by headless tests across ASCII/BMP/astral ranges, including surrogate pairs and a cross-check that UTF-8 byte counts match `TextEncoder`; CI runs them on every push.

## License
MIT © Alex Wictor
