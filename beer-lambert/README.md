# Beer-Lambert Law

A single-file, offline spectrophotometry calculator. Compute **absorbance** `A = ε·c·l`, its **transmittance**, and back out **concentration** or path length from a measured absorbance.

**Live:** https://awictor.github.io/beer-lambert/

## Features

- **Absorbance** from molar absorptivity, concentration, and path length
- **Transmittance** and **%T** (`T = 10⁻ᴬ`)
- **Absorbance ↔ transmittance** conversion
- **Concentration** and **path length** solvers
- Dark mode, 100% offline, zero dependencies

## Reminder

A = 1 → 10% of light transmitted; A = 2 → 1%. Absorbance is linear in concentration, which is why a spectrophotometer reads concentration directly.

## Tests

```
node tests/selftest.mjs
```

10 checks including A↔T inversion, linearity, and concentration/path-length solvers. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
