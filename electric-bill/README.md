# Appliance Electricity Cost 🔌

Estimate what an appliance costs to run from its **wattage**, **hours of use**, and your **electricity rate** — daily, monthly, and yearly. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Energy per day (kWh) = watts × hours ÷ 1000; cost = kWh × rate.
- Daily, monthly (30-day), and annual (365-day) cost.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter watts, hours per day, and your $/kWh rate.

> Find wattage on the appliance label and your rate on your utility bill.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
