# Strike Water Temp 🍺

Heat your **strike water to the right temperature** to hit a target mash temp — the homebrewer's infusion calculation. Single HTML file, fully offline, nothing leaves your device.

## Why

Room-temperature grain cools your water the moment you dough in, so you heat the strike water above your mash target and let the grain pull it down. Miss it and you're chasing the mash with boiling water or ice. This applies Palmer's infusion formula so you hit the temperature on the first pour.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/strike-temp/
- Enter your **target mash temperature**.
- Enter the **grain temperature** (usually room temp).
- Enter your **water-to-grain ratio** in quarts per pound.
- Read the strike water temperature, the overshoot, and what a thinner 2.0 qt/lb mash would need.

## How it works

- Palmer's infusion formula: strike °F = (0.2 ÷ R)(target − grain) + target, where R is the water-to-grain ratio (qt/lb).
- A thicker mash (less water per pound) needs a bigger overshoot; a thinner mash needs less.
- Preheat your mash tun — a cold vessel steals heat the formula doesn't model, so many brewers add 1–2 °F.
- Stir well, check within a minute, and correct with a splash of hot or cold water if needed.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
