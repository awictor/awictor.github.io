# Octane Blend Calculator ⛽

Blend two fuels to find the resulting octane, or the mix ratio and volume of high-octane needed to hit a target — for cars, racing, and small engines.

**[Open the app →](https://awictor.github.io/octane-blend/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
blend  = (Vₐ·Oₐ + V_b·O_b) ÷ (Vₐ + V_b)     (volume-weighted)
ratio  = (target − low) ÷ (high − low)       (fraction high-octane)
volume = total × ratio
```

Half-and-half 87 and 93 gives 90. The target must sit between the two fuels' ratings — you can't blend below the lower or above the higher. Use the same rating scale (pump (R+M)/2) for both fuels.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
