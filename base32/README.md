# Base32

**RFC 4648 Base32 encoder / decoder** — convert text to and from Base32 (the encoding behind TOTP secrets, DNS, and more), with correct padding. One offline HTML file, no signup, no tracking.

👉 **[Open Base32](https://awictor.github.io/base32/)**

## Features
- Encode text → Base32 and decode Base32 → text
- RFC 4648 alphabet with `=` padding
- Decode is case-insensitive and ignores whitespace
- Full UTF-8 support; invalid input is flagged
- Dark mode; one-click copy; per-mode memory
- 100% client-side; works offline

## Why
Base32 shows up wherever case-insensitive, human-transcribable encoding matters — 2FA secret keys, DNSSEC, file names. Base32 converts both ways instantly and offline, and the encoding is verified against the RFC test vectors. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`base32Encode`, `base32Decode`, `encodeText`, `decodeText`) are covered by headless tests against the RFC 4648 vectors (`f → MY======`, `foobar → MZXW6YTBOI======`), round-trips (incl. unicode), padding, and invalid input; CI runs them on every push.

## License
MIT © Alex Wictor
