# Attic Ventilation Calculator 🌬️

Calculate the **net free vent area** your attic needs (1/150 or 1/300 rule) and the **intake/exhaust split**. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- NFA required by the standard 1/150 rule, or 1/300 with a balanced system and vapor barrier.
- 50/50 intake (soffit) and exhaust (ridge) split.
- Output in square inches and square feet.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter attic floor area and pick the rule.

> Use each vent's rated net free area — it's less than the opening size.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
