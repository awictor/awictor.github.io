# LM317 Calculator

Design an LM317 regulator: **output voltage** from R1 and R2, the **R2** needed for a target voltage, a **constant-current** set resistor, and **power dissipation**.

**[Open the tool →](https://awictor.github.io/lm317-calc/)**

- Vout = 1.25 × (1 + R2/R1)
- Solve R2 for a target voltage
- Constant-current mode: I = 1.25 / R
- Power dissipation = (Vin − Vout) × I
- Dark mode, 100% offline, no dependencies, no tracking

## Example

R1 = 240 Ω, R2 = 720 Ω → 5 V out. At 12 V in and 0.5 A load the regulator dissipates 3.5 W.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
