# Clock Angle Calculator 🕐

Find the angle between a clock's hour and minute hands at any time, plus each hand's position — a classic geometry puzzle solver.

**[Open the app →](https://awictor.github.io/clock-angle/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
minute hand = 6 × minute
hour hand   = 30 × (hour mod 12) + 0.5 × minute
angle       = |hour − minute|, then min(angle, 360 − angle)
```

The hour hand creeps forward 0.5° per minute — the detail people forget. At 3:00 the hands are 90° apart; at 3:15 they're only 7.5° apart, because the hour hand has already moved a quarter of the way to 4.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
