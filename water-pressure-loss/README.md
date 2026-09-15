# Water Pressure Loss 🔧

Estimate water **pressure loss** to pipe friction (Hazen-Williams) from flow, pipe size, run length, and pipe material. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/water-pressure-loss/).

Enter the flow rate, inside diameter, run length, and pipe material. You get the pressure lost over the run, head loss, and loss per 100 ft.

## How it works

- Uses the Hazen-Williams equation for water: head loss rises steeply with flow and falls fast as pipe diameter grows.
- The roughness coefficient C is about 150 for smooth PEX, copper, and PVC, and drops toward 100 for old galvanized steel.
- Head in feet converts to pressure at 0.433 psi per foot.
- Keep loss modest — many designers aim under about 8 psi total from the meter to the farthest fixture at peak flow.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
