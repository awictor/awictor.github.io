# MOA / Mil Converter 🎯

Convert **MOA, milliradians, and inches** at any distance for rifle scope zeroing and holdover. Single HTML file, fully offline, nothing leaves your device.

## Why

Reticles and turrets don't always speak the same language — a mil reticle over an MOA turret, or a group measured in inches you need to dial out in clicks. This does all three conversions at your actual target distance so you can zero and hold over without mental gymnastics at the bench.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/moa-mil/
- Enter an **adjustment value** and whether it's **MOA or mils**.
- Enter the **target distance** in yards.
- Read the size on target in inches, the value in both angular units, and the equivalent 1/4-MOA clicks.

## How it works

- 1 MOA ≈ 1.047″ at 100 yards, scaling with distance (≈2″ at 200, ≈5″ at 500).
- 1 mil = exactly 3.6″ at 100 yards (3.6 units per 1000 of the same unit).
- The two relate by 1 mil = 3.4377 MOA.
- Divide a needed correction by your turret's click value (1/4 MOA or 0.1 mil) to get clicks.

These are geometric angular sizes; actual bullet drop needs a ballistic solver for velocity, BC, and conditions.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
