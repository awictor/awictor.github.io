# Tire Pressure & Temperature Calculator

See how tire pressure changes with temperature using Gay-Lussac's law — adjust a cold PSI for a temperature swing (about **1 PSI per 10°F**).

**[Open the tool →](https://awictor.github.io/tire-pressure/)**

- Absolute-unit adjustment (gauge + 14.7 PSI, °F + 459.67)
- Pressure change and adjusted value in kPa
- Explains why the spec is a cold pressure
- Dark mode, 100% offline, no dependencies, no tracking

## Example

32 PSI set at 70°F reads about 28.4 PSI after dropping to 30°F — roughly a 3.6 PSI loss.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
