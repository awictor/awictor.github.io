# Schwarzschild Radius

A single-file, offline black-hole **event horizon** calculator. Enter a mass (in kilograms, Earth masses, or solar masses) to get the Schwarzschild radius `r = 2GM/c²`.

**Live:** https://awictor.github.io/schwarzschild-radius/

## Features

- **Schwarzschild radius** from any mass
- **Inverse** — mass required for a given radius (in the API)
- Unit-aware input (kg / Earth / solar masses) and readable output (mm → light-years)
- Preset chips: Earth, Sun, Sagittarius A*, a person
- Dark mode, 100% offline, zero dependencies

## Fun scale

The Sun compressed to a black hole would be ~2.95 km across; the Earth just ~8.9 mm.

## Tests

```
node tests/selftest.mjs
```

10 checks including the Sun/Earth radii, linear scaling, and mass↔radius inversion. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
