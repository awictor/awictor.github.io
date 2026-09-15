# JsonToGo

**JSON → Go struct generator** — paste a JSON object and get a typed Go `struct` with `json:` tags and nested structs, ready to drop into your code. One offline HTML file, no signup, no tracking.

👉 **[Open JsonToGo](https://awictor.github.io/json-to-go/)**

## Features
- Infers Go types: `string`, `bool`, `int` vs `float64`, `[]T` from the first element, nested `struct`s, `interface{}` for null/empty
- Exported PascalCase field names with the original key kept in the `json:` tag
- Custom struct name; tab-indented, gofmt-friendly output
- Dark mode; 100% client-side

## Why
Hand-writing Go structs from an API response is tedious and error-prone. JsonToGo does it instantly and offline — no pasting your payloads into a website. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pascal`, `goType`, `jsonToGo`) are covered by headless tests — key casing, scalar/array/nested type inference, `json:` tag preservation, root-name handling, and invalid-JSON errors. CI runs them on every push.

## License
MIT © Alex Wictor
