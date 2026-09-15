# Chinese Zodiac Calculator 🐉

Find the Chinese zodiac **animal** and its **five-element** for any year, from the 12-year and 60-year sexagenary cycles.

**[Open the app →](https://awictor.github.io/chinese-zodiac/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
animal  = (year − 4) mod 12   → Rat, Ox, Tiger, … Pig
element = (year − 4) mod 10   → paired into Wood, Fire, Earth, Metal, Water
```

Together the two wheels make the famous **60-year cycle**. The anchor makes 1984 the Wood Rat and 2024 the Wood Dragon. Chinese New Year falls in late Jan/Feb, so a birthday early in the year may belong to the previous animal — check the exact date for edge cases.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
