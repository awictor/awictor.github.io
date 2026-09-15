# HmacGen

**HMAC signature generator (SHA-256 / SHA-1)** — sign a message with a secret key to generate or verify webhook and API signatures, computed entirely in your browser. Pure client-side crypto, RFC 4231 compliant. One offline HTML file, no signup, no tracking.

👉 **[Open HmacGen](https://awictor.github.io/hmac-gen/)**

## Features
- HMAC-SHA256 (the webhook standard) and HMAC-SHA1
- Secret key as text or hex
- From-scratch SHA-256 / SHA-1 / HMAC — **no libraries, no network calls**
- One-click copy; dark mode; remembers your inputs
- 100% client-side; works offline

## Security note
The message and key never leave the page — no requests, analytics, or third-party scripts. Use it to verify signatures from GitHub, Stripe, Slack, and other webhook providers, or to sign your own requests.

## Why
Verifying a webhook signature usually means reaching for a code snippet or an online tool you shouldn't paste secrets into. HmacGen does the HMAC locally and shows its work (see the tests). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The crypto is verified against published vectors: SHA-256 (FIPS 180), HMAC-SHA256 (RFC 4231 cases 1, 2, 4, and the long-key case 6), and HMAC-SHA1 (RFC 2202). CI runs them on every push.

## License
MIT © Alex Wictor
