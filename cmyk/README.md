# CMYK Converter

**Convert colors between HEX/RGB and CMYK for print design.** Edit any field — HEX, RGB, or CMYK — and the others update live, with a swatch, color picker, and total ink coverage. One offline HTML file, no signup, no tracking.

👉 **[Open CMYK Converter](https://awictor.github.io/cmyk/)**

## Features
- HEX ↔ RGB ↔ CMYK, all synced
- Color picker + one-tap copy per format
- Total ink coverage (C+M+Y+K) with a press-limit warning (>300%)
- Dark mode; 100% client-side

## Note on accuracy
This uses the standard device-independent (naive) RGB↔CMYK conversion. Real print output depends on your printer, inks, and ICC profile — always proof with your print provider for critical work.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hexToRgb`, `rgbToHex`, `rgbToCmyk`, `cmykToRgb`, `totalInk`) are covered by headless tests — white/black/primary conversions, the mid-gray K-only case, RGB→CMYK→RGB round trips, and ink-coverage totals. CI runs them on every push.

## License
MIT © Alex Wictor
