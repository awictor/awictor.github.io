# Joist Count 🪵

Work out how many floor **joists** a run needs at a given on-center spacing, plus mid-span blocking rows. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/joist-count-floor/).

Enter the run length, on-center spacing, and joist span. You get the joist count, actual spacing, and blocking rows.

## How it works

- Joists = floor(run ÷ spacing) + 1, since the run needs one at each end plus the fill between.
- Actual spacing = run ÷ (joists − 1) — it lands at or under the target OC.
- Add a row of blocking or bridging roughly every 8 feet of span to stop joists from twisting.
- This counts field joists only — add rim or band joists around the perimeter separately.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
