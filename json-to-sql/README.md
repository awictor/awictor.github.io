# JSON to SQL

Paste a JSON object or array of objects and get a **`CREATE TABLE`** statement with inferred column types, for **PostgreSQL, MySQL or SQLite**. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to SQL](https://awictor.github.io/json-to-sql/)**

## What it does
Scans every row and infers each column's type (integer, real, boolean, ISO timestamp, or text), marks a column nullable if any row omits it or has `null`, and widens conflicting types (int + float → real, anything mixed → text). Nested objects/arrays are stored as text. A column named `id` with integer values becomes the primary key.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`inferType`, `mergeTypes`, `inferColumns`, `sqlType`, `toDDL`) are covered by headless tests — scalar/date/nested type inference, type widening, null-as-unknown merges, column ordering, nullability from null or missing keys, per-dialect type maps, primary-key/quoting in the DDL, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
