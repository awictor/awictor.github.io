# JSONFormat

**JSON formatter, validator & minifier** — beautify, validate, or minify JSON with clear error messages and structure stats, entirely in your browser. One offline HTML file, no signup, no tracking; your data never leaves your device.

👉 **[Open JSONFormat](https://awictor.github.io/json-format/)**

## Features
- Beautify with 2-space, 4-space, or tab indentation
- Minify to the smallest valid form
- Live validation with the parser's error message
- Structure stats: keys, arrays, strings, numbers, max depth, size
- Copy result or feed it back as input
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Reading or cleaning up JSON is a daily task, and pasting payloads into an online formatter leaks them. JSONFormat does it locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseJson`, `formatJson`, `minifyJson`, `jsonStats`) are covered by headless regression tests including round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
