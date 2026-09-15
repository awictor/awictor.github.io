# CSV to SQL

Paste CSV and get **SQL `INSERT` statements** — with a proper RFC-4180 parser and correct quoting of strings, numbers, booleans and NULLs. Great for seeding a database. One offline HTML file, no signup, no tracking.

👉 **[Open CSV to SQL](https://awictor.github.io/csv-to-sql/)**

## What it does
The first row is the header. Quoted fields may contain commas, doubled quotes (`""`) and newlines. Empty cells become `NULL`, plain numbers stay unquoted, `true`/`false` become booleans, everything else is single-quoted (apostrophes escaped as `''`). Choose one INSERT per row or a single multi-row INSERT.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseCSV`, `sqlValue`, `csvToSql`) are covered by headless tests — simple rows, quoted commas, `""` escapes, quoted newlines, typed literal formatting, apostrophe escaping, per-row and multi-row output, end-to-end quoting, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
