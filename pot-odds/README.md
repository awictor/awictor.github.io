# Poker Pot Odds Calculator

Calculate poker **pot odds**: the equity you need to call, the odds ratio, your **draw equity from outs** (rule of 2 and 4), and whether a call is profitable.

**[Open the tool →](https://awictor.github.io/pot-odds/)**

- Required equity = call ÷ (pot + call)
- Pot odds as an X-to-1 ratio
- Draw equity via the rule of 2 and 4
- Profitable-call verdict
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Calling 50 into a 100 pot needs 33% equity (2-to-1). A 9-out flush draw on the flop is ~36% — a profitable call.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
