# Charcoal Amount 🔥

Work out how many charcoal **briquettes** to light from grill grate size and target heat level. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/grill-charcoal-amount/).

Enter your grill grate diameter and target heat. You get the number of briquettes to light, grate area, and a rough weight.

## How it works

- Charcoal need scales with grate area = π × (diameter÷2)².
- Briquettes per square inch run about 0.08 low, 0.15 medium, and 0.25 high.
- A standard 22.5″ kettle takes roughly 30 for low, 60 for medium, and 100 for high heat.
- A typical briquette weighs about 1 oz, so 16 briquettes is roughly a pound.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
