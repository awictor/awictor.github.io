# Cloud Base Calculator

Estimate the base of **cumulus clouds** from surface temperature and dew point using the spread rule — in feet and meters AGL.

**[Open the tool →](https://awictor.github.io/cloud-base/)**

- Base ≈ (temp − dew point) ÷ 2.5 × 1000 ft
- Metric and Fahrenheit (÷4.4) variants
- Spread readout; feet and meters
- Dark mode, 100% offline, no dependencies, no tracking

## Example

25°C with a 10°C dew point → 15°C spread → cumulus base around 6,000 ft AGL (~1,829 m).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
