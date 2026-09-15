# JSON Diff

**Structurally compare two JSON documents** and see exactly which paths were **added**, **removed**, or **changed** — not a noisy line-by-line text diff. Great for comparing API responses, config files, and fixtures. One offline HTML file, no signup, no tracking.

👉 **[Open JSON Diff](https://awictor.github.io/json-diff/)**

## Features
- Recursive comparison of objects and arrays
- Path notation like `stock.warehouse` and `tags[1]`
- Type-sensitive (`1` ≠ `"1"`, `{}` ≠ `[]`)
- Added / removed / changed summary counts; live parse-error feedback
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`typeOf`, `deepEqual`, `diffJson`, `summarize`) are covered by headless tests — type detection, deep equality, identical docs, primitive/nested/array changes, add/remove, type changes, root-level changes, and a multi-change summary. CI runs them on every push.

## License
MIT © Alex Wictor
