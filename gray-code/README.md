# Gray Code Converter

Convert a number to and from **reflected binary Gray code**, showing binary and decimal for both. In Gray code, **consecutive values differ by exactly one bit** — the property that makes it useful for rotary encoders, Karnaugh maps, and glitch-free position sensing. One offline HTML file, no signup, no tracking.

👉 **[Open Gray Code Converter](https://awictor.github.io/gray-code/)**

## The trick
Encode: `gray = n XOR (n >> 1)`. Decode: XOR each right-shifted copy back together.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toGray`, `fromGray`, `toBits`, `popcount`) are covered by headless tests: the standard 3-bit table, the `n ^ (n>>1)` identity over 256 values, decode-inverts-encode over 1000 values, the **one-bit-difference property** across 512 consecutive codes, bijection on a range, popcount, formatting, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
