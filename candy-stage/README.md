# Candy Temperature Stages 🍬

Look up candy-making **sugar stages** (soft ball, hard crack…) and their temperatures, identify the stage from a thermometer reading, and adjust for altitude.

**[Open the app →](https://awictor.github.io/candy-stage/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## The stages (°F)

| Stage | Temp | Use |
|---|---|---|
| Thread | 230 | syrups |
| Soft ball | 238 | fudge, fondant |
| Firm ball | 245 | caramels |
| Hard ball | 255 | nougat |
| Soft crack | 275 | taffy |
| Hard crack | 305 | brittle, lollipops |
| Caramel | 340 | browning |

These track water's boiling point, so **subtract ~1 °F per 500 ft** of altitude or the candy overcooks.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
