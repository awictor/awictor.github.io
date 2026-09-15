# Firewood BTU Calculator 🪵

Compare firewood by **heat energy**: million BTU per cord for common species, total heat for your cords, and cords needed to hit a heating target.

**[Open the app →](https://awictor.github.io/firewood-btu/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Heat comes from the wood's mass, so dense hardwoods hold far more per cord:

| Species | M BTU / cord |
|---|---|
| Hickory | 27 |
| Oak / Maple / Ash | 24 |
| Birch / Cherry / Fir | 20 |
| Pine | 15 |
| Cedar | 13 |

Figures assume wood **seasoned** to ~20% moisture — green wood wastes energy boiling off water and makes creosote. A cord of oak can be worth two of pine for heating.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
