# LED Strip Power Supply 💡

Size the **power supply** for an LED strip run from watts per foot and length, with headroom, in watts and amps. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Strip draw = length × watts-per-foot, plus a headroom factor.
- Supply amps by strip voltage (5 / 12 / 24 V).
- Reminds you about power injection for long 12 V runs.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter length, watts per foot, voltage, and headroom.

> Pick a supply rated at or above this — running one flat-out shortens its life.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
