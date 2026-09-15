# 3D Print Cost Calculator

Estimate a 3D print's cost: **filament** cost from grams and spool price, **electricity** from print time and printer wattage, the **total**, and the **filament length** used.

**[Open the tool →](https://awictor.github.io/print-cost/)**

- Filament cost = grams × (spool price ÷ spool weight)
- Electricity = hours × watts ÷ 1000 × rate
- Filament length from mass, density, and diameter
- Dark mode, 100% offline, no dependencies, no tracking

## Example

50 g off a $25/1 kg spool + 10 h at 200 W and $0.15/kWh = $1.55. That 1 kg spool holds ~335 m of 1.75 mm PLA.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
