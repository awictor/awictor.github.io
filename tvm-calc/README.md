# Time Value of Money Calculator

Solve any **time-value-of-money** variable for a lump sum: **present value**, **future value**, **required rate**, or **number of periods**.

**[Open the tool →](https://awictor.github.io/tvm-calc/)**

- FV = PV·(1+r)ⁿ, and solve for PV, rate, or periods
- Pick which variable to solve; the rest are inputs
- Rate and periods must share a unit (annual/years, monthly/months)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

$1,000 at 5% for 10 periods → $1,628.89. To double in 10 periods you need ~7.18% per period.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
