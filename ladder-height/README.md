# Extension Ladder Calculator 🪜

Set an extension or straight ladder safely with the **4:1 rule**: the base distance from the wall, the ladder length to reach a height, and the resulting setup angle.

**[Open the app →](https://awictor.github.io/ladder-height/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
base   = contact height ÷ 4
length = √(height² + base²)
angle  = atan(height ÷ base)   ≈ 75.5°
```

For every 4 ft of height where the ladder touches the wall, set the base 1 ft out. Buy a longer ladder than the contact length — it must extend ~**3 ft above** the roof edge for a handhold, and never stand on the top three rungs. Tie off the top and level the feet.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
