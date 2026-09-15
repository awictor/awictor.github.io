# DLI Calculator 🌿

Convert grow-light **PPFD and photoperiod into Daily Light Integral (DLI)**, with a crop-suitability guide. Single HTML file, fully offline, nothing leaves your device.

## Why

PPFD tells you how bright the light is *right now*; DLI tells you how much light a plant actually gets over the day — and that's what drives growth. Dialing intensity against hours to hit a crop's DLI target is the core of indoor growing, and this does the mol/m²/day math for you.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/dli-calc/
- Enter the **PPFD** (µmol/m²/s) measured at canopy height.
- Enter the **photoperiod** in hours.
- Read the DLI, a crop-suitability band, and the PPFD you'd need to hit a 30-DLI target.

## How it works

- DLI = PPFD × hours × 3600 ÷ 1,000,000 mol/m²/day.
- Rough targets: leafy greens 12–17, houseplants 10–20, fruiting crops 20–30, flowering 30–45.
- Too little means leggy growth; too much wastes energy and can bleach leaves — trade intensity against hours.
- Measure PPFD with a quantum meter at canopy height; it falls off fast with distance from the fixture.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
