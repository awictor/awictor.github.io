# Sealed Speaker Box Calculator 🔊

Design a sealed subwoofer enclosure from a driver's Thiele-Small parameters. Computes system resonance (**Fc**), total system Q (**Qtc**), and the box volume needed to hit a target Qtc.

**[Open the app →](https://awictor.github.io/speaker-box/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

The trapped air in a sealed box stiffens the driver's suspension, raising both resonance and damping:

```
Fc  = Fs  · √(1 + Vas/Vb)
Qtc = Qts · √(1 + Vas/Vb)
```

A smaller box gives a higher Fc and Qtc. **Qtc = 0.707** is maximally flat (Butterworth); **0.5** is critically damped and tight; above ~0.8 the response peaks and sounds boomy. To hit a target Qtc, solve for volume:

```
Vb = Vas / ((Qtc/Qts)² − 1)
```

which requires the target Qtc to exceed the driver's own Qts.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
