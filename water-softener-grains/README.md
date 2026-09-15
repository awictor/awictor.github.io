# Water Softener Size 🚰

Find the **grain capacity** you need from household size, water hardness, and iron. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/water-softener-grains/).

Enter the number of people, daily gallons per person, water hardness (grains per gallon), iron in ppm, and how many days you want between regenerations. You get the daily grain load and the capacity to shop for.

## How it works

- If your report is in ppm or mg/L, divide by 17.1 to get grains per gallon (gpg).
- Iron adds hardness a softener must remove — each 1 ppm of iron counts as about 5 gpg.
- Daily load = people × gallons per person × effective hardness.
- Pick a capacity of daily load × days between regenerations — softeners run most efficiently regenerating roughly weekly.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
