# Density Altitude Calculator

Calculate **density altitude** from field elevation, altimeter setting, and temperature — plus **pressure altitude** and **ISA deviation**. The number that governs aircraft performance on hot and high days.

**[Open the tool →](https://awictor.github.io/density-altitude/)**

- Pressure altitude = elevation + (29.92 − setting) × 1000
- ISA temp drops ~2°C per 1000 ft; +120 ft DA per °C above standard
- ISA deviation readout
- Dark mode, 100% offline, no dependencies, no tracking

## Example

5,000 ft field, 29.92 inHg, 25°C → pressure altitude 5,000 ft, density altitude ~7,140 ft.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
