# Roof Squares 🔺

Turn a roof footprint and pitch into roofing **squares** and shingle bundles, with a waste allowance. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/roof-square-count/).

Enter the ground footprint area, roof pitch (rise per 12), and waste allowance. You get roofing squares, actual roof area, and shingle bundles.

## How it works

- Pitched roof area is bigger than its footprint by the pitch multiplier = √(rise² + 12²) ÷ 12.
- One roofing square is 100 sq ft; squares = roof area ÷ 100, then add a waste allowance (about 10%).
- Standard 3-tab and architectural shingles run about 3 bundles per square.
- Measure the footprint from the ground and let the pitch multiplier account for the slope you can't easily reach.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
