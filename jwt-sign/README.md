# JwtSign

**Encode & sign JSON Web Tokens** — build a JWT from a header, payload and secret, HMAC-signed with `HS256`, `HS384`, or `HS512`, entirely in your browser. The signed token appears live, color-coded by segment. One offline HTML file, no signup, no tracking.

👉 **[Open JwtSign](https://awictor.github.io/jwt-sign/)**

## Features
- HS256 / HS384 / HS512 signing via the Web Crypto API (algorithm read from the header's `alg`)
- Live, color-coded token (header · payload · signature) with one-tap copy
- JSON validation on header and payload with inline errors
- Dark mode; remembers your inputs; **your secret never leaves the page**
- 100% client-side; works offline

## Why
Sometimes you just need a valid signed token for a test or a curl call — without pasting your secret into a random website. JwtSign builds it locally and matches the canonical jwt.io output byte-for-byte. To decode a token, use the sibling [JWTPeek](https://awictor.github.io/jwt-peek/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

> Signing is only as safe as your secret. HMAC tokens can be forged by anyone who has it — treat it like a password.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`b64url`, `base64urlBytes`, `signingInput`) and async `sign` are covered by headless tests, including the canonical jwt.io HS256 vector and HS384/HS512 signature lengths; CI runs them on every push.

## License
MIT © Alex Wictor
