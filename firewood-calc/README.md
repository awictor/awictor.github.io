# Firewood Calculator

Measure a firewood stack and get the **volume, full cords, face cords** for your log length, and the total value at a price. One offline HTML file, no signup, no tracking.

👉 **[Open Firewood Calculator](https://awictor.github.io/firewood-calc/)**

## Cords vs face cords
A **full cord** is 4 × 4 × 8 ft = 128 ft³. A **face cord** (rick) is 4 ft high × 8 ft long, only as deep as the logs are long — so three face cords of 16-inch logs make one full cord.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`stackVolume`, `cords`, `faceCords`, `costOf`) are covered by headless tests — the volume product, the 4×4×8 = 1 cord identity, the /128 rule, the 3-and-2 face-cord relationships for 16"/24" logs, the face-cord formula, cost, volume scaling, shorter-logs-more-faces, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
