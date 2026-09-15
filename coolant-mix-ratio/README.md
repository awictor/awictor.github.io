# Coolant Mix 🧊

Work out how much concentrated **antifreeze and water** to mix for a target coolant concentration and system capacity. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/coolant-mix-ratio/).

Enter the system capacity and pick a target concentration. You get the concentrate and water to add, and the concentrate-to-water ratio.

## How it works

- For a target percentage, concentrate = capacity × target÷100 and water makes up the rest.
- A 50/50 mix protects to about −34°F; go up toward 60–70% for harsher winters.
- Don't exceed about 70% — pure antifreeze actually protects less and cools worse than a mix.
- Use distilled water to avoid mineral scale, and match the coolant type (IAT / OAT / HOAT) your engine calls for.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
