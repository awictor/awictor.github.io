# Anchor Scope Calculator ⚓

Work out how much anchor rode to let out for a safe scope, or check the scope you already have from the water depth and your bow height.

**[Open the app →](https://awictor.github.io/anchor-scope/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Scope is the ratio of rode let out to the vertical distance from the bow roller to the seabed — water depth **plus** bow height, measured at **high tide**:

```
rode = scope × (depth + bow height)
```

A low, flat angle lets the anchor dig in; a steep angle pulls it out. Common guidance is **5:1 in calm conditions and 7:1 or more when it's blowing** (all-chain rode can hold at a bit less). You'll swing in a circle of that radius, so check for room.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
