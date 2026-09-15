# Top of Descent 🛬

Plan a descent at a glance: **where to start down** (the 3-to-1 rule), **how fast to sink** for a 3° path at your groundspeed, and **what glidepath you're on now**. Single HTML file, fully offline, nothing leaves your device.

## Why

"Am I going to make the crossing restriction?" is a question every pilot and flight simmer answers with the same mental math — 3 miles per thousand feet, groundspeed times five. This does it instantly, and adds the current-glidepath check so you can tell at a glance whether you're high.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/top-of-descent/
- Enter the **altitude to lose** (cruise minus target).
- Enter your **groundspeed**.
- Optionally enter **distance remaining** to see the angle you're currently on.
- Read the top-of-descent point, the 3° descent rate, and your live glidepath.

## How it works

- **3:1 rule** — 3 NM of track per 1,000 ft to lose gives roughly a 3° path.
- **Descent rate** — for 3°, vertical speed ≈ groundspeed (kt) × 5; computed exactly here from the geometry (ft/NM ÷ 60 × tan angle).
- **Glidepath** — arctan(altitude ÷ distance) tells you if you're steeper than 3° (high) or shallower (comfortable).
- Ballpark planning only — fly the published profile, honor crossing restrictions, and adjust for wind.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
