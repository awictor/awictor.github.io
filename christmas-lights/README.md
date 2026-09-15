# Christmas Light Calculator 🎄

Estimate how many string lights a Christmas tree or garland needs from its size, and the number of strands to buy.

**[Open the app →](https://awictor.github.io/christmas-lights/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
lights  = tree height × lights per foot
strands = ceil(lights ÷ lights per strand)
```

The classic rule is **~100 lights per foot** of tree height (150–200 for a fuller look). Taller trees are also wider, so the count grows fast. Watch each string's **max connected sets** rating so you don't overload a run. Garland/eaves: ~100 lights per 3–4 ft.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
