# Base45

Encode and decode **Base45 (RFC 9285)** — the compact, QR-friendly encoding used in **EU Digital COVID Certificates**. One offline HTML file, no signup, no tracking.

👉 **[Open Base45](https://awictor.github.io/base45/)**

## How it works
Bytes are taken in pairs: each 16-bit pair becomes three Base45 characters (a lone trailing byte becomes two), using a 45-symbol alphabet from the QR alphanumeric set. Text is treated as UTF-8. Verified against the RFC vectors, e.g. `"AB"` → `BB8`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encodeBytes`, `decodeBytes`, `encode`, `decode`) are covered by headless tests — the 45-char alphabet, all three RFC 9285 vectors and their decode, the 3-chars-per-pair / 2-chars-per-byte rule, byte and UTF-8 string round-trips, empty input, and invalid-character/length validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
