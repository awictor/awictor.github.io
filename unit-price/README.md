# UnitPrice

**Compare price per unit & find the best value** — enter a few products' prices and package sizes and UnitPrice converts them to a common base (per gram, per millilitre, or per item) and ranks them, showing how much more the others cost. One offline HTML file, no signup, no tracking.

👉 **[Open UnitPrice](https://awictor.github.io/unit-price/)**

## Features
- Compare by weight (g/kg/oz/lb), volume (ml/l/fl oz), or count
- Mixed units within a family are converted automatically (16 oz vs 1 lb, etc.)
- Ranks results, flags the best value, and shows the "+X% more" gap
- Blank rows ignored; dark mode; remembers your entries; 100% client-side

## Why
"Is the big box actually cheaper?" is a per-unit question the shelf tag rarely answers clearly. UnitPrice normalizes sizes and shows the real winner. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toBase`, `unitPrice`, `rank`) are covered by headless tests — unit conversions (16 oz = 1 lb), per-unit math, ranking with best/ratio, invalid-row filtering, and cross-unit comparison; CI runs them on every push.

## License
MIT © Alex Wictor
