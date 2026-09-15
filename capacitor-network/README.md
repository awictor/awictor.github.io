# Capacitor Network Calculator

Calculate total capacitance of capacitors in **series** or **parallel**, plus **stored energy**.

**[Open the tool →](https://awictor.github.io/capacitor-network/)**

- Parallel: C = C₁ + C₂ + … ; Series: 1/C = 1/C₁ + 1/C₂ + …
- Energy stored E = ½CV²
- The mirror image of resistor networks
- Dark mode, 100% offline, no dependencies, no tracking

## Example

100 µF ∥ 100 µF ∥ 220 µF = 420 µF. The same three in series ≈ 40.7 µF — always below the smallest.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
