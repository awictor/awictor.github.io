# NoteFrequency

**Musical note ⇄ frequency & tuning** — convert notes to frequencies (equal temperament, adjustable A4) and turn any frequency into the nearest note with cents-off for tuning. One offline HTML file, no signup, no tracking.

👉 **[Open NoteFrequency](https://awictor.github.io/note-frequency/)**

## Features
- Note (A4, C#5, Eb3…) → frequency in Hz
- Frequency → nearest note + cents sharp/flat (a simple tuner readout)
- Adjustable reference pitch (A4 = 440, 432, …)
- Dark mode; 100% client-side

## Why
Synth patches, instrument tuning, and DSP all need the note↔frequency mapping, and "how many cents off am I?" is the tuner question. NoteFrequency does both with exact equal-temperament math, offline. Pairs with [BpmDelay](https://awictor.github.io/bpm-delay/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`noteToMidi`, `midiToName`, `noteToFreq`, `freqToNote`) are covered by headless tests — note↔MIDI, A4=440 with octave doubling, middle C, adjustable pitch, cents detuning, note→freq→note round-trips, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
