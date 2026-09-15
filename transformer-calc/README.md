# Transformer Calculator

Calculate an ideal transformer's **turns ratio**, **secondary voltage and current**, and **impedance ratio** from primary and secondary turns.

**[Open the tool →](https://awictor.github.io/transformer-calc/)**

- Turns ratio and impedance ratio (turns ratio squared)
- Secondary voltage (Vₛ = Vₚ·Nₛ/Nₚ) and current (Iₛ = Iₚ·Nₚ/Nₛ)
- Power conserved in the ideal case
- Dark mode, 100% offline, no dependencies, no tracking

## Example

100:50 turns on 120 V, 1 A → 2:1 ratio, 60 V / 2 A secondary, 4:1 impedance. Assumes an ideal transformer (no losses).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
