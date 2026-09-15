# Changelog

## 0.1.0
- First release. Offline TOTP / 2FA authenticator.
- Pure-JS SHA-1, HMAC-SHA1, base32, HOTP (RFC 4226) and TOTP (RFC 6238).
- Live 6-digit codes with countdown; click-to-copy.
- Secret stored only in localStorage; no network calls.
- Dark mode. Headless test suite (10 checks against RFC vectors) + CI.
