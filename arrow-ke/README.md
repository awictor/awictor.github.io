# Arrow Kinetic Energy Calculator 🏹

Calculate an arrow's **kinetic energy** and **momentum** from its total weight in grains and speed in fps, with a rough bowhunting game-size guide.

**[Open the app →](https://awictor.github.io/arrow-ke/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
KE (ft·lb)          = weight × speed² / 450240
momentum (slug·ft/s) = weight × speed  / 225218
```

KE depends on speed *squared*, so fast light arrows post big numbers. Momentum scales with speed but rewards *heavy* arrows, and many hunters trust it as the better penetration predictor. Rough KE guidance: <25 small game, 25–41 deer-sized, 42–65 elk/black bear, 65+ toughest game. Placement and a sharp broadhead matter more than any number.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
