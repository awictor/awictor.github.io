# Dog Food Portion 🐕

Estimate how much to feed your dog each day from its **weight** and **activity level**, in calories and cups. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Vet-style formula: RER = 70 × (kg)^0.75, times an activity multiplier.
- Daily calories, cups per day (from your food's kcal/cup), and resting need.
- Pounds or kilograms; life-stage presets.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter weight, pick activity, and the food's kcal per cup.

> A starting estimate — adjust to keep your dog at a healthy weight, and consult your vet for medical cases.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
