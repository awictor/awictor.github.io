# LLM VRAM Calculator

Estimate the **GPU VRAM** needed to run a large language model from its parameter count and quantization, with overhead headroom.

**[Open the tool →](https://awictor.github.io/llm-vram/)**

- Weights = parameters (B) × bytes per parameter
- Quantization presets: FP32 / FP16 / INT8 / INT4
- Overhead headroom (~20%) for KV cache and context
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 7B FP16 model is 14 GB of weights, ~17 GB with 20% overhead — fits a 24 GB card. INT4 drops it to ~4 GB.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
