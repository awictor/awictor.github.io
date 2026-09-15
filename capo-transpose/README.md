# Guitar Capo Key 🎸

Find the **key your chord shapes actually sound in** with a capo on — or the capo position to play any key with easy open shapes. Single HTML file, fully offline, nothing leaves your device.

## Why

A capo lets you keep familiar open-chord shapes while playing in a harder key — but working out what you're *actually* in (or where to clamp to match a singer) is a semitone-counting chore. This does it instantly, both directions.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/capo-transpose/
- Pick the **chord shape** you're fingering (C, A, G, E, or D).
- Set the **capo fret**.
- Read the key it sounds in, the shape played, and the semitone shift.

## How it works

- A capo raises every string by one semitone per fret, so the shape sounds in a higher key.
- Sounding key = shape key transposed up by the capo fret (wrapping around the 12-note chromatic scale).
- To find where to capo: the fret equals the semitone gap from your shape key to the target key.
- Chord quality (major/minor) is unchanged; only the pitch moves. Capo 12 sounds an octave up in the same key.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
