# EV Charging Time Calculator

Estimate **EV charging time** from battery size, charger power, and start/end charge level — plus the **energy added** and the **cost**.

**[Open the tool →](https://awictor.github.io/ev-charging/)**

- Energy = battery × (end − start) ÷ 100
- Time = energy ÷ (charger kW × efficiency)
- Charging cost at your per-kWh rate
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 60 kWh car from 20% to 80% adds 36 kWh — about 5h 43m on a 7 kW home charger at 90% efficiency, ~$5.40 at $0.15/kWh.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
