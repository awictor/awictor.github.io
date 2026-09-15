# JSON to Python

**Turn JSON into Python `@dataclass` definitions** — typed and ready to paste. Nested objects become their own dataclasses, arrays become `List[T]`, and nulls become `Optional[Any]`. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to Python](https://awictor.github.io/json-to-python/)**

## Type mapping
- integer → `int`, float → `float`, `bool`, string → `str`
- array → `List[T]` (element inferred; empty → `List[Any]`)
- `null` → `Optional[Any]`
- nested object → a new `@dataclass`
- `from __future__ import annotations` is emitted so class order never matters

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toPascal`, `pyFieldName`, `jsonToPython`) are covered by headless tests — case handling, primitive types, imports/decorator, `List`/`Optional`, nested classes, empty-class `pass`, identifier sanitizing, and top-level validation. CI runs them on every push.

## License
MIT © Alex Wictor
