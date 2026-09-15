# CIELAB + ΔE

**Convert colors to CIELAB (L\*a\*b\*) and measure color difference (ΔE).** Enter a color to see its L\*a\*b\* values (D65), and compare any two colors with CIE76 ΔE — the perceptual distance between them. One offline HTML file, no signup, no tracking.

👉 **[Open CIELAB + ΔE](https://awictor.github.io/cielab/)**

## Why LAB / ΔE?
CIELAB is a perceptually oriented color space where equal distances roughly match equal perceived differences. **ΔE** quantifies that distance: ΔE ≈ 1 is the just-noticeable difference, so it's the standard for print/QA color matching and brand-color tolerance.

## Features
- HEX ↔ RGB ↔ CIELAB (D65 reference white)
- Two-color ΔE (CIE76) with a perceptibility label
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`rgbToLab`, `labToRgb`, `deltaE`, hex helpers) are covered by headless tests against known reference values — white/black, sRGB red/green/blue LAB coordinates, ΔE=0 for identical and ΔE=100 for black↔white, symmetry, and RGB→LAB→RGB round trips within ±1. CI runs them on every push.

## License
MIT © Alex Wictor
