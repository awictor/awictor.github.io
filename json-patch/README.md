# JSON Patch

Apply a **JSON Patch (RFC 6902)** — `add`, `remove`, `replace`, `move`, `copy`, `test` — to any JSON document, right in your browser. Paths use **JSON Pointer (RFC 6901)**. The standard format for `PATCH` requests and partial updates. One offline HTML file, no signup, no tracking.

👉 **[Open JSON Patch](https://awictor.github.io/json-patch/)**

## Features
- All six RFC 6902 operations, applied in order
- `test` aborts the patch on mismatch; `/-` appends to arrays
- Non-mutating: your input document is left untouched
- Dark mode with persistence; fully offline

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parsePointer`, `getValue`, `applyPatch`) are covered by headless tests drawn from the RFC 6902 Appendix A examples (add/remove/replace/move/copy/test), pointer escaping (`~0`/`~1`), array append, immutability, and error handling for malformed patches and unknown ops. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
