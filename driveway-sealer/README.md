# Driveway Sealer Calculator 🛣️

Work out how much asphalt driveway sealer you need: gallons for the area and coats, and 5-gallon pails to buy.

**[Open the app →](https://awictor.github.io/driveway-sealer/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
gallons = area × coats ÷ coverage
pails   = ceil(gallons ÷ pail size)
```

A gallon covers ~70–80 sq ft per coat on older, porous blacktop (new asphalt stretches further). Most driveways get **two coats**. Seal when dry and above ~50 °F; don't over-apply — too-thick sealer cracks and peels. Buy a little extra for edges and cracks.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
