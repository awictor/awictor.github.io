# Tippet Calculator 🎣

Convert fly-fishing **tippet between X-size, diameter, and approximate pound test**, and get suggested fly sizes. Single HTML file, fully offline, nothing leaves your device.

## Why

The X system is quietly confusing: a bigger X number means *thinner* tippet, and pound test varies by material. This pins it down — diameter from the standard 0.011″ convention, an approximate breaking strength from the rule of 11, and a fly-size pairing so your rig balances.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/tippet-calc/
- Enter the **X-size** (0X–8X).
- Read the diameter (inches and mm), approximate pound test, and suggested fly sizes.

## How it works

- Diameter = (11 − X) ÷ 1000 inch: 0X is 0.011″, each X thinner by 0.001″.
- Rule of 11: X-size + breaking strength ≈ 11 for nylon (fluoro tests higher).
- Rule of 3/4: hook size ≈ 3–4 × the X-size, so a #16 fly pairs with 4X–5X.
- Diameter is the reliable spec; pound test is a guideline that varies by brand and material.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
