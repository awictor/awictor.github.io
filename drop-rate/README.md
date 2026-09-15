# Drop Rate Calculator 🎰

Work out the chance of getting a drop **at least once** over N attempts, the attempts needed for a target chance, and the average tries — for gacha, loot, and RNG.

**[Open the app →](https://awictor.github.io/drop-rate/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
chance ≥1 in n = 1 − (1 − p)ⁿ
tries for target = log(1 − target) ÷ log(1 − p)
average tries   = 1 ÷ p
```

A 1% drop over 100 tries is only ~63%, not "guaranteed" — misses compound and you never truly hit 100%. The average (1/p) is a mean, not a promise. Assumes a flat rate with no pity/bad-luck protection.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
