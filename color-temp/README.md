# ColorTemp

**Color temperature (Kelvin) → RGB** — convert a blackbody color temperature to an approximate sRGB/hex color, from warm candlelight to cool daylight, with a live swatch. One offline HTML file, no signup, no tracking.

👉 **[Open ColorTemp](https://awictor.github.io/color-temp/)**

## Features
- Kelvin → R/G/B and hex via the Tanner Helland approximation (~1000–40000K)
- Live swatch, temperature slider, and copy-ready hex
- Reference points (candle, incandescent, daylight, sky)
- Dark mode; 100% client-side

## Why
Photographers, lighting designers, and UI folks think in Kelvin (2700K warm, 6500K neutral, 10000K cool). ColorTemp turns a temperature into the color it produces, offline — handy for white-balance intuition and building warm/cool palettes. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`kelvinToRgb`, `toHex`) are covered by headless tests — channel range, ~6600K white, warm-reddish / cool-bluish behavior, the R=255 / B=255 plateaus, monotonic red and blue, range clamping, and hex output. CI runs them on every push.

## License
MIT © Alex Wictor
