# Op-Amp Gain Calculator

Calculate op-amp **gain** for inverting and non-inverting amplifiers from the feedback and input resistors, the gain in **decibels**, and the **output voltage**.

**[Open the tool →](https://awictor.github.io/opamp-gain/)**

- Non-inverting: 1 + Rf/Rin
- Inverting: −Rf/Rin
- Gain in dB (20·log₁₀|gain|) and output voltage
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Rf = 10 kΩ, Rin = 1 kΩ → non-inverting gain 11 (20.8 dB); inverting gain −10 (20 dB). A 0.5 V input gives −5 V out inverting.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
