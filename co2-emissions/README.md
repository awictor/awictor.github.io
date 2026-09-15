# CO₂ Emissions Calculator

Estimate your **carbon footprint**: CO₂ from driving, flying, and electricity — plus the **trees** it takes to offset it.

**[Open the tool →](https://awictor.github.io/co2-emissions/)**

- Driving = miles ÷ MPG × 8.887 kg/gal
- Flying ≈ 0.15 kg per passenger-mile
- Electricity = kWh × your grid factor
- Trees to offset (≈21 kg CO₂/tree/year)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

250 mi at 25 MPG ≈ 89 kg; a 1,000 mi flight ≈ 150 kg; 200 kWh at 0.4 kg/kWh = 80 kg → ~15 trees to offset.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
