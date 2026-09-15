# Frame Time Calculator 🎮

Convert between frame rate (**FPS**) and **frame time** in milliseconds, and count frames over a duration — for gaming, video, and animation.

**[Open the app →](https://awictor.github.io/frame-time/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
ms per frame = 1000 ÷ FPS
FPS          = 1000 ÷ ms
frames       = FPS × seconds
```

60 FPS = 16.7 ms/frame, 120 FPS = 8.3 ms, 30 FPS = 33.3 ms. Engine developers reason in **milliseconds** because a fixed frame budget makes the cost of each system concrete. Consistent frame times matter as much as the average for perceived smoothness.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
