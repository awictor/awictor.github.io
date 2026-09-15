# CRC Calculator

**Compute CRC checksums with common polynomials** — CRC-8, CRC-16 (CCITT-FALSE, XMODEM, ARC, MODBUS), and CRC-32 — from text or hex bytes. Built on a parameterized Rocksoft model (width, poly, init, reflection, final XOR). One offline HTML file, no signup, no tracking.

👉 **[Open CRC Calculator](https://awictor.github.io/crc-calc/)**

## Features
- Six standard CRC variants side by side
- Text (UTF-8) or hex-byte input; tap any value to copy
- Correct reflection/XOR handling; dark mode; 100% client-side

## Verified
Matches the canonical "123456789" check values: CRC-8 = 0xF4, CRC-16/CCITT-FALSE = 0x29B1, XMODEM = 0x31C3, ARC = 0xBB3D, MODBUS = 0x4B37, CRC-32 = 0xCBF43926.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`crcCompute`, `reflect`, `hexToBytes`, `toHex`) are validated against all six standard check values, plus reflection, hex/ascii agreement, empty input, and formatting. CI runs them on every push.

## License
MIT © Alex Wictor
