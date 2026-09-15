# Duct Air Velocity 🌀

Find air **velocity** in a round or rectangular duct from airflow (CFM) and duct dimensions, with quiet-range guidance. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/duct-velocity/).

Enter the airflow, pick round or rectangular, and enter the duct size. You get the air velocity in fpm, the duct area, and whether it's in the quiet range.

## How it works

- Velocity (fpm) = airflow (CFM) ÷ duct cross-section area (sq ft).
- Round area = π × (diameter÷2)²; rectangular area = width × height — both converted from square inches by dividing by 144.
- Residential supply trunks run quietest around 700–900 fpm; branches lower, and over ~1200 fpm gets noisy.
- Too slow and you lose throw and mixing; too fast and it whistles — aim for the middle.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
