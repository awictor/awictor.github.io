# Pottery Shrinkage Calculator 🏺

Work with clay shrinkage: the fired size from a wet size, the wet size to hit a fired target, and the shrinkage rate from a test tile.

**[Open the app →](https://awictor.github.io/pottery-shrinkage/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
fired = wet × (1 − rate/100)
wet   = target ÷ (1 − rate/100)
rate  = (wet − fired) ÷ wet × 100
```

Clay shrinks **8–15%** as it dries and fires, depending on the body and temperature. To finish at a specific size you must build it bigger. Find your own rate from a test tile — mark a known length wet, fire it, and measure. Test every new clay + glaze + firing combination.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
