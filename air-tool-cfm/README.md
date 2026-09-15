# Air Tool CFM 💨

Size an **air compressor** from your air tools' CFM demand and a duty-cycle safety factor. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Add up CFM for the tools you run at once, with a checklist of common tools.
- Safety-factor margin (~1.5×) so the pump keeps up.
- Rated at 90 psi, the standard comparison pressure.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Check the tools you'll run simultaneously and set a safety factor.

> CFM, not PSI, sizes a compressor. A bigger tank only buys short bursts.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
