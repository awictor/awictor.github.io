# Fabric Yardage Calculator 🧵

Work out how many yards of fabric to buy to cut a number of pieces at a given size from a bolt of known usable width — for sewing and quilting.

**[Open the app →](https://awictor.github.io/fabric-yardage/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
pieces per row = floor(fabric width ÷ piece width)
rows needed    = ceil(pieces ÷ per row)
yards          = rows × piece length ÷ 36
```

Include your **seam allowance** in the piece dimensions, round up when buying, and add a little extra for shrinkage, squaring up, and pattern matching. Usable width is usually ~40–42″ after selvages are trimmed from a 44/45″ bolt. This assumes pieces aren't rotated to nest — real cutting layouts can sometimes do better.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
