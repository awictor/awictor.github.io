# Pole Length 🎿

Find your **ski pole and trekking pole length** from your height, with uphill and downhill adjustments. Single HTML file, fully offline, nothing leaves your device.

## Why

The right pole length keeps your elbow near 90° so your poling is efficient and your shoulders stay happy. The shop "flip test" works in person, but when you're buying online you just need the number — this gives it for alpine skiing and trekking, plus terrain adjustments.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/ski-pole/
- Enter your **height** in centimeters.
- Read the alpine ski pole length, the flat-ground trekking length, and the uphill/downhill range.

## How it works

- Ski poles ≈ height × 0.70, rounded to the nearest 5 cm (matches the elbow-90° flip test).
- Trekking poles ≈ height × 0.68 on flat ground.
- Uphill: shorten ~5–10 cm; downhill: lengthen ~5–10 cm.
- Starting points — adjustable poles let you fine-tune on the trail.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
