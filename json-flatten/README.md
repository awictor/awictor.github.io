# JSON Flatten / Unflatten

Flatten nested JSON into single-level **dot-notation keys** — and expand it back. Ideal for i18n/translation files, feature-flag configs, environment maps, and making config diffs trivial. One offline HTML file, no signup, no tracking.

👉 **[Open JSON Flatten](https://awictor.github.io/json-flatten/)**

## What it does
`{"a":{"b":1}}` ⇄ `{"a.b":1}`. Arrays become indexed keys (`list.0`, `list.1`); numeric segments rebuild arrays on unflatten. Empty objects and arrays are preserved so a round-trip is lossless. Any delimiter.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`flatten`, `unflatten`) are covered by headless tests — object nesting, array indexing, deep/mixed structures, empty-container preservation, custom delimiters, array reconstruction, lossless round-trips (default and custom delimiter), and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
