# Gutter Slope 💧

Find the total **drop** a gutter run needs to drain and how many downspouts it takes, from run length. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/gutter-slope/).

Enter the gutter run length, slope (in per 10 ft), and max run per downspout. You get the total drop, downspouts needed, and drop per 10 ft.

## How it works

- Gutters need a slight slope toward the downspout — about 1/4 inch per 10 feet.
- Total drop = run length ÷ 10 × the slope; a 40 ft run drops about an inch end to end.
- Add a downspout at least every 35 feet; long runs slope down from a high point in the middle to a downspout at each end.
- Too little slope pools water and breeds algae; too much looks crooked against the fascia.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
