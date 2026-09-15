# Color Steps

**Generate a palette between two colors.** Pick a start and end color and how many steps you want; get evenly-spaced swatches and a copyable hex list. Great for color scales, data-viz ramps, and discrete gradients. One offline HTML file, no signup, no tracking.

👉 **[Open Color Steps](https://awictor.github.io/color-steps/)**

## Features
- 2–20 interpolated steps (endpoints always included)
- Live swatches — tap any to copy; copy the whole list at once
- Color pickers + hex inputs; dark mode; 100% client-side

## Note
Interpolation is linear in sRGB — simple and predictable. For perceptually even ramps, adjust the endpoints or add steps (or use the CIELAB / OKLCH tools to check spacing).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `lerp`, `colorSteps`) are covered by headless tests — lerp, endpoint preservation, midpoints, length, red→blue, reversal symmetry, shorthand hex, valid output, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
