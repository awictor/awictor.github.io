# UnitConvert

**Unit converter** — convert length, mass, volume, and temperature between common metric and imperial units, live, with a swap button. One offline HTML file, no signup, no tracking.

👉 **[Open UnitConvert](https://awictor.github.io/unit-convert/)**

## Features
- **Length**: m, km, cm, mm, mi, yd, ft, in
- **Mass**: g, kg, mg, t, lb, oz, st
- **Volume**: L, mL, gal, qt, pt, cup, fl oz (US)
- **Temperature**: °C, °F, K
- Live result + swap; dark mode; remembers your last conversion
- 100% client-side; works offline

## Why
Recipes, travel, DIY, and science all need quick unit conversions. UnitConvert covers the common ones in one place, precisely and locally. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`convertFactor`, `convertTemp`, `convert`) are covered by headless regression tests against known values; CI runs them on every push.

## License
MIT © Alex Wictor
