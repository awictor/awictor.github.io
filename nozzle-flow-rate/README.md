# Nozzle Flow Rate 🖨️

Find a 3D printer's **volumetric flow** from layer height, line width, and speed — and the max speed your hotend's flow limit allows. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/nozzle-flow-rate/).

Enter layer height, line width, print speed, and your hotend's max flow. You get the volumetric flow, the max speed at the flow limit, and a pass/fail.

## How it works

- Volumetric flow (mm³/s) = layer height × line width × print speed — that's how fast plastic must melt and extrude.
- Every hotend has a max flow (a stock unit ~10–15 mm³/s, high-flow ones 25+); exceed it and you get under-extrusion.
- Max speed = max flow ÷ (layer height × line width).
- Thicker layers and wider lines print faster in volume but cut your top speed at a given flow limit.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
