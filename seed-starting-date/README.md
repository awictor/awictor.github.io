# Seed Starting Date 🌰

Find when to **start seeds indoors** from your last frost date and how many weeks before frost the crop needs. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/seed-starting-date/).

Enter your average last-frost date and pick a crop. You get the date to start seeds indoors, and the weeks/days before frost.

## How it works

- Seed packets list weeks to start "before last frost" — count back that many weeks from your average last-frost date.
- Start date = last frost − weeks × 7 days.
- Find your local average last-frost date from a frost-date table for your ZIP or region.
- Warm-season crops go out after frost; hardy greens and brassicas can be transplanted a couple of weeks earlier.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
