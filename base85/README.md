# Base85

**Ascii85 (base85) encoder / decoder** — encode and decode text with Ascii85, the compact encoding used in PDF and PostScript. Handles the `z` zero shorthand and optional Adobe `<~ ~>` delimiters. One offline HTML file, no signup, no tracking.

👉 **[Open Base85](https://awictor.github.io/base85/)**

## Features
- Encode and decode (btoa/Adobe flavour)
- `z` shorthand for four zero bytes; optional `<~ ~>` wrapping
- Decoder ignores whitespace and strips delimiters; UTF-8 safe
- Dark mode; 100% client-side

## Why
Ascii85 packs 4 bytes into 5 printable characters (85⁵ > 2³²), making it ~7% denser than Base64 — which is why PDF and PostScript use it. Base85 converts both ways offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encode`, `decode`) are covered by headless tests — the classic `"Man " → 9jqo^` vector, round-trips across lengths, the `z` shorthand (standalone and embedded), partial-group sizing, Adobe delimiters, whitespace tolerance, UTF-8, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
