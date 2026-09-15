# Window AC BTU ❄️

Size a window or room **air conditioner** in BTU from square footage, sun exposure, occupants, and whether it's a kitchen. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/window-ac-btu/).

Enter the room area, number of people, sun exposure, and whether it's a kitchen. You get the recommended cooling capacity in BTU.

## How it works

- Start at 20 BTU per square foot of room area.
- Add 10% for a very sunny room, or subtract 10% for heavy shade.
- Add 600 BTU for each person beyond two, and 4000 BTU if it's a kitchen.
- Oversizing cools fast but leaves the room clammy — it shuts off before pulling humidity, so aim close to the number.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
