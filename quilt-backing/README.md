# Quilt Backing 🧵

Work out the **backing fabric yardage, panels, and seams** for a quilt from the top size, overhang, and fabric width. Single HTML file, fully offline, nothing leaves your device.

## Why

Backing math trips up even experienced quilters: standard cotton is only ~42″ usable, so anything wider than a throw needs panels seamed together — and you have to add overhang for the longarm before you even start. Guess low and you're short mid-project. This does it, and shows when extra-wide backing would save fabric and seams.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/quilt-backing/
- Enter the **quilt top** width and length.
- Set the **overhang** per side (4″ is typical for longarm).
- Pick the **fabric width** (42″ standard, or 108″ extra-wide).
- Read the yardage to buy, the finished backing size, the panel count, and the seams.

## How it works

- Backing size = top + 2 × overhang in each direction.
- Panels = ceil(backing width ÷ usable fabric width), seamed selvage-to-selvage; seams = panels − 1.
- Yardage = panels × backing length ÷ 36.
- Extra-wide backing (108″) usually covers a whole quilt in one seamless panel.
- Buy a little extra for squaring up and shrinkage.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
