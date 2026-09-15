# TokenGen

**Secure random token & API-key generator** — create cryptographically secure tokens in hex, base62, base58, base64url, or digits, with a live entropy readout and strength label. Uses the Web Crypto API. One offline HTML file, no signup, no tracking.

👉 **[Open TokenGen](https://awictor.github.io/token-gen/)**

## Features
- Alphabets: hex, base62, base58 (no ambiguous `0 O I l`), base64url, digits
- Adjustable length (4–128) with entropy (bits) and strength readout
- Cryptographically secure via `crypto.getRandomValues` — never `Math.random` in the browser
- One-click regenerate and copy; dark mode; remembers your settings
- 100% client-side; works offline — tokens never leave the page

## Why
API keys, session tokens, and secrets need real entropy from a CSPRNG, not a hand-typed string or a random online generator you shouldn't trust. TokenGen makes strong tokens locally and shows exactly how many bits of entropy you're getting. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`entropyBits`, `generateToken`, `strengthLabel`, `ALPHABETS`) are covered by headless regression tests using an injected RNG for determinism, plus alphabet and entropy checks; CI runs them on every push.

## License
MIT © Alex Wictor
