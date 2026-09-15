# Roof Pitch Calculator

Convert roof **rise and run** into the pitch (x-in-12), the **angle** in degrees, the **slope factor** (multiply plan area to get true sloped area for ordering shingles), and the **rafter length**. One offline HTML file, no signup, no tracking.

👉 **[Open Roof Pitch](https://awictor.github.io/roof-pitch/)**

## The math
Pitch = rise ÷ run × 12. Angle = arctan(rise ÷ run). Slope factor = √(1 + (rise/run)²); rafter length = run × slope factor. A 12:12 roof is 45° with a slope factor ≈ 1.414.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`pitchRatio`, `pitchAngle`, `slopeFactor`, `rafterLength`, `angleToPitch`) are covered by headless tests — the pitch ratio, 45°/26.57° angles, slope factors, the 3-4-5 rafter, the flat-roof case, the angle↔pitch inverse, the run→rafter relationship, steepness monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
