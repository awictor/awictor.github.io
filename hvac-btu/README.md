# AC BTU Calculator ❄️

Size a room air conditioner: find the **BTU (and tons)** you need from square footage, sun exposure, occupants, and whether it's a kitchen. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Base cooling load at 20 BTU/sq ft, the standard rule.
- Adjustments: ±10% for sun/shade, +600 BTU per occupant over two, +4,000 BTU for kitchens.
- Converts to tons (1 ton = 12,000 BTU/hr) for shopping.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter the room area and adjust the factors.

> Don't oversize — an AC that's too big short-cycles and won't dehumidify well. Size close to the number.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
