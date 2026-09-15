# Speaker Crossover 🔊

Compute the **capacitor and inductor for a first-order (6 dB/octave) passive speaker crossover** from the crossover frequency and driver impedance. Single HTML file, fully offline, nothing leaves your device.

## Why

A first-order crossover is the simplest way to split a signal between a woofer and tweeter — one capacitor, one inductor — and the go-to for DIY and repair. The reactance formulas are quick but easy to fumble in µF/mH; this gives you buildable component values instantly.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/speaker-crossover/
- Enter the **crossover frequency** and the **driver impedance**.
- Read the high-pass capacitor (series with the tweeter) and low-pass inductor (series with the woofer).

## How it works

- At the crossover frequency each part's reactance equals the driver impedance: C = 1/(2πfR), L = R/(2πf).
- A 2.5 kHz crossover into 8 Ω wants about 8 µF and 0.5 mH.
- First-order rolls off gently at 6 dB/octave with minimal phase shift — simple, but limited driver protection near the crossover.
- Use the driver's impedance *at the crossover frequency* (often above nominal); a Zobel network can flatten a rising impedance first.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
