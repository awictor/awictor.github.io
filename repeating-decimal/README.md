# Repeating Decimal ↔ Fraction

Convert a fraction to its **exact** decimal with the repeating cycle marked — `1/7 = 0.(142857)`, `1/6 = 0.1(6)` — and convert a repeating decimal back to a fraction, all with exact integer arithmetic (no floating-point rounding).

**[Open the tool →](https://awictor.github.io/repeating-decimal/)**

- Long division with remainder tracking to detect the cycle
- Parenthesis notation for the repetend
- Reverse: `0.(3)` → `1/3`, `0.1(6)` → `1/6`
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

`1/7 → 0.(142857)` · `22/7 → 3.(142857)` · `0.(3) → 1/3`.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
