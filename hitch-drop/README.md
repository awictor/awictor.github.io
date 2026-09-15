# Hitch Drop 🚚

Find the ball-mount **drop or rise** you need so a trailer tows level, from your hitch receiver and coupler heights. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/hitch-drop/).

Enter your receiver height and the trailer coupler height. You get the drop or rise to look for and the raw difference.

## How it works

- Measure from the ground to the top of the receiver opening, and from the ground to the bottom of the coupled trailer coupler.
- Drop = receiver height − coupler height. A positive number needs a drop mount; negative needs a rise.
- Measure the trailer loaded and coupled — weight settles the suspension and changes the coupler height.
- A level trailer tows straighter, brakes evenly, and wears its tires evenly.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
