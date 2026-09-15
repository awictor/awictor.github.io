# Weed Killer Mix 🧴

Mix weed killer (or any concentrate) to the label rate for your sprayer tank, and see how many tanks cover your area. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/weed-killer-mix/).

Enter the sprayer tank size, label rate (oz per gallon), area to treat, and product coverage. You get the concentrate per tank, gallons for the job, and tanks to mix.

## How it works

- Concentrate per tank = tank size × the label's ounces-per-gallon rate — always follow the product label.
- Gallons for the job = area ÷ the product's coverage per gallon.
- Tanks to mix = ceil(gallons needed ÷ tank size); mix only what you'll use that day.
- Add concentrate to a half-full tank, top up with water, then agitate — and wear gloves and eye protection.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
