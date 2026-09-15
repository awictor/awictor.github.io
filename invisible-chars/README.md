# Invisible Characters

**Find & remove hidden Unicode in your text.** Paste anything and instantly see zero-width spaces, non-breaking and exotic spaces, BOMs, soft hyphens, and bidirectional control marks — the invisible gremlins that break search, code, CSVs, and passwords, and that AI text generators love to sprinkle in. One offline HTML file, no signup, no tracking.

👉 **[Open Invisible Characters](https://awictor.github.io/invisible-chars/)**

## Why
Copy-pasted text (and AI output) often carries hidden characters that look fine but corrupt diffs, break `===` string comparisons, defeat search, or smuggle right-to-left overrides. This tool surfaces them with exact positions and one-click cleaning.

## Features
- Detects U+200B–200D, U+2060, U+FEFF, U+00AD, U+00A0, U+2000–200A, U+202F, U+205F, U+3000, U+200E–200F, U+202A–202E, U+2066–2069, and replacement chars
- Inline visualization showing each hidden character in place
- Findings table with index, code point, name, and category
- Clean removes zero-width/directional marks and normalizes exotic spaces to a regular space
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`scan`, `clean`, `summarize`, `toHex`) are covered by headless tests — detection index/category, zero-width and BOM stripping, exotic-space normalization, directional-mark removal, category counts, idempotent cleaning, and code-point formatting. CI runs them on every push.

## License
MIT © Alex Wictor
