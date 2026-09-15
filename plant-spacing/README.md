# Plant Spacing Calculator

Work out how many plants fit a garden bed at a given spacing — square grid or space-saving triangular layout — plus square-foot-gardening counts.

**[Open the tool →](https://awictor.github.io/plant-spacing/)**

- Square grid: floor(width/spacing) × floor(length/spacing)
- Triangular (offset) rows fit ~15% more
- Square-foot-gardening plants per 12″ square
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 48″ × 96″ bed at 12″ spacing holds 32 plants in a grid. At 3″ spacing, square-foot gardening puts 16 in each square.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
