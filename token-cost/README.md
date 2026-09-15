# LLM Token Cost Calculator

Estimate **LLM API cost** from input and output tokens and per-million prices, with per-call and monthly projections.

**[Open the tool →](https://awictor.github.io/token-cost/)**

- Cost per call = (input ÷ 1M × in price) + (output ÷ 1M × out price)
- Monthly cost from calls/day
- Word-to-token estimate (1 token ≈ 0.75 words)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

2,000-in / 500-out at $3/$15 per 1M → $0.0135/call; 1,000 calls/day ≈ $405/month.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
