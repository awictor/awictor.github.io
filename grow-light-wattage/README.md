# Grow Light Wattage 🌱

Size an LED **grow light** in watts from your canopy area and growth stage. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/grow-light-wattage/).

Enter the canopy length and width and pick a growth stage. You get the recommended actual LED wattage, canopy area, and watts per square foot.

## How it works

- Plan actual LED draw of about 15 W/sq ft for seedlings, 25 W/sq ft vegetative, and 40 W/sq ft for flowering or fruiting.
- Wattage = canopy area × the per-square-foot figure for your stage.
- These are real power draws — ignore inflated "equivalent" wattages on the box.
- Even coverage matters as much as total watts; a spread-out board beats one bright point.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
