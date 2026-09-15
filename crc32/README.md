# Crc32

**CRC-32 checksum calculator** — compute the CRC-32 (hex and decimal) of any text. One offline HTML file, no signup, no tracking.

👉 **[Open Crc32](https://awictor.github.io/crc32/)**

## Features
- CRC-32 (IEEE polynomial `0xEDB88320`) — the checksum used by ZIP, PNG, and gzip
- Hex and decimal output; click to copy
- Full UTF-8 handling; dark mode; remembers your input
- 100% client-side; works offline

## Why
CRC-32 is everywhere in file formats and integrity checks. Crc32 computes it instantly and offline so you can verify a value without installing anything. Note: CRC-32 detects accidental corruption but is **not** a cryptographic hash. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`crc32`, `crc32Hex`) are covered by headless tests against the canonical vectors (`"123456789" → CBF43926`, `"a" → E8B7BE43`, the quick-brown-fox), byte-array input, and UTF-8; CI runs them on every push.

## License
MIT © Alex Wictor
