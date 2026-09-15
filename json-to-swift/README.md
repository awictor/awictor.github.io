# JSON to Swift

Paste JSON and get **Swift `Codable` structs** with inferred property types, nested structs and arrays. For iOS/macOS developers. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to Swift](https://awictor.github.io/json-to-swift/)**

## Type mapping
Strings → `String`, whole numbers → `Int`, decimals → `Double`, booleans → `Bool`, `null` → optional `String?`. Nested objects become their own `struct`; arrays become `[Element]`. Every struct conforms to `Codable`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pascal`, `singular`, `scalarType`, `toSwift`) are covered by headless tests — scalar mapping, name casing, Codable `let` properties, optional nulls, nested-struct generation/order, `[Element]` arrays, empty arrays, singular element structs, backticked keys, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
