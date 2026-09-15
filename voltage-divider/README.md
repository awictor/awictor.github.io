# Voltage Divider Calculator

A single-file, offline resistor **voltage divider** calculator. Get the output voltage, the divider current and power, and pick R2 for a target output.

**Live:** https://awictor.github.io/voltage-divider/

## Features

- **Vout** `= Vin · R2 / (R1 + R2)`
- **Current** and **power** through the divider
- **Pick R2** for a target output: `R2 = R1 · Vout / (Vin − Vout)`
- kΩ/MΩ, mA/µA, mW formatting
- Dark mode, 100% offline, zero dependencies

## Example

10 V with two 1 kΩ resistors → 5 V at 5 mA. A 5 V→3.3 V tap with R1 = 1 kΩ needs R2 ≈ 1.94 kΩ.

## Tests

```
node tests/selftest.mjs
```

10 checks including the R2-for-Vout inversion and a real level-shift example. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
