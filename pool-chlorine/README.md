# Pool Chlorine Calculator

Calculate how much **chlorine product** to add to raise a pool by a target **ppm**, adjusted for the product's available-chlorine percentage.

**[Open the tool →](https://awictor.github.io/pool-chlorine/)**

- Pure chlorine grams = volume(L) × ppm ÷ 1000
- Adjusts for product strength (cal-hypo ~65%, dichlor ~56%)
- Litres or US gallons
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Raising a 10,000 L pool by 3 ppm needs 30 g of pure chlorine — about 46 g of 65% cal-hypo. Follow the product label.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
