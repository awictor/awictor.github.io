# Post Hole Concrete Calculator 🕳️

Work out the concrete needed to set a fence or deck post — hole volume minus the post — in cubic feet and bags to buy.

**[Open the app →](https://awictor.github.io/post-hole/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
hole     = π · (diameter/2)² · depth ÷ 1728   (cu ft)
post     = side² · depth ÷ 1728
concrete = hole − post
bags     = ceil(concrete ÷ bag yield)
```

Dig the hole ~3× the post width across and bury ⅓–½ of the post's above-ground height, below the frost line. A 60 lb bag yields ~0.45 cu ft, an 80 lb bag ~0.60. Round up and buy a spare.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
