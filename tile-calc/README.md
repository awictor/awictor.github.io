# Tile Calculator

**How many tiles and boxes you need** for a floor or wall. Enter the area and tile size, add a waste allowance, and get the tile count and number of boxes to buy. Imperial or metric. One offline HTML file, no signup, no tracking.

👉 **[Open Tile Calculator](https://awictor.github.io/tile-calc/)**

## Features
- Tiles = area ÷ tile area × (1 + waste), rounded up
- Boxes rounded up from tiles
- Imperial (inches / ft²) or metric (cm / m²)
- Dark mode; 100% client-side

## Tips
Use ~10% waste for straight layouts, 15–20% for diagonal or patterned installs. Pairs well with the [Paint Calculator](https://awictor.github.io/paint-calc/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`tileAreaSqft`, `tileAreaM2`, `roomArea`, `tilesNeeded`, `boxesNeeded`) are covered by headless tests — area conversions, tile counts with/without waste, round-up behavior, box counts, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
