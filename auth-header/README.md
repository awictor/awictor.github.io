# AuthHeader

**HTTP Authorization header builder** — encode a username + password into a Basic auth header, decode one back into credentials, or wrap a token as Bearer — with a ready-to-paste `curl` snippet. One offline HTML file, no signup, no tracking.

👉 **[Open AuthHeader](https://awictor.github.io/auth-header/)**

> ⚠️ **Base64 is encoding, not encryption.** Basic credentials are trivially reversible — only send them over HTTPS. Everything here runs locally; nothing is transmitted.

## Features
- **Basic (encode)**: `user` + `password` → `Authorization: Basic …` (RFC 7617), UTF-8 safe
- **Basic (decode)**: paste a header or base64 → username + password (splits on the first colon, so colon-containing passwords work)
- **Bearer**: wrap a token as `Authorization: Bearer …`
- Ready-to-copy `curl -H` snippet; dark mode; 100% client-side

## Why
Hand-building an `Authorization` header for a quick API test means base64-ing `user:pass` in your head or pasting secrets into a random site. AuthHeader does it locally, both directions. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`basicHeader`, `parseBasic`, `bearerHeader`, `b64encodeUtf8/decodeUtf8`, `curlSnippet`) are covered by headless tests — the RFC 7617 canonical example, UTF-8 and colon-in-password round-trips, and invalid-input handling; CI runs them on every push.

## License
MIT © Alex Wictor
