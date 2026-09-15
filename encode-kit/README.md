# EncodeKit

**Base64 & URL encoder / decoder** — encode and decode text both ways, UTF-8 safe, entirely in your browser. One offline HTML file, no signup, no tracking; your text never leaves your device.

👉 **[Open EncodeKit](https://awictor.github.io/encode-kit/)**

## Features
- Base64 and URL modes, each with encode / decode
- UTF-8 safe (handles emoji and non-Latin text)
- Clear error when input isn't valid for the chosen mode
- Copy result, or feed it back as input for chaining
- Dark mode, remembers your input and mode
- 100% client-side; works offline

## Why
Encoding tasks are constant in web and API work, and pasting data into an online encoder leaks it. EncodeKit does Base64 and URL both directions locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`b64Encode`, `b64Decode`, `urlEncode`, `urlDecode`, `convert`) are covered by headless regression tests against known values and round-trips; CI runs them on every push.

## License
MIT © Alex Wictor
