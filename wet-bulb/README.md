# Wet-Bulb Temperature Calculator

Calculate **wet-bulb temperature** from air temperature and relative humidity using Stull's formula, with a heat-stress risk band.

**[Open the tool →](https://awictor.github.io/wet-bulb/)**

- Stull (2011) empirical wet-bulb, accurate to a few tenths of a degree
- Celsius or Fahrenheit
- Heat-stress bands: Low / Caution / Danger / Extreme (35 °C = survivability limit)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

30 °C at 50% RH → ~22.3 °C wet-bulb. Sweat can only cool you to the wet-bulb temperature.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
