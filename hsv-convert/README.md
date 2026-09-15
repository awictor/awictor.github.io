# HSV / HSB Color Converter

**Convert colors between HEX/RGB and HSV/HSB** — hue, saturation, and value/brightness, the model behind Photoshop, GIMP, and Figma color pickers. Edit any field and the others update live. One offline HTML file, no signup, no tracking.

👉 **[Open HSV / HSB Converter](https://awictor.github.io/hsv-convert/)**

## HSV vs HSL
HSV (a.k.a. HSB) differs from CSS's HSL: full value + full saturation gives a vivid pure hue, and lowering value darkens toward black. Hue is 0–360°; saturation and value are 0–100%.

## Features
- HEX ↔ RGB ↔ HSV, all synced
- Color picker, live swatch, one-tap copy per format
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `rgbToHsv`, `hsvToRgb`) are covered by headless tests — primary/secondary colors, white/black/gray, inversion of primaries, RGB→HSV→RGB round trips, hue wrapping and S/V clamping, and the value-darkening behavior. CI runs them on every push.

## License
MIT © Alex Wictor
