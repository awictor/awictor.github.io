# Pond Liner Size 🪷

Work out the flexible **liner size** for a garden pond from its length, width, depth, and overlap. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/pond-liner-size/).

Enter the pond length, width, max depth, and overlap per edge. You get the liner dimensions to buy and the liner area.

## How it works

- The liner has to drop down one wall, across the bottom, and up the other — so each side adds twice the depth.
- Liner length = pond length + 2 × depth + 2 × overlap; width is the same with pond width.
- Leave about 1–2 ft of overlap per edge to anchor the liner under stone or soil.
- Add underlayment beneath the liner to protect it from roots and sharp stones.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
