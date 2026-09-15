# JWTPeek

**Offline JWT decoder** — paste a JSON Web Token to see its header, payload claims, and expiry status. Everything happens in your browser; the token is **never sent anywhere**. One offline HTML file, no signup, no tracking.

👉 **[Open JWTPeek](https://awictor.github.io/jwt-peek/)**

## Features
- Decodes header + payload (pretty-printed JSON) and shows the raw signature
- Claims summary: algorithm, subject, issuer, audience, issued-at, not-before, and **expiry with a valid/expired badge**
- base64url-aware, UTF-8 safe, handles 2- or 3-part tokens
- Clear validation messages for malformed tokens
- Dark mode, remembers your last token locally
- 100% client-side; works offline — nothing leaves your device

## Why
Debugging auth means reading tokens constantly, and pasting them into an online decoder leaks whatever they contain. JWTPeek does it locally so sensitive claims stay on your machine. It decodes — it does not verify the signature (that needs the secret/public key). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`base64UrlDecode`, `decodeJwt`, `claimStatus`) are covered by headless regression tests, including the canonical jwt.io token; CI runs them on every push.

## License
MIT © Alex Wictor
