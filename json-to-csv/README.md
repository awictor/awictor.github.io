# JsonToCsv

**JSON → CSV converter** — turn an array of objects into CSV with union headers and RFC 4180 quoting. Choose comma, semicolon, or tab. One offline HTML file, no signup, no tracking.

👉 **[Open JsonToCsv](https://awictor.github.io/json-to-csv/)**

## Features
- Union of all keys as headers (first-seen order); missing keys become empty
- RFC 4180 quoting/escaping (quotes fields with delimiters, quotes, or newlines)
- Nested objects/arrays serialized as JSON in the cell
- Comma / semicolon / tab delimiter
- Dark mode; one-click copy; remembers input
- 100% client-side; works offline

## Why
The companion to a CSV→JSON tool: export API responses or config arrays to a spreadsheet-ready CSV, locally, with correct escaping. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`escapeField`, `collectHeaders`, `toCsv`, `jsonToCsv`) are covered by headless regression tests: quoting rules, union headers, missing keys, nested objects, custom delimiters, and invalid-JSON handling; CI runs them on every push.

## License
MIT © Alex Wictor
