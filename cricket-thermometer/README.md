# Cricket Chirp Thermometer

Estimate the **temperature** from how fast a cricket chirps, using **Dolbear's law**, in Celsius and Fahrenheit.

**[Open the tool →](https://awictor.github.io/cricket-thermometer/)**

- °F = 50 + (chirps/min − 40) / 4
- Field trick: count chirps in 15 s and add 40
- °C and °F output
- Dark mode, 100% offline, no dependencies, no tracking

## Example

30 chirps in 15 seconds → ~70 °F (~21 °C).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
