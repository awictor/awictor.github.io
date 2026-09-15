# Flash Guide Number Calculator ⚡

Work out flash-to-subject distance, required aperture, and ISO-adjusted guide number from a flash's guide number — for manual flash photography.

**[Open the app →](https://awictor.github.io/flash-guide-number/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
GN        = aperture × distance
distance  = GN ÷ f-number
f-number  = GN ÷ distance
GN at ISO = GN × √(ISO ÷ 100)
```

Guide number is quoted at a reference ISO (usually 100) in meters or feet — keep units consistent. Every two stops of ISO doubles the guide number. This is the full-power, direct-flash figure; bounce, diffusers, and zoom head change it, so treat it as a starting point.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
