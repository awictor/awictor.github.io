# ABV Calculator

A single-file, offline **alcohol-by-volume** calculator for homebrewers. Enter original and final gravity to get ABV (simple and standard formulas), apparent attenuation, and both gravities in °Plato.

**Live:** https://awictor.github.io/abv-calc/

## Features

- **Simple ABV** — `(OG − FG) × 131.25`
- **Standard ABV** — higher-accuracy formula for stronger brews
- **Apparent attenuation** — `(OG − FG)/(OG − 1)`, how much sugar the yeast fermented
- **SG → °Plato** conversion (cubic approximation)
- Dark mode, 100% offline, zero dependencies

## Example

OG 1.050, FG 1.010 → ~5.34% ABV, 80% attenuation.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions with known brewing vectors (water = 0 °P, 1.040 ≈ 10 °P). No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
