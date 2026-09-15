# Picture Hanging Height 🖼️

Find the exact **hook height** to hang art at gallery eye level, from picture height and wire drop. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/picture-hanging-height/).

Enter the picture height, how far the taut wire drops below the top, and your desired center height. You get exactly how high to drive the hook.

## How it works

- Galleries center art at about 57–60 inches from the floor — average eye level.
- The top of the picture sits at center + half the picture height.
- When the hanging wire is pulled taut it rises to a point below the top — the hook goes at top − that wire drop.
- Over a sofa or console, drop the center so it hovers about 6–8 inches above the furniture instead.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
