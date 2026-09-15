# Compost C:N Ratio Calculator ♻️

Blend **browns** (carbon-rich) and **greens** (nitrogen-rich) to the ideal carbon-to-nitrogen ratio for fast, odor-free composting. Shows the combined C:N, whether it's balanced, and the ideal green share to hit your target.

**[Open the app →](https://awictor.github.io/compost-ratio/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Compost microbes eat carbon for energy and nitrogen to build protein, and work fastest near a **C:N ratio of about 25–35:1**. Too much carbon and the pile stalls; too much nitrogen and it turns wet and smells of ammonia.

Assuming similar carbon content across materials, the combined ratio is the mass-weighted harmonic mean:

```
combined C:N = Σ mass ÷ Σ(mass ÷ ratio)
```

The ideal green share is the fraction of total mass that should be greens to land on your target:

```
green fraction = (1/target − 1/brownRatio) ÷ (1/greenRatio − 1/brownRatio)
```

Typical material ratios: dry leaves ~60, straw ~75, cardboard ~350, grass clippings ~15, food scraps ~15, manure ~15, coffee grounds ~20.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
