# Thermal Expansion Calculator

Compute how a material grows with temperature — **change in length, area, and volume** — from the linear expansion coefficient, original size, and temperature change. Material presets included.

**[Open the tool →](https://awictor.github.io/thermal-expansion/)**

- `ΔL = α·L₀·ΔT`, area `2α`, volume `3α`, plus the new length
- Presets: steel, aluminum, copper, glass, concrete
- Negative ΔT (cooling) gives contraction
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 10 m steel rod (α = 12×10⁻⁶/K) heated 50 K grows **6 mm** to 10.006 m.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
