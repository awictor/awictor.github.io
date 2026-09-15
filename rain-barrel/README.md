# Rainwater Harvest Calculator

Estimate how much **rainwater you can collect from a roof** — gallons (sq ft / inches) or liters (m² / mm), scaled by a collection-efficiency factor. For gardeners and homesteaders. One offline HTML file, no signup, no tracking.

👉 **[Open Rainwater Harvest](https://awictor.github.io/rain-barrel/)**

## The math
One inch of rain on one square foot ≈ **0.623 gallons**; one millimetre on one square metre = exactly **one litre**. Multiply by area and rainfall, then by efficiency (~85–90% after losses). Use the roof footprint, not the sloped area.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`harvestGallons`, `harvestLiters`) are covered by headless tests — the 0.623 factor, the metric 1 mm×1 m²=1 L identity, efficiency scaling, area/rainfall linearity, zero cases, imperial↔metric agreement, the default efficiency, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
