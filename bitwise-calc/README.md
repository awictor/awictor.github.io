# Bitwise

**Bitwise operations calculator** — AND, OR, XOR, NOT and shifts on 32-bit integers, shown in decimal, hex, octal and binary at once, with correct two's-complement handling. Accepts decimal, `0x` hex, and `0b` binary. One offline HTML file, no signup, no tracking.

👉 **[Open Bitwise](https://awictor.github.io/bitwise-calc/)**

## Features
- `&`, `|`, `^`, `~`, `<<`, `>>` (arithmetic), `>>>` (logical)
- Inputs in decimal, `0x` hex, or `0b` binary — mix freely
- Result as signed 32-bit, unsigned, hex, octal, and a grouped 32-bit binary view
- Shift amounts masked to 0–31 (JS semantics); click any value to copy
- Dark mode; remembers your inputs; 100% client-side; works offline

## Why
Masking flags, packing bitfields, and reasoning about sign extension are error-prone in your head. Bitwise shows every representation side by side so you can see exactly what a mask or shift does. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseIntAny`, `op`, `toBin`, `groupBits`, `toHex`, `toOct`, `toUnsigned`) are covered by headless tests, including two's-complement NOT, arithmetic vs logical shifts, and shift-amount masking; CI runs them on every push.

## License
MIT © Alex Wictor
