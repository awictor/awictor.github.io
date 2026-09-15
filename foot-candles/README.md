# Room Lighting Calculator 🔆

Work out the **lumens** and **number of fixtures** a room needs for a target light level in foot-candles, with lux conversion. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Lumens needed = area × target foot-candles, with room-type presets.
- Fixture count from lumens per bulb (rounds up).
- Foot-candle ↔ lux conversion.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Pick a room type and enter area and lumens per fixture.

> Layer ambient, task, and accent lighting rather than relying on one big source.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
