# Gelatin Calculator 🍮

Work out how much **gelatin** sets a given volume of liquid at a chosen firmness, with sheet and envelope equivalents. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/gelatin-ratio/).

Enter the liquid volume and pick a set firmness. You get the grams of powdered gelatin needed, plus sheet and US-envelope equivalents.

## How it works

- Roughly 2 g of powdered gelatin sets 100 ml for a standard jelly — about 1.5 g for a soft wobble and 3 g for a firm, sliceable set.
- One gelatin sheet weighs about 1.7 g, and one US envelope is about 7 g (2.5 tsp).
- Bloom powder in cold liquid or soak sheets in cold water, then dissolve in warm (not boiling) liquid.
- Fresh pineapple, kiwi, and papaya contain enzymes that stop gelatin setting — cook them first.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
