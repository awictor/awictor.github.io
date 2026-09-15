# Music Interval 🎼

Find the **interval name and semitone distance** between two notes, ascending within an octave. Single HTML file, fully offline, nothing leaves your device.

## Why

Intervals are the alphabet of harmony — chords, scales, and melodies are all spelled from them. Naming the gap between two notes (is C→A a 6th? A→C a 3rd?) is a constant beginner stumbling block. This names it instantly and labels the quality.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/music-interval/
- Pick the **from** and **to** notes.
- Read the interval name, the semitone count, and the quality (perfect / major / minor / tritone).

## How it works

- Distance = (to − from) in semitones, wrapped into one octave (0–12).
- 7 semitones is a perfect 5th, 4 a major 3rd, 3 a minor 3rd, 6 the tritone.
- Because it wraps ascending, A up to C reads as a minor 3rd (3 semitones).
- Flats are accepted (Eb, Bb…) and mapped to their enharmonic sharps.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
