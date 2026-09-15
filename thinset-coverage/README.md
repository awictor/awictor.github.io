# Thinset Coverage 🪣

Work out **how many bags of thinset mortar** a tile job needs — from the tile area, your trowel notch size, and a waste allowance. Single HTML file, fully offline, nothing leaves your device.

## Why

Thinset coverage isn't about square footage alone: the trowel notch sets how thick a bed you lay, and a 3/4" U-notch burns through mortar far faster than a 1/4" square. Guess low and you're back at the store mid-job with tile setting up; guess high and you eat bags. This turns it into three inputs.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/thinset-coverage/
- Enter the **tile area** in square feet.
- Pick your **trowel notch size**.
- Set a **waste allowance** (10% is a common default; back-buttering large tile wants more).
- Read the bag count, the coverage per bag, and the area including waste.

## How it works

- Coverage figures are typical for a **modified thinset in a 50 lb bag**; large-format and polymer-modified mortars vary, so check your bag's data sheet.
- A deeper notch covers less area per bag — big-format tile and uneven substrates need bigger notches.
- Waste is added, then the total is rounded **up** to whole bags.
- Bare, porous, or wavy substrates drink more mortar than the flat-surface assumption here.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
