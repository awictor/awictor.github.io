# Deep Fry Oil 🍟

Work out how much frying **oil** a pot holds at a safe depth, from pot diameter, height, and headspace. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/deep-fry-oil-amount/).

Enter the pot's inside diameter, height, and the headspace you want above the oil. You get the oil at the safe fill depth, the safe depth, and the full-pot volume.

## How it works

- A cylinder holds π × radius² × depth ÷ 231 gallons (231 cubic inches per gallon).
- Leave at least 3–4 inches of headspace — oil bubbles up hard when food goes in, and boilover is a fire risk.
- Safe oil depth = pot height − headspace; the oil volume follows from that depth.
- To size for a specific food, lower it into water first and mark the rise — that's how much oil to use so it just covers the food.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
