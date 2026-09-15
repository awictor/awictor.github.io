# Salt Spreader Rate 🧂

Work out how much **ice-melt or fertilizer** to spread over an area at a target rate, and how many bags to buy. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/salt-spreader-rate/).

Enter the area, application rate (lb per 1000 sq ft), and bag weight. You get the product to spread, bags to buy, and coverage per bag.

## How it works

- Product = area ÷ 1000 × the rate in pounds per 1000 sq ft — the standard way lawn and ice-melt rates are given.
- Bags = ceil(pounds ÷ bag weight); one bag covers bag weight ÷ rate × 1000 sq ft.
- Ice melt runs roughly 2–4 lb per 1000 sq ft; more just wastes product and harms plants.
- Make two light passes at right angles for even coverage instead of one heavy pass.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
