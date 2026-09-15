# Sauna Heater Size 🧖

Size a **sauna heater** in kilowatts from room dimensions, plus extra for glass and uninsulated surfaces. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/sauna-heater-kw/).

Enter the room length, width, and height, plus the square footage of any glass, tile, or exposed stone. You get the recommended heater kW.

## How it works

- A sauna heater needs roughly 1 kW per 50 cubic feet of room.
- Glass doors, tile, and exposed stone hold no insulation, so each square foot adds about 45 cubic feet of equivalent load.
- kW = (room volume + surface load) ÷ 50.
- Round up to the next stock heater, and match the heater's rock capacity to its size for steady heat.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
