# Bolt Torque Calculator

Calculate bolt **tightening torque** from clamp force, diameter, and friction factor — or solve for **clamp force**. T = K·D·F.

**[Open the tool →](https://awictor.github.io/bolt-torque/)**

- Torque ↔ clamp force via the short-form torque–tension equation
- Friction factor K (~0.20 dry, ~0.15 lubricated)
- Diameter in mm, torque in N·m, force in N
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 10 mm bolt at K=0.20 for 10,000 N clamp needs ~20 N·m. Lubed (K=0.15) → ~15 N·m.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
