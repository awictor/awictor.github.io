# AuthCode

**Offline TOTP / 2FA authenticator** — paste the base32 secret behind any 2FA QR code and get live six-digit codes, computed entirely in your browser. Pure client-side SHA-1 / HMAC, RFC 6238 compliant. One offline HTML file, no signup, no tracking.

👉 **[Open AuthCode](https://awictor.github.io/auth-code/)**

## Features
- Live 30-second TOTP codes with a countdown bar
- Standard 6-digit RFC 6238 (also computes 8-digit and custom steps under the hood)
- Pure-JS SHA-1, HMAC-SHA1, and base32 — **no libraries, no network calls**
- Click the code (or the button) to copy
- Dark mode; the secret is kept only in this browser's local storage
- 100% client-side; works offline

## Security note
The secret never leaves the page — there are no requests, analytics, or third-party scripts. It is saved to `localStorage` for convenience; clear the field to remove it. For high-value accounts, a dedicated hardware or app authenticator is still recommended.

## Why
Sometimes you just need a TOTP code and don't want to install an app or trust a website with your seed. AuthCode does the math locally, offline, and shows its work (see the tests). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The crypto is verified against published vectors: SHA-1 (FIPS 180), HMAC-SHA1 (RFC 2202), HOTP (RFC 4226 Appendix D), and TOTP (RFC 6238). CI runs them on every push.

## License
MIT © Alex Wictor
