# JSON to Rust

**Turn JSON into Rust structs** with `serde` derives — ready to paste into your project. camelCase keys become `snake_case` fields with `#[serde(rename)]`, nested objects become their own structs, and arrays/nulls map to `Vec<T>`/`Option<T>`. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to Rust](https://awictor.github.io/json-to-rust/)**

## Type mapping
- integer → `i64`, float → `f64`, `bool`, string → `String`
- array → `Vec<T>` (element type inferred; empty → `Vec<serde_json::Value>`)
- `null` → `Option<serde_json::Value>`
- nested object → a new `#[derive(Serialize, Deserialize, Debug)]` struct

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toSnake`, `toPascal`, `jsonToRust`) are covered by headless tests — case conversion, primitive types, derives, serde rename for camelCase keys, `Vec`/`Option`, nested structs, and top-level validation. CI runs them on every push.

## License
MIT © Alex Wictor
