# JSON to Kotlin

Paste JSON and get **Kotlin `data class`es** with inferred types and nested classes. For Android and Kotlin developers. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to Kotlin](https://awictor.github.io/json-to-kotlin/)**

## Type mapping
Strings → `String`, whole numbers → `Int` (or `Long` when too big), decimals → `Double`, booleans → `Boolean`, `null` → `Any?`. Nested objects become their own `data class`; arrays become `List<T>` from the first element. Non-identifier keys are backtick-quoted.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pascal`, `singular`, `scalarType`, `toKotlin`) are covered by headless tests — scalar mapping, the Int/Long boundary, PascalCase names, naive singularization, scalar/nested/array/empty-array/null generation, nested-class ordering, backticked keys, and root validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
