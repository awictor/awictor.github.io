# Water Heater Recovery Time ♨️

Estimate how long a **water heater takes to reheat** from tank size, temperature rise, and its wattage or BTU input. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Energy = gallons × 8.34 × °F rise; time = energy ÷ (input × efficiency).
- Electric (watts, ~98%) and gas (BTU/hr, ~78%) modes.
- Shows energy needed and effective input.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter tank size, temperature rise, and power.

> Temperature rise is your target minus the incoming cold-water temp — higher in winter.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
