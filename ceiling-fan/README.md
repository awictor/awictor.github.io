# Ceiling Fan Size Calculator 🌀

Find the right ceiling fan **blade span** for a room from its floor area, plus the **downrod length** for your ceiling height.

**[Open the app →](https://awictor.github.io/ceiling-fan/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Blade span by floor area:

| Area (sq ft) | Span |
|---|---|
| ≤ 75 | 36″ |
| 76–144 | 42″ |
| 145–225 | 52″ |
| 226–400 | 56″ |
| > 400 | 60″+ / two fans |

Blades should sit **8–9 ft above the floor**, so on ceilings above 9 ft add a downrod of about `ceiling height − 9 ft`; at 8–9 ft use a flush "hugger" mount, and keep blades ~18″ off any wall.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
