# JSON to Zod

Paste JSON and get a ready-to-use **[Zod](https://zod.dev) validation schema** with a matching TypeScript type via `z.infer`. Handles nested objects and arrays. One offline HTML file, no signup, no tracking.

👉 **[Open JSON to Zod](https://awictor.github.io/json-to-zod/)**

## What it does
Strings → `z.string()`, whole numbers → `z.number().int()`, decimals → `z.number()`, booleans → `z.boolean()`, `null` → `z.null()`. Objects become `z.object({…})`, arrays become `z.array(…)` from the first element. Non-identifier keys are quoted automatically.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`keyStr`, `zodForValue`, `toZodSchema`) are covered by headless tests — scalar mapping, `.int()` for integers, array/empty-array handling, object indentation, nested structures, identifier key quoting, preserved key order, the full module wrapper with `z.infer`, and schema-name validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
