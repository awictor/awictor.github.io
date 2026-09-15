# Adler-32 Checksum

Compute the **Adler-32** checksum (the zlib checksum) of text, shown in hex and decimal. Faster than CRC-32 but weaker at catching errors. One offline HTML file, no signup, no tracking.

👉 **[Open Adler-32 Checksum](https://awictor.github.io/adler32/)**

## How it works
Two running sums mod 65521: `A` = 1 + sum of bytes, `B` = sum of the A values; result = `(B << 16) | A`. Reference: `Adler-32("Wikipedia") = 0x11E60398`.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`adler32`, `adler32Bytes`, `toHex`) are covered by headless tests: empty=1, the canonical Wikipedia vector, "a"/"abc" worked examples, byte-array/string parity, unsigned-32-bit range, avalanche on a one-byte change, hex formatting, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
