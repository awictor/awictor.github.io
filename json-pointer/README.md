# JsonPointer

**RFC 6901 JSON Pointer resolver** — paste a JSON document and a pointer like `/foo/0/bar` to resolve the value, with correct `~0`/`~1` escaping, plus a clickable list of every pointer in the document. One offline HTML file, no signup, no tracking.

👉 **[Open JsonPointer](https://awictor.github.io/json-pointer/)**

## Features
- Full RFC 6901: `/`-separated tokens, `~1` → `/`, `~0` → `~`, empty pointer = whole document
- Clear errors for missing keys, out-of-range or malformed array indices, and the `-` end token
- Lists every pointer in the document with a value preview — click to resolve
- Dark mode; 100% client-side

## Why
JSON Pointers show up in JSON Schema, JSON Patch, OpenAPI, and API errors, and the escaping rules trip people up. JsonPointer resolves and enumerates them exactly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`escapeToken`, `unescapeToken`, `parsePointer`, `resolve`, `listPointers`) are covered by headless tests against the RFC 6901 §5 reference document and edge cases — escaping order, leading-zero index rejection, the `-` token, missing keys, and full pointer enumeration. CI runs them on every push.

## License
MIT © Alex Wictor
