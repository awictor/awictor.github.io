# UUIDGen

**UUID v4 generator & validator** — generate cryptographically-random UUIDs (single or bulk) and validate or inspect any UUID's version and variant. One offline HTML file, no signup, no tracking.

👉 **[Open UUIDGen](https://awictor.github.io/uuid-gen/)**

## Features
- Cryptographically-random UUID v4 (`crypto.getRandomValues`)
- Bulk generate up to 1000 at once; copy all
- Validate any UUID and detect its **version** and **variant** (nil handled)
- Click to copy, dark mode
- 100% client-side; works offline

## Why
IDs are needed constantly — for tests, fixtures, migrations, and configs. UUIDGen makes secure v4 UUIDs and checks that a given string is a real UUID, all locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`generateV4`, `isValidUuid`, `uuidVersion`, `uuidVariant`, `isNil`) are covered by headless regression tests, including shape/version/variant and uniqueness; CI runs them on every push.

## License
MIT © Alex Wictor
