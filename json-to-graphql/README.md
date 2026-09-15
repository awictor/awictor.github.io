# JSON to GraphQL

Paste JSON and get **GraphQL SDL type definitions** with inferred scalar types, nested types and lists. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to GraphQL](https://awictor.github.io/json-to-graphql/)**

## Type mapping
Strings → `String`, whole numbers → `Int`, decimals → `Float`, booleans → `Boolean`. Present fields get `!`; `null` becomes a nullable `String`. Nested objects become their own `type`; arrays become lists like `[Tag!]!`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pascal`, `singular`, `scalarType`, `toGraphQL`) are covered by headless tests — scalar mapping, name casing, non-null scalar fields, nullable nulls, scalar and empty lists, nested-type generation and ordering, singular element types, root naming, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
