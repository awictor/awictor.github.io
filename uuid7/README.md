# Uuid7

**UUID v7 generator & inspector** — generate time-ordered, sortable **UUIDv7** identifiers (and classic v4) in bulk, and decode any UUID to reveal its version, variant, and embedded timestamp. One offline HTML file, no signup, no tracking.

👉 **[Open Uuid7](https://awictor.github.io/uuid7/)**

## Features
- Bulk-generate UUIDv7 (time-ordered) or UUIDv4 (random), 1–1000 at a time
- Inspect any UUID: version, RFC 4122 variant, and the v7 millisecond timestamp + date
- Cryptographically random (Web Crypto) where available
- Copy button, dark mode; 100% client-side; works offline

## Why
UUIDv7 embeds a millisecond timestamp in its high bits, so IDs generated later sort later — giving you random-collision safety *and* database index locality (unlike v4). Uuid7 mints them and lets you read the timestamp back out of any v7. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`uuidV7`, `uuidV4`, `parseUuid`, `bytesToUuid`, `isValidUuid`) are covered by headless tests with an injected clock/RNG — canonical bit patterns, timestamp round-trip, lexicographic ordering, and variant detection; CI runs them on every push.

## License
MIT © Alex Wictor
