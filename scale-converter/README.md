# Scale Converter

A single-file, offline scale calculator for model builders, architects, and mapmakers. Convert between real-world and scaled sizes at any ratio (1:24, 1:87 HO, 1:100, etc.), find the scale from two measurements, and parse ratio strings like `1:24`.

**Live:** https://awictor.github.io/scale-converter/

## Features

- **Real → model** and **model → real** conversion at any scale ratio
- **Find the scale** from a real size and its model size
- **Unit-agnostic** — output uses whatever unit you type in
- Parses ratio strings (`1:24`, `2:1`, `1 : 100`) or plain numbers
- Preset chips for common hobby/architecture scales
- Dark mode, persisted; 100% offline; zero dependencies

## How scale works

A scale **1:N** means one unit on the model equals N units in real life.

- Model size = real size ÷ N
- Real size = model size × N

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
