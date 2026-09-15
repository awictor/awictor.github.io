# Fertilizer Rate Calculator 🌾

Work out how much fertilizer to apply for a target amount of **nitrogen per 1000 sq ft**, from the product's %N and your lawn area.

**[Open the app →](https://awictor.github.io/fertilizer-rate/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
product per 1000 = target N ÷ (%N ÷ 100)
total product    = product per 1000 × area ÷ 1000
N applied        = product × (%N ÷ 100) ÷ (area ÷ 1000)
```

Lawn feeding is dosed by pounds of **actual nitrogen** per 1000 sq ft (usually ~1 lb). The bag's first N-P-K number is the percent nitrogen, so a higher-N product means you spread less. Over-applying burns turf and runs off — split heavy feeding across the season and water it in.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
