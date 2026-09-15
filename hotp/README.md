# HOTP Generator

**Generate HMAC-based one-time passwords (HOTP, RFC 4226)** from a Base32 or ASCII secret and a counter. Implements SHA-1, HMAC-SHA1, and dynamic truncation from scratch — no dependencies — and matches the RFC 4226 reference vectors exactly. One offline HTML file, no signup, no tracking.

👉 **[Open HOTP Generator](https://awictor.github.io/hotp/)**

## HOTP vs TOTP
HOTP uses a **counter** that increments each use (event-based tokens, hardware keys). TOTP is HOTP with the counter set to the current time step. This tool is the counter-based variant.

## Features
- Base32 (authenticator-style) or ASCII secret; 6/7/8 digits
- Pure-JS SHA-1 / HMAC-SHA1 / dynamic truncation
- Dark mode; 100% client-side — secrets never leave your browser

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sha1Hex`, `hmacSha1`, `hotp`, `base32Decode`, …) are validated against published vectors — SHA-1 of `""`/`abc`/pangram, the HMAC-SHA1 RFC 2202 vector, all ten HOTP RFC 4226 reference codes, 8-digit truncation, RFC 4648 base32, and the Google-Authenticator test key. CI runs them on every push.

## License
MIT © Alex Wictor
