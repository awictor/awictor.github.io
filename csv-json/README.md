# CSVJSON

**CSV ↔ JSON converter** — turn CSV into an array of JSON objects and back, with a proper RFC-4180 quoted-field parser (commas, quotes, and newlines inside fields all handled). One offline HTML file, no signup, no tracking; your data never leaves your device.

👉 **[Open CSVJSON](https://awictor.github.io/csv-json/)**

## Features
- CSV → JSON (header row becomes object keys)
- JSON → CSV (key union becomes the header; values quoted when needed)
- Correct handling of quoted fields, escaped `""`, and embedded newlines
- Clear parse-error messages, copy either side
- Dark mode, remembers both inputs
- 100% client-side; works offline

## Why
Moving data between spreadsheets and code is constant, and pasting it into an online converter leaks it. CSVJSON parses correctly (not just `split(",")`) and runs locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseCsv`, `csvToRecords`, `csvToJson`, `recordsToCsv`, `jsonToCsv`) are covered by headless regression tests including quoting and round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
