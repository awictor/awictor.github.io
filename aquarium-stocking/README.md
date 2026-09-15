# Aquarium Stocking Calculator 🐠

Estimate how much fish a tank can hold with the inch-per-gallon guideline: total capacity, current stocking %, and inches remaining.

**[Open the app →](https://awictor.github.io/aquarium-stocking/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
capacity  = gallons × inches per gallon
stocked % = fish inches ÷ capacity × 100
remaining = capacity − fish inches
```

The **1 inch per gallon** rule is a rough sanity check for small community fish. Use each fish's *full adult* size, drop to ~½ inch/gallon for wide-bodied fish (goldfish, cichlids), and remember filtration, surface area, and bioload are what really set the limit.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
