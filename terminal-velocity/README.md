# Terminal Velocity Calculator

Compute the **terminal velocity** of a falling object from its mass, cross-sectional area, drag coefficient, and air density — `v = √(2mg / ρACd)` — with m/s, km/h, and mph output.

**[Open the tool →](https://awictor.github.io/terminal-velocity/)**

- Derived from drag = weight at steady state
- Presets: belly-down / head-down skydiver, baseball
- Adjustable air density and gravity
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 75 kg belly-down skydiver (A = 0.7 m², Cd = 1.0) ≈ **41 m/s** in standard air.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
