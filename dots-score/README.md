# DOTS Score 🏋️

Compute your **DOTS score** to compare powerlifting totals fairly across bodyweights — the modern replacement for Wilks. Single HTML file, fully offline, nothing leaves your device.

## Why

A 600 kg total means something very different at 60 kg vs 120 kg bodyweight. DOTS normalizes for that so lifters of any size can be ranked on one scale — which is why most federations switched to it. This applies the current DOTS coefficients.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/dots-score/
- Enter your **competition total** (kg) and **bodyweight** (kg).
- Pick the **men's or women's** coefficient set.
- Read the DOTS score, the coefficient, and a level label.

## How it works

- DOTS = total × 500 ÷ (a + b·bw + c·bw² + d·bw³ + e·bw⁴), with sex-specific coefficients.
- Lighter lifters get a higher coefficient, offsetting the raw-weight advantage of heavier lifters.
- Rough guide: ~300 solid, ~400 strong, ~500 elite, ~600 world-class.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
