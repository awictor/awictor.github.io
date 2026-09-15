# AWG Wire Gauge Calculator

Convert **American Wire Gauge (AWG)** to conductor diameter (mm and inches) and cross-sectional area, and find the AWG for a given diameter.

**[Open the tool →](https://awictor.github.io/awg-calc/)**

- `d = 0.127 mm × 92^((36 − n)/39)`, area `π/4·d²`
- Reverse: diameter → AWG
- Supports 1/0 (0), 2/0 (−1), 3/0 (−2)…
- Dark mode, 100% offline, no dependencies, no tracking

## Example

AWG 12 → ~2.05 mm, ~3.31 mm². AWG 36 is exactly 0.127 mm.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
