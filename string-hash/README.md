# String Hash

**Fast non-cryptographic string hashes** — FNV-1a and djb2 (32-bit) — in hex and decimal. For hash tables, cache keys, bloom filters, and sharding. One offline HTML file, no signup, no tracking.

👉 **[Open String Hash](https://awictor.github.io/string-hash/)**

## Not for security
FNV-1a and djb2 are fast and well-distributed but **not** collision-resistant — never use them for passwords or integrity. Use a cryptographic hash (SHA-256) for that; see the [Hash Generator](https://awictor.github.io/hash-gen/).

## Features
- FNV-1a and djb2, 32-bit, hex + decimal
- UTF-8 byte-aware; one-tap copy; dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`fnv1a`, `djb2`, `utf8bytes`, `toHex`) are covered by headless tests — FNV-1a known vectors (`""`, `a`, `hello`), hand-computed djb2 values, determinism, order sensitivity, UTF-8 handling, unsigned-32 range, and formatting. CI runs them on every push.

## License
MIT © Alex Wictor
