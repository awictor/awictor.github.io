# JsonToTs

**JSON → TypeScript interface generator** — paste JSON and get clean TypeScript interfaces. Nested objects become named interfaces, arrays infer their element type, and invalid identifier keys are quoted. One offline HTML file, no signup, no tracking.

👉 **[Open JsonToTs](https://awictor.github.io/json-to-ts/)**

## Features
- Nested objects → separate named interfaces (root first)
- Arrays infer element types (`string[]`, `Item[]`, `any[]` for empties)
- Primitive/array roots emit a `type` alias
- Invalid identifier keys are safely quoted
- Custom root interface name; one-click copy; dark mode
- 100% client-side; works offline — your JSON never leaves the page

## Why
Turning an API response into typed models is a constant chore. JsonToTs does it instantly and offline, so you can paste real (possibly sensitive) payloads without sending them anywhere. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Notes
Types are inferred from the first array element and by key name, which covers the vast majority of real payloads. Interface names are derived from keys, so two differently-shaped objects sharing a key name will reuse the first interface.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pascal`, `singular`, `safeKey`, `jsonToTs`) are covered by headless regression tests: flat/nested objects, arrays, null, quoted keys, primitive roots, and invalid JSON. CI runs them on every push.

## License
MIT © Alex Wictor
