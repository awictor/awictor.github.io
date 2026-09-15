# Wing Loading 🛩️

Compute **wing loading** and **cubic wing loading** from weight and wing area, with an RC flight-character category. Single HTML file, fully offline, nothing leaves your device.

## Why

Two models can weigh the same and fly completely differently — what matters is how much wing carries that weight. Raw wing loading tells you stall/landing speed, but cubic wing loading is the number that actually compares a park flyer to a giant-scale warbird. This gives both and labels how a build will handle before you maiden it.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/wing-loading/
- Enter **all-up weight** (oz) and **wing area** (sq in).
- Read the wing loading in oz/ft², the cubic wing loading, a flight-character label, and the wing area in sq ft.

## How it works

- Wing loading = weight ÷ wing area (converted to sq ft by ÷144).
- Cubic wing loading (WCL) = weight ÷ area^1.5 — size-independent, so it compares fairly across models.
- Rough WCL guide: under 4 floats, 4–6 docile trainer, 6–9 sport, 9–11 advanced, 11–13 expert, over 13 flies like a brick.
- Cut weight or add wing area to bring a heavy model into a friendlier band.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
