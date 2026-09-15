# ◈ Diphone

**Sing with your cursor — a formant vowel-space choir synth in one HTML file.**

Diphone is a WebAudio "vocal tract" synth. It holds a sustained drone chord of
synthesized voice-like tones, and you shape their timbre by dragging a cursor
across a 2D vowel space. The four corners are the cardinal vowels (beet / bat /
boot / bought) and every point between them is a smoothly interpolated vowel —
so moving the cursor literally makes the chord *pronounce* vowels and glide
between them like a choir singing "aaa–eee–ooo."

## Why it's cool

Everyone recognizes the eerie "the machine is singing vowels" effect, but almost
no browser toy lets you *play* it by dragging. This is subtractive formant/speech
synthesis, not strings, additive partials, or FM: each voice is a band-limited
glottal buzz (sawtooth + a breath of noise, with vibrato) run through a bank of
three parallel bandpass "formant" filters whose center frequencies track your
cursor via bilinear interpolation. A live spectrum shows the F1/F2/F3 peaks
marching as you move, and an animated vocal-tract cross-section shows the tongue
and lips morphing with the sound. You can hear *and see* why a vowel is a vowel.

## Run it

No build step, no server, no dependencies.

```
# just open the file
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or double-click `index.html`. Then click **Enter the choir** to start audio
(browsers block autoplay until a user gesture). Best with headphones.

Works in any modern browser (Chrome, Edge, Firefox, Safari).

## Controls

- **XY pad** — drag anywhere to pronounce and slide vowels in real time. Corners
  are EE (beet), OO (boot), AA (bat), AW (bought).
- **On-screen keys / QWERTY row** — play a melody while you shape vowels. The
  keyboard row maps `A W S E D F T G Y H U J K O L P` to semitones.
- **Root / Chord / Voice** — pick the root note, a chord shape (single, octave,
  power, major, minor, sus4), and a voice type (Bass, Tenor, Alto, Soprano) that
  re-maps the formant tables and pitch range.
- **Vibrato / Master / Tempo** — live numeric readouts next to each slider.
- **Vowel chips (A E I O U)** — glide the cursor to a canonical vowel position.
- **Sequence** — a 2–6 step vowel sequence the auto-sing path glides through in
  tempo. Click any step chip to cycle its vowel (`⇅`); use `+ / –` to resize it.
- **Auto-sing** — hands-free mode that phrases the sequence on its own, with a
  plosive noise burst at each step so it "speaks" syllables.
- **Record / Play / loop** — capture your cursor path plus note events, then loop
  it back. A live timer shows elapsed record time.
- **Export WAV** — render the recorded phrase (or the current sound) to a
  downloadable WAV via `OfflineAudioContext`.
- **Share link** — the URL hash encodes the full patch (root, chord, voice,
  vibrato, cursor position, tempo, sequence, auto-sing) and any recorded gesture,
  so a patch is one link.
- **?** — reopen the intro / how-it-works overlay at any time.

## How it works (audio graph)

Per voice: `OscillatorNode (saw) + noise BufferSource → 3× BiquadFilter (bandpass)
→ gain → master → WaveShaper (soft limiter) → AnalyserNode → destination`, with a
sine LFO on `detune` for vibrato and a short feedback delay on the master bus for
body. Voice count is capped at four (oldest-note stealing). Formant center
frequencies are bilinearly interpolated across the four corner-vowel F1/F2/F3
tables, scaled per voice type.

## License

MIT © Alex Wictor
