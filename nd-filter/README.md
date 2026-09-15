# ND Filter 📷

Work out the **new shutter time after adding a neutral density filter** — the long-exposure math for silky water, cloud streaks, and blurred crowds. Single HTML file, fully offline, nothing leaves your device.

## Why

An ND filter blocks light so you can drag the shutter in daylight. But every stop *doubles* the exposure, so a metered 1/125 s behind a 10-stop filter isn't "a bit longer" — it's 8 seconds. Doing that 2ⁿ math in your head at the tripod is a good way to blow the shot. This does it instantly.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/nd-filter/
- Enter the **base shutter** your camera meters *without* the filter (e.g. 0.008 for 1/125 s).
- Pick the **ND filter** strength.
- Read the new exposure time, the stops removed, and the raw multiplier.

## How it works

- Each stop of ND doubles the exposure: an ND64 (6 stops) multiplies time by 2⁶ = 64×; an ND1000 (10 stops) by 1024×.
- Meter without the filter, then apply the multiplier — dark filters can defeat autofocus, so focus first.
- Past ~30 seconds you'll switch to Bulb mode with a remote or timer; the tool flags that.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
