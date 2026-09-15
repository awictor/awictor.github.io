# Checksum

**Compute Adler-32 and Fletcher-16 checksums** of any text, in hex and decimal. Fast integrity checks that complement CRC-32 and cryptographic hashes. One offline HTML file, no signup, no tracking.

👉 **[Open Checksum](https://awictor.github.io/checksum/)**

## Features
- **Adler-32** (zlib, mod 65521) and **Fletcher-16** (mod 255)
- Hex + decimal output, UTF-8 byte count, one-tap copy
- Dark mode; 100% client-side

## Note
Checksums detect accidental corruption, not tampering. For security use a cryptographic hash (SHA-256), available in the [Hash Generator](https://awictor.github.io/hash-gen/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`utf8bytes`, `adler32`, `fletcher16`, `toHex`) are covered by headless tests against canonical vectors — Adler-32 of `""`=1, `"a"`=0x00620062, `"Wikipedia"`=0x11E60398, and Fletcher-16 of `abcde`/`abcdef`/`abcdefgh` — plus UTF-8 byte handling and hex formatting. CI runs them on every push.

## License
MIT © Alex Wictor
