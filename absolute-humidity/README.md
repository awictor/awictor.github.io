# Absolute Humidity Calculator

Calculate **absolute humidity** (grams of water vapor per cubic metre) from temperature and relative humidity, plus saturation vapor pressure.

**[Open the tool →](https://awictor.github.io/absolute-humidity/)**

- AH (g/m³) from °C and %RH via the Magnus equation
- Saturation vapor pressure (hPa)
- For humidors, greenhouses, drying, and conservation
- Dark mode, 100% offline, no dependencies, no tracking

## Example

20 °C at 50% RH → ~8.64 g/m³. The same 50% at 30 °C holds far more water.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
