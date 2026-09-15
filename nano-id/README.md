# NanoId

**Compact URL-safe ID generator** — create short, URL-safe, cryptographically-random unique IDs with a configurable alphabet and length, plus an entropy readout. Bulk-generate as many as you need. One offline HTML file, no signup, no tracking.

👉 **[Open NanoId](https://awictor.github.io/nano-id/)**

## Features
- Unbiased bitmask sampling (no modulo bias) over the Web Crypto RNG
- Alphabet presets: URL-safe (64), alphanumeric (62), lowercase+digits, hex, numbers, no-look-alikes
- Adjustable length (4–36); bulk generate up to 500
- Live entropy readout (bits per ID); copy button; dark mode; 100% client-side

## Why
When a UUID is overkill and a raw random string risks bias, a Nano-ID-style generator gives you short, collision-resistant IDs done right. NanoId shows the exact entropy so you can size them for your use. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`nanoid`, `computeMask`, `entropyBits`, `defaultRand`) are covered by headless tests with a fixed RNG — deterministic output, rejection sampling, pool refill, custom alphabets, and entropy math; CI runs them on every push.

## License
MIT © Alex Wictor
