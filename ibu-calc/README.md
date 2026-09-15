# IBU Calculator

Calculate beer bitterness in **IBU** with the Tinseth formula from hop weight, alpha acid, boil time, batch volume, and wort gravity. For homebrewers.

**[Open the tool →](https://awictor.github.io/ibu-calc/)**

- Tinseth utilization: boil-time × gravity "bigness" factors
- IBU = utilization × alpha-acid concentration
- Shows the utilization percentage
- Dark mode, 100% offline, no dependencies, no tracking

## Example

60 g of 5% AA hops boiled 60 min in 20 L at 1.050 → about 35 IBU, a solid pale ale.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
