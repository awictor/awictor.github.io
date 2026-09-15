# Priming Sugar 🍾

How much **dextrose to prime a beer batch** for bottle conditioning, from volume, target carbonation, and fermentation temperature. Single HTML file, fully offline, nothing leaves your device.

## Why

Bottle-conditioning fizz depends on more than "a cup of sugar" — the beer already holds residual CO₂ set by its warmest fermentation temperature, and you only prime the difference. Too much and you get gushers or bottle bombs. This does the temperature-aware math.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/priming-sugar/
- Enter the **batch volume**, **target CO₂ volumes**, and **highest fermentation temperature**.
- Read the dextrose to add, the residual CO₂, and the table-sugar equivalent.

## How it works

- Residual CO₂ comes from the warmest ferment temp (a standard fit); warmer = less residual.
- Dextrose yields ~4 g per liter per volume of CO₂; sugar needed = volume × (target − residual) × 4.
- Warmer fermentation needs more priming sugar to reach the same fizz.
- Table sugar is ~91% of the dextrose weight. Dissolve in boiled water, mix gently, then bottle.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
