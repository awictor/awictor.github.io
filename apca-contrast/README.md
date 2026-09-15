# APCA Contrast

**Perceptual text-contrast checker** using APCA — the Accessible Perceptual Contrast Algorithm proposed for WCAG 3. Enter a text and background color, get the signed **Lc** value plus font-size guidance. One offline HTML file, no signup, no tracking.

👉 **[Open APCA Contrast](https://awictor.github.io/apca-contrast/)**

## Why APCA over the WCAG 2 ratio?
The WCAG 2 contrast *ratio* (1–21) treats dark-on-light and light-on-dark identically and maps poorly to real readability. APCA returns a signed **Lc** (−108…+106) that accounts for text polarity, soft black clamping, and human lightness perception — the basis of WCAG 3 draft guidance.

## Features
- Signed Lc value + tier (Best / Good / OK / Large only / Minimum / Faint / Invisible)
- Font-size lookup guidance (Lc 90/75/60/45/30 thresholds)
- Live color pickers + hex inputs, swap button, live preview
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `sRGBtoY`, `apcaContrast`, `apcaLevel`) are covered by headless tests: the sRGB→Y transfer, the reference black-on-white (+106) and white-on-black (−108) values, APCA's polarity asymmetry, identical-color and low-contrast clipping, monotonicity, and tier boundaries. CI runs them on every push.

## Not legal advice
APCA is a draft algorithm; conformance thresholds are still evolving. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
