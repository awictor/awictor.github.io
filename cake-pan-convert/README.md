# Cake Pan Converter 🍰

Scale a cake or brownie recipe when you swap **pan sizes**, by comparing pan areas. Round and rectangular pans. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/cake-pan-convert/).

Set the recipe's pan and your pan (round or rectangular). You get the multiplier to apply to every ingredient, plus each pan's area.

## How it works

- Batter depth stays about the same, so scale by pan area: round = π × (diameter÷2)², rectangular = length × width.
- Multiplier = your pan area ÷ the recipe's pan area — apply it to every ingredient.
- An 8″ round to a 9″ round is about 1.27×; the reverse is about 0.79×.
- Keep the oven temperature the same, but check for doneness a bit earlier or later as the batter depth shifts.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
