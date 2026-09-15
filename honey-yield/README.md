# Honey Super Yield 🍯

Estimate a beehive's **honey harvest** from super type, frame count, and how full the frames are — plus the number of jars it fills. Single HTML file, fully offline, nothing leaves your device.

## Why

"How much honey will these supers give me?" is the question every beekeeper asks before extracting — for jars, labels, and buckets. Frame capacity varies a lot by super depth and how much is actually capped, so a quick estimate beats guessing.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/honey-yield/
- Pick the **super type**, number of **supers**, and **frames per super**.
- Set how **drawn and capped** the frames are (%).
- Choose a **jar size**.
- Read the estimated harvest, per-super yield at 100%, and jars filled.

## How it works

- A fully capped frame holds ~7 lb (deep), ~6 lb (medium), or ~3.5 lb (shallow).
- Yield = frames × per-frame × fill %, times the number of supers.
- Jars = harvest weight ÷ jar weight (a 16 oz jar holds ~1 lb of honey).
- Harvest capped honey only; uncapped cells hold too much moisture and can ferment. Leave the colony enough winter stores.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
