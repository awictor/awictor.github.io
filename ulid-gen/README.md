# UlidGen

**ULID generator & decoder** — create lexicographically sortable, timestamp-embedded unique IDs (Crockford base32), and decode any ULID's timestamp back to a date. One offline HTML file, no signup, no tracking.

👉 **[Open UlidGen](https://awictor.github.io/ulid-gen/)**

## Features
- Generates spec-compliant 26-character ULIDs (48-bit time + 80-bit randomness)
- Decodes the embedded timestamp of any ULID
- Random part uses the Web Crypto CSPRNG
- One-click copy; dark mode
- 100% client-side; works offline

## Why
ULIDs are a popular alternative to UUIDs: globally unique like a UUID, but **sortable by creation time** and case-insensitive base32. Great as database primary keys. UlidGen makes and inspects them instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encodeTime`, `encodeRandom`, `ulid`, `decodeTime`, `isValid`) are covered by headless tests using an injected clock/RNG — including the canonical spec vector (`1469918176385 → 01ARYZ6S41`), encode/decode inverses, and sort order; CI runs them on every push.

## License
MIT © Alex Wictor
