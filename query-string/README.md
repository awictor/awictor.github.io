# QueryString

**URL query string builder & parser** — parse a query string into JSON (repeated keys become arrays) or build a query string from JSON, with correct percent-encoding. One offline HTML file, no signup, no tracking.

👉 **[Open QueryString](https://awictor.github.io/query-string/)**

## Features
- Query → JSON and JSON → Query, side by side
- Repeated keys (`a=1&a=2`) collapse to arrays; arrays expand back to repeated keys
- Decodes `%xx` and `+`; encodes reserved characters correctly
- Handles bare flags (`?flag`) and leading `?`/`#`
- Dark mode; one-click copy; per-mode memory
- 100% client-side; works offline

## Why
Reading and editing URL parameters by hand is error-prone once encoding and repeated keys enter the picture. QueryString round-trips them cleanly and locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseQuery`, `buildQuery`) are covered by headless regression tests: encoding/decoding, repeated-key arrays, bare flags, and `parseQuery(buildQuery(obj)) === obj` round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
