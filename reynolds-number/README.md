# Reynolds Number Calculator

A single-file, offline fluid-dynamics calculator. Compute the Reynolds number from density, velocity, length, and viscosity — and classify the flow as laminar, transitional, or turbulent.

**Live:** https://awictor.github.io/reynolds-number/

## Features

- **Re = ρvL/μ** (dynamic) and **Re = vL/ν** (kinematic)
- **Flow regime**: laminar (<2300), transitional (2300–4000), turbulent (>4000)
- Colour-coded result
- Dark mode, 100% offline, zero dependencies

## Example

Water at 2 m/s through a 5 cm pipe → Re = 100,000 → turbulent.

## Tests

```
node tests/selftest.mjs
```

10 checks including dynamic/kinematic agreement, regime boundaries, and scaling. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
