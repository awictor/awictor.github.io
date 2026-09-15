# GoldenRatio

**Divine proportion calculator** — split any length into golden-ratio parts, scale a value up or down by φ, preview a golden rectangle, and generate a φ sequence for layout and typography. One offline HTML file, no signup, no tracking.

👉 **[Open GoldenRatio](https://awictor.github.io/golden-ratio/)**

## Features
- **Split** a total length into its larger/smaller golden parts (major/minor = φ), with a visual bar and golden rectangle
- **Scale** a value ×φ and ÷φ, plus a six-step φ sequence
- **isGolden** check for whether two lengths are in the golden ratio
- Dark mode; 100% client-side

## Why
φ = (1 + √5) / 2 ≈ 1.618 shows up everywhere in design, architecture, and type. GoldenRatio does the arithmetic — splits, scales, rectangles, and sequences — offline, so you can proportion a layout in seconds. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`goldenSplit`, `goldenLarger`, `goldenSmaller`, `isGolden`, `goldenSequence`) are covered by headless tests — the φ² = φ + 1 identity, split-sum and ratio, scale round-trips, order-independent golden detection, sequence growth, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
