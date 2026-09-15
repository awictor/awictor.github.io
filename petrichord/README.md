# Petrichord

**Rain playing a tuned harp of Karplus-Strong strings — pluck it, or let the weather play it for you.**

A single-screen, zero-dependency WebAudio instrument: a vertical zither of tuned
strings, each voiced by a real Karplus-Strong delay line. Play it by hand like a
kalimba, or turn on the rain and let seeded weather perform a slow generative
shimmer. The whole configuration serializes to the URL, so any "weather" is
shareable by link.

## Why it's cool

Petrichord is a genuinely correct physical-modeling synth dressed up as an
ambient toy. Each string is a plucked-string model — a white-noise burst driven
into a tuned feedback delay with a one-pole lowpass damper — not a sample.

- **Pluck position shapes timbre, physically.** Where you click along a string
  sets the excitation comb: strike high (near the "bridge") and you get a bright,
  twangy burst; strike low (mid-string) and it's round and dark — exactly how a
  real string responds to where it's plucked.
- **Rain becomes a performer.** Seeded raindrops fall and splash onto whatever
  string they land on, so the array self-plays. Same seed, same weather — every
  time.
- **No build, no deps, no files.** The entire DSP (a reused 16-voice pool plus a
  recorder) runs in an inline AudioWorklet built from a Blob at runtime. One
  `index.html`, nothing else.

## Run it

Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). No build
step, no server, no network, no dependencies.

```
# optional — serve it locally
python3 -m http.server 8000
# then open http://localhost:8000
```

Click anywhere once to start audio (browsers require a user gesture before sound).

## Signal path

```
noise burst (comb-shaped by pluck position)
  -> fractional-length tuned delay line (allpass tuning correction on the fraction)
  -> one-pole lowpass damper inside the feedback loop (brightness)
  -> loop gain (sustain/decay)
  -> equal-power pan by string position
  -> stereo ping-pong feedback reverb (Space) + dry
  -> analyser (oscilloscope) + recorder -> output
```

Fractional delay length keeps the high strings in tune (allpass coefficient
`c = (1 - frac) / (1 + frac)`); rain strikes get per-drop detune and velocity so
they never sound mechanical.

## Controls

| Control | What it does |
|---|---|
| **Rain** (button / Space) | Toggles generative rain that plays the array |
| **Scale** | Major/Minor Pentatonic, Dorian, Lydian, Kumoi, Hirajoshi, Whole Tone |
| **Root** | Transposes the whole array |
| **Strings** | Number of tuned strings (7–34) |
| **Sustain** | Karplus-Strong loop gain — how long strings ring |
| **Brightness** | Loop lowpass cutoff — darker to brighter tone |
| **Rain** (slider) | Raindrop density |
| **Spread** | How wide across the array drops fall (low = clustered center) |
| **Space** | Reverb wet amount |
| **Seed** | RNG seed for the rain — pin a reproducible "weather" |
| **Record** (button / `r`) | Captures the live master bus to a 16-bit stereo WAV (auto-saves at 5 min) |
| **Copy link** | Copies the full state as a shareable URL |

### Playing by hand

- **Click or drag** across the string field to strum.
- **Vertical position** sets the pluck point: top of a string = bright bridge
  pluck, bottom = round center pluck.
- The struck note names itself briefly at the top of the string.

## Shareable weather

Every control writes to the URL hash, so a link fully restores the instrument —
scale, root, string count, sustain, brightness, rain density, spread, space, and
seed. Copy the link, send it, and the recipient hears the same weather. Truncated
or hand-edited links fall back to safe defaults.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
