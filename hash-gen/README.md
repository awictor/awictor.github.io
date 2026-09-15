# HashGen

**SHA hash generator** — compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes of any text, live, in your browser via the Web Crypto API. One offline HTML file, no signup, no tracking; your text never leaves your device.

👉 **[Open HashGen](https://awictor.github.io/hash-gen/)**

## Features
- SHA-1, SHA-256, SHA-384, SHA-512 at once, updated as you type
- Lowercase hex output, click to copy
- UTF-8 correct (hashes the byte encoding)
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Verifying checksums or generating digests shouldn't require uploading data anywhere. HashGen uses the browser's native `crypto.subtle` so hashing is fast and fully local. (SHA-1 is included for legacy interop — prefer SHA-256 or stronger.) Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The `sha`/`allHashes` functions are covered by headless tests against canonical NIST vectors (e.g. SHA-256("abc")); CI runs them on every push.

## License
MIT © Alex Wictor
