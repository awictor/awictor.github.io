# SriGen

**Subresource Integrity (SRI) hash generator** — paste (or drop) a file's contents and get the `integrity="sha384-…"` attribute and a ready-to-use `<script>` tag. SHA-256/384/512 via the Web Crypto API. One offline HTML file, no signup, no tracking.

👉 **[Open SriGen](https://awictor.github.io/sri-gen/)**

## Features
- SHA-256, SHA-384 (default), or SHA-512
- Outputs the `integrity` attribute and a full `<script … crossorigin>` tag
- Drag-and-drop a file, or paste contents
- One-click copy; dark mode; remembers input
- 100% client-side; works offline — file contents never leave the page

## Why
When you load a script or stylesheet from a CDN, an `integrity` hash lets the browser refuse it if the bytes have changed — a simple, strong supply-chain defense. SriGen computes it locally so you can hash internal/unpublished assets safely. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Async tests verify the SRI against known digests (SHA-256 of "" and "abc"), algorithm prefixes, base64 payload lengths per digest size, invalid-algorithm handling, and the `<script>` tag format. CI runs them on every push.

## License
MIT © Alex Wictor
