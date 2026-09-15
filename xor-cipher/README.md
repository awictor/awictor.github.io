# XorCipher

**Repeating-key XOR encoder / decoder** — XOR text or hex against a repeating key and get the result in hex, or decode hex back to text. The classic CTF and reverse-engineering primitive, self-inverse. One offline HTML file, no signup, no tracking.

👉 **[Open XorCipher](https://awictor.github.io/xor-cipher/)**

## Features
- Text → hex and hex → text modes
- Key as text or hex; repeating-key XOR
- Self-inverse: decode with the same key to recover the input
- UTF-8 safe; dark mode; 100% client-side

## Why
XOR against a key is the building block behind countless CTF challenges, obfuscation schemes, and stream ciphers. XorCipher applies it both ways offline, in hex, so you can experiment and decode. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not secure
Repeating-key XOR is trivially broken (frequency analysis, known-plaintext). Use it for puzzles and analysis, never to protect real data — for that see [CipherNote](https://awictor.github.io/cipher-note/) (AES-GCM).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToBytes`, `bytesToHex`, `xor`, `xorTextToHex`, `xorHexToText`) are covered by headless tests — hex conversion, single-byte and repeating-key XOR, self-inverse, the `"Hello" ^ "K"` vector, round-trips, hex-key mode, UTF-8, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
