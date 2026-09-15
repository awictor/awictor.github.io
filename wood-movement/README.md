# Wood Movement 🪚

Estimate how much a board **expands or shrinks across the grain** with seasonal moisture change — by species and cut. Single HTML file, fully offline, nothing leaves your device.

## Why

Wood is never done moving. Ignore it and tabletops crack, panels split, and drawers jam every winter. The fix is to *design* for the movement — but first you need to know how much a given board will actually move. This applies the Wood Handbook coefficients so you can size a gap or a slotted screw hole with confidence.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/wood-movement/
- Enter the **board width** across the grain.
- Pick the **species** and the **cut** (flatsawn vs. quartersawn).
- Enter the **moisture-content swing** in percentage points (about 6% is typical indoors).
- Read the expected width change, the coefficient, and what quartersawn would give.

## How it works

- Change = width × dimensional-change coefficient × ΔMC (in % points).
- Flatsawn (tangential) moves roughly twice as much as quartersawn (radial) — why quartersawn is prized for stable panels.
- Coefficients are USDA Wood Handbook averages per 1% moisture change.
- Design around it: breadboard ends, floating panels, elongated screw holes, board gaps.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
