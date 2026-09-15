# JSON to C#

Paste JSON and get **C# classes** with inferred property types, PascalCase auto-properties, `[JsonPropertyName]` attributes for renamed keys, nested classes and `List<T>`. For .NET developers. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to C#](https://awictor.github.io/json-to-csharp/)**

## Type mapping
Strings → `string`, whole numbers → `int` (`long` if too big), decimals → `double`, booleans → `bool`, `null` → `object`. Nested objects become their own class; arrays become `List<T>`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pascal`, `singular`, `scalarType`, `toCSharp`) are covered by headless tests — scalar mapping, the int/long boundary, name casing, auto-properties, the `[JsonPropertyName]` attribute, nested-class generation/order, `List<T>`, empty arrays, singular element classes, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
