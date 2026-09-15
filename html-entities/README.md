# HTMLEntities

**HTML entity encoder / decoder** — escape text to HTML entities and decode named, numeric, and hex entities back to characters, live and both directions. One offline HTML file, no signup, no tracking.

👉 **[Open HTMLEntities](https://awictor.github.io/html-entities/)**

## Features
- Encode: escapes `&`, `<`, `>`, `"`, and `'`
- Decode: named (`&amp;`, `&copy;`, `&mdash;`…), numeric (`&#65;`), and hex (`&#x41;`) entities
- Full Unicode code points (e.g. `&#x1F600;` → 😀)
- Leaves unknown entities untouched; copy either side
- Dark mode, remembers your text
- 100% client-side; works offline

## Why
Escaping/unescaping HTML is constant in web work, and getting it wrong causes bugs or XSS. HTMLEntities does it correctly and locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encodeHtml`, `decodeHtml`) are covered by headless regression tests, including numeric/hex/unknown entities and round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
