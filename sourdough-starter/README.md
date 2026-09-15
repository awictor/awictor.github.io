# Sourdough Starter 🫙

Work out the **flour and water to feed your sourdough starter** at any ratio, or the starter to keep for a target amount. Single HTML file, fully offline, nothing leaves your device.

## Why

"Feed 1:5:5" is standard shorthand, but turning it into actual grams — and working backward from how much starter you need for a bake — is quick arithmetic you'd rather not fumble with floury hands. This does both directions.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/sourdough-starter/
- Enter the **starter you're keeping** and a **feeding ratio** (the R in 1:R:R).
- Read the flour and water to add, the total after feeding, and how much to keep for a 200 g target.

## How it works

- Ratio 1:R:R means 1 part starter, R parts flour, R parts water by weight.
- Flour = water = starter × R; total = starter × (1 + 2R).
- Equal flour and water keeps a 100% hydration starter.
- For a target amount: keep = target ÷ (1 + flour parts + water parts).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
