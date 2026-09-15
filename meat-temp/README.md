# Meat Temperature Guide

USDA **safe internal cooking temperatures** for poultry, beef, pork, fish and more — plus a **beef doneness guide** by temperature, in °F or °C. One offline HTML file, no signup, no tracking.

👉 **[Open Meat Temperature Guide](https://awictor.github.io/meat-temp/)**

## Quick reference
Whole cuts of beef/pork/lamb/veal: **145 °F (63 °C)** + 3-min rest · ground meats: **160 °F (71 °C)** · all poultry: **165 °F (74 °C)**.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`safeTempF`, `fToC`, `cToF`, `donenessFor`) are covered by headless tests — the USDA temps, unknown-food handling, F↔C conversions and round-trips, doneness band mapping and boundaries, monotonic ordering, table coverage, sane temp ranges, and validation. CI runs them on every push.

## Not medical advice
Follow local food-safety guidance.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
