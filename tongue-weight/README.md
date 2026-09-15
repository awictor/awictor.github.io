# Trailer Tongue Weight Calculator 🛻

Check whether a trailer's tongue weight is in the safe **10–15%** range, or find the target tongue weight for a given trailer weight — so your tow stays stable.

**[Open the app →](https://awictor.github.io/tongue-weight/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Tongue weight is the downward force the loaded trailer puts on the hitch ball. For a stable tow it should be **10–15%** of total loaded trailer weight:

```
tongue % = tongue weight ÷ trailer weight × 100
```

- **Under 10%** → the trailer can sway and fishtail.
- **Over 15%** → it lifts the tow vehicle's front wheels and overloads the rear axle.

Adjust by shifting cargo — forward to add tongue weight, back to reduce it, keeping ~60% of the load ahead of the trailer axle. Always stay within your hitch and vehicle ratings.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
