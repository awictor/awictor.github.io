# Solar Panel Tilt ☀️

Find the best fixed **tilt angle** for solar panels from your latitude, plus summer and winter adjustments. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/solar-tilt-angle/).

Enter your latitude. You get the year-round fixed tilt plus flatter-summer and steeper-winter angles.

## How it works

- A fixed panel does best tilted roughly at your latitude, facing the equator (south in the north, north in the south).
- For a seasonal boost, tilt 15° flatter in summer and 15° steeper in winter to track the sun's height.
- Tilt is measured from horizontal, so it stays between 0° (flat) and 90° (vertical).
- Getting the tilt within a few degrees is plenty — orientation and shade matter more than perfect angle.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
