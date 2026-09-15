# Coil Inductance Calculator

Calculate air-core **solenoid inductance** from diameter, length, and turns (Wheeler's formula), the **turns needed** for a target inductance, and **inductive reactance** at a frequency.

**[Open the tool →](https://awictor.github.io/coil-inductance/)**

- Wheeler: L(µH) = d²·N² / (18d + 40ℓ), inches
- Solve turns for a target inductance
- Inductive reactance Xₗ = 2π·f·L
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 1″ diameter, 2″ long coil of 40 turns is ~16.5 µH — about 735 Ω of reactance at 7.1 MHz.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
