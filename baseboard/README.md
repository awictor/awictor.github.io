# Baseboard & Trim Calculator 📏

Work out the linear feet of baseboard, crown, or other trim a room needs — perimeter minus doorways, plus waste — and how many sticks to buy.

**[Open the app →](https://awictor.github.io/baseboard/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
perimeter = 2 × (length + width)
trim      = (perimeter − doorways) × (1 + waste%/100)
sticks    = ceil(trim ÷ stick length)
```

Add ~10% waste for miter cuts and reusable offcuts. Trim commonly comes in 8, 12, or 16 ft sticks — buy from the same lot so the profile and color match, and count closets and return runs separately.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
