# Glaze Batch 🏺

Scale a **pottery glaze recipe** from ingredient percentages to a weighed batch, with water to mix. Single HTML file, fully offline, nothing leaves your device.

## Why

Glaze recipes are given in percentages that total 100 — but you mix by weight. Converting "40% feldspar" into grams for whatever batch size you need is quick arithmetic you don't want to fumble with a scale full of silica. This does it and adds the mixing water.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/glaze-batch/
- Enter the **dry batch weight**.
- Fill in the **ingredients and their percentages**.
- Set the **water %** to mix.
- Read grams for each ingredient plus water, and a check that the base totals 100%.

## How it works

- Grams = batch weight × percent ÷ 100.
- Colorants and opacifiers are added *on top* of the 100% base, so a recipe can total more than 100 — expected.
- Water is a percentage of the dry weight (~80% is a common starting point); sieve and adjust to a cream consistency.

**Safety:** weigh dry, wear a mask around silica dust, and test-tile a new batch before glazing real work.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
