# Spoke Length Calculator 🚲

Calculate bicycle spoke length from your rim's ERD, hub flange geometry, spoke count, and cross pattern — using the exact 3D geometry, not a lookup table.

**[Open the app →](https://awictor.github.io/spoke-length/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

A spoke runs in 3D from a hub flange hole to a rim hole:

```
length = √(r² + f² + h² − 2·r·f·cos θ) − hole/2
θ      = 4π · crosses / spokes
```

- **r** = ERD / 2 (effective rim radius)
- **f** = flange diameter / 2
- **h** = flange offset from the wheel centerline
- **hole** = spoke-hole diameter (~2.6 mm)

A radial (0-cross) build gives the shortest spoke; more crosses lace it more tangentially and lengthen it. Dished wheels have a different offset on each flange — compute the two sides separately.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
