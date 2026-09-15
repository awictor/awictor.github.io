# Room Lighting Calculator 💡

Work out how many **lumens** a room needs from its area and the recommended light level, and how many **bulbs** to reach it.

**[Open the app →](https://awictor.github.io/room-lighting/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
lumens = area(ft²) × footcandles
bulbs  = ceil(lumens ÷ lumens per bulb)
```

Recommended footcandles: ~10–20 living/bedroom, 30 dining/bath, 50 kitchen, 70+ task. Divide by a bulb's **lumen** output (on the box, not watts) and round up. Spread fixtures for even coverage and layer ambient, task, and accent light.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
