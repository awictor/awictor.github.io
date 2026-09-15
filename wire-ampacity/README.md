# Wire Ampacity Calculator 🔌

Look up the **ampacity** (current rating) of copper wire by AWG gauge, check whether a gauge handles a load, and apply a derating factor.

**[Open the app →](https://awictor.github.io/wire-ampacity/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## Reference (copper, NEC 75 °C)

| AWG | Amps |
|---|---|
| 14 | 20 |
| 12 | 25 |
| 10 | 35 |
| 8 | 50 |
| 6 | 65 |

Lower gauge = thicker wire = more capacity. Real installs **derate** for bundling, ambient heat, and continuous loads (×0.8), and small circuits are breaker-limited (14→15 A, 12→20 A, 10→30 A). A reference, not a substitute for the NEC or a licensed electrician.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
