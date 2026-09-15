# Beam Deflection Calculator

Calculate the **maximum deflection** of a beam: simply supported under a central point load or a uniform load, or a cantilever under an end load — plus the moment of inertia of a rectangular section.

**[Open the tool →](https://awictor.github.io/beam-deflection/)**

- Simply supported point load: δ = PL³/48EI
- Simply supported uniform load: δ = 5wL⁴/384EI
- Cantilever end load: δ = PL³/3EI
- Rectangular moment of inertia: bh³/12
- Dark mode, 100% offline, no dependencies, no tracking

Keep force, length, E, and I in consistent units.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
