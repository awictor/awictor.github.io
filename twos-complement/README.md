# TwosComplement

**Signed integer binary / hex viewer** — see any integer in two's-complement binary and hex across 8, 16, 32, and 64 bits, and interpret a raw bit pattern as signed or unsigned. BigInt-accurate. One offline HTML file, no signup, no tracking.

👉 **[Open TwosComplement](https://awictor.github.io/twos-complement/)**

## Features
- Decimal → two's-complement binary (sign bit highlighted) + hex, at 8/16/32/64 bits
- Reverse: parse a `0x`, binary, or decimal pattern → signed and unsigned values
- Full 64-bit accuracy via BigInt; range hints per width
- Dark mode; 100% client-side

## Why
Negative integers in binary trip everyone up — the top bit is the sign, and the value is `2ⁿ + n`. TwosComplement shows the exact bits and lets you read a pattern both ways, offline. Great for embedded, networking, and low-level debugging. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`encode`, `decode`, `parsePattern`) are covered by headless tests — positive/negative encodings, all-ones `-1`, 8-bit min/max, the `-42 → 0xD6` case, signed decoding, round-trips across widths, 64-bit BigInt accuracy, pattern parsing, and range/validation. CI runs them on every push.

## License
MIT © Alex Wictor
