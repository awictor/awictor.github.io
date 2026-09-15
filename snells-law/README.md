# Snell's Law

A single-file, offline optics calculator. Compute the refraction angle from Snell's law `n₁·sinθ₁ = n₂·sinθ₂`, the critical angle for total internal reflection, and detect TIR.

**Live:** https://awictor.github.io/snells-law/

## Features

- **Refraction angle** θ₂ from indices and incidence angle
- **Critical angle** `θc = arcsin(n₂/n₁)` (when n₁ > n₂)
- **Total internal reflection** detection
- Preset refractive indices (air, water, ice, glass, diamond)
- Dark mode, 100% offline, zero dependencies

## Example

Air → water at 30° refracts to ~22.08°. Water → air has a critical angle of ~48.75°.

## Tests

```
node tests/selftest.mjs
```

10 checks including reversibility, TIR, and the water/air critical angle. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
