# Keg Carbonation 🫧

Set your kegerator **regulator PSI** for a target CO₂ volume at your serving temperature. Single HTML file, fully offline, nothing leaves your device.

## Why

Force-carbonating a keg is "set the regulator and wait," but the right pressure depends on both the carbonation you want *and* how cold the beer is — CO₂ dissolves better cold. Guess and you get flat or foamy beer. This applies the standard PSI/temperature/volumes relationship so you dial it in once.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/keg-carbonation/
- Enter the **beer temperature**.
- Pick a **carbonation level** by style (or custom volumes).
- Read the regulator PSI, plus what 5°F colder would need.

## How it works

- Uses the standard empirical fit relating PSI, temperature (°F), and CO₂ volumes.
- Warmer beer needs more pressure for the same fizz — keep the keg cold and steady.
- Hold the set pressure ~1–2 weeks to force-carbonate, or shake the keg to speed it up.
- Serving pressure can be balanced separately for long beer lines.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
