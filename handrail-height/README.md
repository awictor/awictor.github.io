# Railing Baluster Spacing 🪜

Work out how many **balusters** a railing needs to keep gaps under 4 inches, plus the code handrail height range. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/handrail-height/).

Enter the railing run, baluster width, and max gap. You get the balusters needed, the actual gap, and the handrail height range.

## How it works

- Codes bar a 4-inch sphere from passing between balusters, so every gap must stay under 4″.
- Balusters = ceil((run − max gap) ÷ (baluster width + max gap)); more balusters shrink each gap.
- Actual gap = (run − total baluster width) ÷ (number of gaps) — verify it's at or under the limit.
- Graspable handrails sit 34–38 inches above the stair nosing; guards on landings are typically taller.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
