# Room Modes Calculator 🎚️

Find the **axial room modes** — the standing-wave resonances between parallel walls — of a room from its dimensions, so you can place bass traps and pick better listening or mixing positions.

**[Open the app →](https://awictor.github.io/room-modes/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Between two parallel walls, waves whose half-wavelength divides evenly into the spacing reinforce into standing waves:

```
f = n · c / (2L)         n = 1, 2, 3…
c = 331.3 + 0.606 · T    (speed of sound, m/s, T in °C)
```

At those frequencies the room boosts or cancels bass depending on where you sit — the cause of boomy and thin spots. Rooms where two dimensions share a mode have the worst pile-ups; treat the lowest modes with corner bass traps.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
