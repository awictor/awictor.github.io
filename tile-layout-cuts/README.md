# Tile Layout 🧱

Work out how many **full tiles** fit across a run and the size of the edge cut, from tile size and grout gap. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/tile-layout-cuts/).

Enter the run length, tile size, and grout gap. You get the full tiles across the run, the edge cut width, and total tiles per row.

## How it works

- Each tile occupies its own width plus one grout gap — that repeating distance is the pitch.
- Full tiles = how many whole pitches fit in the run (allowing that the last tile needs no trailing grout).
- The edge cut is whatever's left over; a sliver at the edge looks bad, so shift the layout to balance both ends.
- If the cut is tiny, start with a half tile so both edges get a comfortable, matching piece.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
