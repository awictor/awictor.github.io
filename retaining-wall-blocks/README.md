# Retaining Wall Blocks 🏗️

Work out how many **blocks** a retaining wall needs from wall length and height and block dimensions, including a cap course. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/retaining-wall-blocks/).

Enter the wall length and height and the block length and height. You get total wall blocks, courses high, and blocks per course plus a cap.

## How it works

- Courses = ceil(wall height ÷ block height); blocks per course = ceil(wall length ÷ block length).
- Total wall blocks = courses × blocks per course; add one cap course on top.
- Bury the bottom course about 10% of the wall height for a stable base, and step it back into the slope.
- Walls over ~3–4 feet usually need geogrid and an engineer — check local code.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
