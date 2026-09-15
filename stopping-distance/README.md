# Stopping Distance 🚗

Estimate the **total distance to stop a car** — thinking distance plus braking distance — from speed, reaction time, and road grip. Single HTML file, fully offline, nothing leaves your device.

## Why

The reason speed limits feel so aggressive is the physics: braking distance grows with the *square* of speed, so a modest speed increase adds a surprising amount of road. Seeing it split into thinking vs. braking, and watching wet or icy grip blow the number up, makes the risk concrete — good for driver's-ed, fleet safety, or just intuition.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/stopping-distance/
- Enter your **speed**, **reaction time** (1.5 s is a common figure), and **road condition**.
- Read the total, the thinking and braking components, and the distance in ~15 ft car lengths.

## How it works

- Thinking distance = speed × reaction time — grows linearly with speed.
- Braking distance = v² ÷ (2·μ·g) — grows with the square of speed.
- Grip μ dominates: wet roughly halves it, ice cuts it to a tenth.
- Idealized flat-road figures with good brakes and tyres; real distances run longer with load, grade, and wear.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
