# Engine Displacement Calculator

Calculate total **engine displacement** from bore, stroke, and cylinder count — in cc, liters, and cubic inches.

**[Open the tool →](https://awictor.github.io/engine-displacement/)**

- Displacement in cc, L, and cubic inches at once
- Swept volume = π/4 × bore² × stroke × cylinders
- Metric inputs (mm), guards for invalid geometry
- Dark mode, 100% offline, no dependencies, no tracking

## Example

101.6 mm bore × 88.4 mm stroke × 8 cylinders ≈ 5.7 L (350 ci) — a classic small-block V8.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
