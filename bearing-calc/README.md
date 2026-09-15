# Bearing Calculator

A single-file, offline great-circle **bearing** calculator. Enter two coordinates to get the initial and final bearing, the 16-point compass direction, and the back bearing — with a live compass dial.

**Live:** https://awictor.github.io/bearing-calc/

## Features

- **Initial bearing** (forward azimuth) between two lat/lng points
- **Final bearing** at the destination (great circles curve, so it differs)
- **Back bearing** for the return heading
- **16-point compass** direction (N, NNE, NE, …)
- Visual compass needle; dark mode; 100% offline; zero dependencies

## Formula

```
θ = atan2( sin Δλ · cos φ₂,  cos φ₁ · sin φ₂ − sin φ₁ · cos φ₂ · cos Δλ )
```

normalized to 0–360° clockwise from true north.

## Tests

```
node tests/selftest.mjs
```

10 checks including cardinal directions and the classic Land's End → John o' Groats bearing (~9°). No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
