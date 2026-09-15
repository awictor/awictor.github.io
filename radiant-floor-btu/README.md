# Radiant Floor Heat 🌡️

Estimate the heat output of a **radiant floor** from area and floor-to-room temperature difference, with a comfort-limited maximum. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/radiant-floor-btu/).

Enter the floor area, floor surface temperature, and room temperature. You get heat output, output per square foot, and the most heat the floor can deliver at the 85°F comfort cap.

## How it works

- A radiant floor gives off roughly 2 BTU/hr per square foot for each °F the floor sits above the room.
- Output = area × 2 × (floor temp − room temp).
- Comfort and flooring limits cap floor surface temperature near 85°F — that sets the most heat a floor can deliver.
- If your heat loss exceeds that cap, the floor alone can't keep up; add panel or baseboard for the shortfall.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
