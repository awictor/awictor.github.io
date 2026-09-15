# Leather Weight 🧰

Convert **leather weight in ounces to thickness** in mm and inches (and back), with a project-use guide. Single HTML file, fully offline, nothing leaves your device.

## Why

Leather is sold by "ounce," but that number is really a thickness — and the 1 oz = 1/64″ conversion is easy to forget when a pattern calls for "3 mm" and the shop lists "7–8 oz." This translates instantly and tells you what a given weight is typically used for.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/leather-weight/
- Enter a **value** in ounces, millimeters, or inches.
- Read the weight in oz, the thickness in mm and inches, and a typical use.

## How it works

- 1 oz = 1/64 inch = ~0.397 mm.
- Rough guide: 2–3 oz linings/garments, 4–5 oz wallets, 6–7 oz bags/straps, 8–10 oz belts/holsters, 10 oz+ heavy tack.
- Hides vary, so weights often come as ranges — buy one that brackets your target.
- Split leather for an exact thickness; skive to thin just the edges.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
