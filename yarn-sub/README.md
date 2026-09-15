# Yarn Substitution 🧶

Work out **how many skeins of a substitute yarn** you need to match a pattern's total yardage. Single HTML file, fully offline, nothing leaves your device.

## Why

Patterns list skeins of a *specific* yarn, but skein sizes vary wildly between brands. Substitute a yarn with different yardage and the skein count changes — buy the wrong number and you're either short (with no matching dye lot left) or overpaying. This converts to total yardage and back.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/yarn-sub/
- Enter the **pattern's skeins** and **yards per skein**.
- Enter the **yards per substitute skein**.
- Add a **safety margin** (~10%).
- Read the substitute skeins to buy, the total yardage, and the margin total.

## How it works

- Total yards = pattern skeins × yards per skein.
- Substitute skeins = total ÷ yards per new skein, rounded **up** (never down).
- Add ~10% for swatching and seaming — more for colorwork or unrepeatable dye lots.
- Match yarn weight and gauge too, or the finished size drifts.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
