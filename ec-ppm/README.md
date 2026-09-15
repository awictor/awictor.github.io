# EC / PPM Converter 🌱

Convert hydroponic nutrient-solution strength between **EC (mS/cm) and PPM** on the 500 or 700 scale. Single HTML file, fully offline, nothing leaves your device.

## Why

"Feed at 800 ppm" is ambiguous — on which scale? A PPM meter just multiplies conductivity by a fixed factor, and the US 500 scale and European 700 scale disagree by 40%. Mix them up and you over- or under-feed. This shows the EC and both PPM readings side by side so a recipe always lands right.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/ec-ppm/
- Enter a **value** and whether it's EC or PPM.
- Pick the **PPM scale** your meter or recipe uses.
- Read the conversion, plus EC and PPM on both scales for reference.

## How it works

- PPM = EC × scale factor (500 or 700); EC = PPM ÷ scale.
- The same EC of 1.5 reads 750 ppm on a 500-scale meter but 1050 ppm on a 700-scale one.
- EC is the unambiguous measurement — quote it when you can, and match your meter's scale otherwise.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
