# HexDump

**xxd-style hex dump of text** — paste any text and get a classic hex dump: byte offset, hex bytes, and a printable-ASCII gutter. Text is encoded as UTF-8, so you can see exactly how multi-byte characters expand. One offline HTML file, no signup, no tracking.

👉 **[Open HexDump](https://awictor.github.io/hex-dump/)**

## Features
- Offset (hex) · raw bytes · ASCII gutter, with a group gap after the 8th byte at width 16
- 8 or 16 bytes per line
- UTF-8 byte encoding; non-printable bytes shown as `.`
- Byte + character counts; copy button; dark mode; 100% client-side

## Why
Seeing the actual bytes — where a stray BOM, non-breaking space, or multi-byte emoji lives — is often the fastest way to debug an encoding bug. HexDump gives you the `hexdump -C` view in the browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`textToBytes`, `hexDump`, `hex2`, `asciiChar`) are covered by headless tests with exact expected output — wrapping, offsets, the width-16 group gap, non-printable dots, and byte-array input; CI runs them on every push.

## License
MIT © Alex Wictor
