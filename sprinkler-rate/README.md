# Sprinkler Precipitation Rate Calculator 💦

Find an irrigation zone's **precipitation rate** in inches per hour from its flow and area, and the **runtime** to apply a target amount of water.

**[Open the app →](https://awictor.github.io/sprinkler-rate/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
rate (in/hr) = 96.25 × GPM ÷ area(ft²)
runtime (min) = target inches ÷ rate × 60
```

Add up the flow of every head running at once and the area they cover. Lawns want ~1 inch/week, split into sessions. If the rate outpaces the soil's absorption (clay, slopes), **cycle and soak** to avoid runoff. Measure with catch cups for accuracy.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
