# JsonToYaml

**Convert JSON to YAML** — paste JSON and get clean, block-style YAML with correct indentation, quoting, and nesting. One offline HTML file, no signup, no tracking.

👉 **[Open JsonToYaml](https://awictor.github.io/json-to-yaml/)**

## Features
- Block-style YAML with two-space indentation
- Smart quoting — strings that look like numbers/booleans/`null`, or contain YAML specials (`:`, `#`, leading `-`, …), are quoted so they stay strings
- Correct handling of nested objects, arrays, arrays-of-objects, and empty containers
- Copy button, dark mode, remembers your input
- 100% client-side; works offline

## Why
`package.json` → a CI YAML, an API sample → an OpenAPI snippet, config translation — JSON-to-YAML is a constant chore, and quoting mistakes silently change types (`8080` vs `"8080"`). JsonToYaml gets the quoting right, locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toYAML`, `scalarToYAML`, `needsQuote`, `keyToYAML`, `jsonToYAML`) are covered by headless tests, including nesting, arrays of objects, empty containers, and ambiguous-string quoting; CI runs them on every push.

## License
MIT © Alex Wictor
