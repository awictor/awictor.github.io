# Protein Intake 🍗

Your **daily protein target** from bodyweight and goal, in grams and per meal. Single HTML file, fully offline, nothing leaves your device.

## Why

Protein needs scale with bodyweight, not calories, and the RDA (0.8 g/kg) is a floor to avoid deficiency — not the amount that builds or preserves muscle. This turns your weight and goal into a concrete daily number and a sensible per-meal split.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/protein-intake/
- Enter your **bodyweight** (kg or lb).
- Pick a **goal** (RDA through cutting).
- Set **meals per day**.
- Read the daily target and grams per meal.

## How it works

- Protein (g) = bodyweight (kg) × goal factor: 0.8 RDA, 1.2 general, 1.6 build, 2.0 athlete, 2.2 cutting.
- 1.6–2.2 g/kg is the well-supported range for muscle; higher rarely adds benefit.
- Spread across 3–5 meals of 20–40 g to maximize muscle protein synthesis.
- Pounds convert to kg (÷ 2.205) first.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
