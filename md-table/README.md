# MdTable

**CSV / TSV to Markdown table generator** — paste CSV, TSV, or cells copied straight from a spreadsheet and get a clean, aligned GitHub-flavored Markdown table. One offline HTML file, no signup, no tracking.

👉 **[Open MdTable](https://awictor.github.io/md-table/)**

## Features
- Auto-detects the delimiter (tab wins over comma)
- Handles quoted CSV fields containing commas and escaped quotes
- Left / center / right column alignment (with proper `:---:` separators)
- Cells are padded so the raw Markdown lines up in a monospace editor
- Escapes `|` inside cells; pads ragged rows; optional header row
- One-click copy, dark mode, remembers your input
- 100% client-side; works offline

## Why
Hand-writing Markdown tables is tedious and error-prone. Paste your data, pick an alignment, copy the result. Perfect for READMEs, issues, and docs. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseDelimited`, `toMarkdownTable`, `csvToMarkdown`) are covered by headless regression tests, including quoted fields, tab detection, alignment separators, pipe escaping, and ragged rows; CI runs them on every push.

## License
MIT © Alex Wictor
