# Hull Speed Calculator ⛵

Estimate a displacement boat's **hull speed** from its waterline length, and check its **speed-length ratio** against an actual speed.

**[Open the app →](https://awictor.github.io/hull-speed/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

A displacement hull makes its own bow and stern waves. When the wave length matches the waterline, the boat has to climb its own bow wave — a soft speed limit:

```
V = 1.34 × √LWL     (LWL in feet, V in knots)
```

The **speed-length ratio** `V / √LWL` shows where a boat sits: below ~1.34 is easy displacement cruising; pushing past it costs disproportionate power until a light hull planes. Longer waterlines are simply faster.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
