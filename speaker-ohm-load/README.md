# Speaker Impedance Calculator 🔊

Calculate the **total impedance** of speakers wired in series or parallel, and check it against your amplifier's minimum load. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Series (adds ohms) and parallel (lowers ohms) totals for any list of speakers.
- Amp-safe check against a minimum load.
- Handles mixed impedances, not just identical speakers.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter speaker impedances (comma-separated), pick wiring.

> Dropping below your amp's minimum load can overheat and damage it — wire series-parallel instead.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
