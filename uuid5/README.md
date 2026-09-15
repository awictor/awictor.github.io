# Uuid5

**Name-based UUID v5 generator** — create deterministic UUIDs from a namespace and a name (SHA-1 based). The same namespace + name always yields the same UUID. One offline HTML file, no signup, no tracking.

👉 **[Open Uuid5](https://awictor.github.io/uuid5/)**

## Features
- RFC 4122 version 5 (SHA-1) UUIDs
- Predefined DNS, URL, OID, and X.500 namespaces, plus custom
- Fully deterministic — reproducible stable IDs
- One-click copy; dark mode; remembers inputs
- 100% client-side; works offline

## Why
Unlike random v4 UUIDs, **v5 is deterministic**: derive a stable ID from a URL, file path, or key and you'll always get the same UUID — ideal for idempotent records and content addressing. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sha1Bytes`, `parseUuid`, `bytesToUuid`, `uuidV5`) are covered by headless tests including the documented vector `uuid5(DNS, 'python.org') = 886313e1-3b8a-5372-9b90-0c9aee199e5d`, version/variant bits, determinism, and namespace handling. CI runs them on every push.

## License
MIT © Alex Wictor
