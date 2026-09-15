# Chaptalization 🍷

How much **sugar to add to must** to reach a target potential alcohol, plus the potential ABV from your starting gravity. Single HTML file, fully offline, nothing leaves your device.

## Why

Underripe or low-sugar fruit ferments to weak wine. Chaptalization fixes that by adding sugar before fermentation — but overshoot your yeast's tolerance and it stalls sweet. This works out the exact grams from your gravity reading and target.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/chaptalization/
- Enter the **must volume**, **starting gravity**, and **target potential alcohol**.
- Read the sugar to add, your current potential alcohol, and the ABV to gain.

## How it works

- Potential alcohol from gravity: PA% ≈ (SG − 1) × 131.25.
- About 16.83 g of sugar per liter raises potential alcohol by 1% ABV.
- Sugar to add = volume × (target − current) × 16.83.
- Dissolve fully, re-check gravity before pitching, and stay within your yeast's alcohol tolerance. Some regions regulate or ban chaptalization.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
