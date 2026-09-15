# Lerp & Remap

Linear interpolation and range mapping — **lerp**, **inverse lerp**, **remap** a value from one range to another, and **clamp**. The everyday math of graphics, game dev, animation curves, and data normalization.

**[Open the tool →](https://awictor.github.io/lerp/)**

- `lerp(a, b, t) = a + (b − a)·t`
- `inverseLerp`, `remap`, `remapClamped`, `clamp`
- Extrapolates outside [0, 1]; clamped variant stays in bounds
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

`lerp(10, 20, 0.25) = 12.5` · `remap(37, 0, 100, 32, 212) = 98.6` (°C → °F) · `remap(15, 0, 10, 0, 100) = 150` (extrapolated).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
