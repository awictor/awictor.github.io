# Kinetic Energy & Momentum

A single-file, offline physics calculator for **kinetic energy** (½mv²) and **momentum** (mv), with inverse solvers for velocity and mass.

**Live:** https://awictor.github.io/kinetic-energy/

## Features

- **Kinetic energy** `KE = ½mv²` (J/kJ/MJ)
- **Momentum** `p = mv`
- **Solve** velocity from KE, or mass from KE (in the API)
- Shows the identity `KE = p²/(2m)`
- Dark mode, 100% offline, zero dependencies

## Key idea

KE depends on velocity *squared* — double the speed, quadruple the energy. A 1000 kg car at 20 m/s carries 200 kJ.

## Tests

```
node tests/selftest.mjs
```

10 checks including the v² scaling, inverse solvers, and the KE = p²/2m identity. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
