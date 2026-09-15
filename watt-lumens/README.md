# Watt to Lumens Converter 💡

Convert **watts to lumens** (and back) by bulb type, and find the **LED wattage** that replaces an old incandescent. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Lumens = watts × efficacy, with presets for incandescent, halogen, CFL, and LED.
- Shows the incandescent-watt equivalent and a rough room-feel guide.
- Reminds you to shop by lumens, not watts.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter the power and pick the bulb type.

> Same lumens means same brightness, whatever the wattage. Check the bulb label for its exact rating.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
