# SchemaGen

**JSON → JSON Schema generator** — paste a JSON sample and get a draft-07 JSON Schema back, live. Types are inferred recursively, object keys become required properties, and array items are merged intelligently. One offline HTML file, no signup, no tracking.

👉 **[Open SchemaGen](https://awictor.github.io/json-schema-gen/)**

## Features
- Recursive type inference — whole numbers become `integer`, decimals `number`
- Object keys become `properties`, all listed under `required`
- Array items merged: mixed scalars collapse to a type list, mixed shapes to `anyOf`
- Deterministic, stable output; copy button; dark mode; remembers your input
- 100% client-side; works offline

## Why
Hand-writing a JSON Schema from an example payload is tedious and error-prone. SchemaGen gives you a correct draft-07 starting point in one paste — then tighten it by hand. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`inferSchema`, `mergeSchemas`, `stableStringify`, `jsonToSchema`) are covered by headless tests, including nested objects, array-element merging, mixed-type collapsing, and `anyOf` fallback; CI runs them on every push.

## License
MIT © Alex Wictor
