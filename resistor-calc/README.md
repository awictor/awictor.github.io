# ResistorCalc

**Resistor color-code decoder** — pick the band colors and instantly see the resistance, tolerance, min/max range, and temperature coefficient. Works for 4, 5, and 6-band resistors. One offline HTML file, no signup, no tracking.

👉 **[Open ResistorCalc](https://awictor.github.io/resistor-calc/)**

## Features
- 4, 5 and 6-band decoding (digits, multiplier, tolerance, temperature coefficient)
- Live resistor drawing with the actual band colors
- Resistance in Ω / kΩ / MΩ / GΩ, plus the tolerance min/max range
- Dark mode; 100% client-side; keyboard-friendly dropdowns

## Why
Reading resistor bands off a strip by eye is slow and error-prone. ResistorCalc gives you the value the instant you set the colors, offline, on the bench or in the field. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`decode`, `formatOhms`, `analyze`) are covered by headless tests — canonical resistor values (1 kΩ, 4.7 kΩ, 5.6 kΩ, 10 kΩ), gold/silver fractional multipliers, 5/6-band handling, unit scaling, and rejection of bad band counts and invalid colors. CI runs them on every push.

## License
MIT © Alex Wictor
