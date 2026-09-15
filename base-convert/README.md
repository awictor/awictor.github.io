# BaseConvert

**Number base converter** — convert integers between binary, octal, decimal, hexadecimal, and any base 2–36, all synced live. Big-integer precise (handles arbitrarily large numbers). One offline HTML file, no signup, no tracking.

👉 **[Open BaseConvert](https://awictor.github.io/base-convert/)**

## Features
- Binary, octal, decimal, hex, plus a custom base (2–36)
- Edit any field; the rest update instantly
- BigInt-precise — no rounding on huge values
- Negative numbers, click-to-copy
- Dark mode, remembers your value
- 100% client-side; works offline

## Why
Bit math, color values, permissions, and encodings all mean hopping between bases. BaseConvert keeps them in sync with exact big-integer arithmetic. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseInBase`, `toBase`, `convert`) are covered by headless regression tests, including cross-base round-trips on 30-digit numbers; CI runs them on every push.

## License
MIT © Alex Wictor
