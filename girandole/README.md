# Girandole

**A spinning wheel of Euclidean rhythms — polymeter you can see turning.**

Girandole is a zero-dependency, single-file WebAudio drum machine built around the
Bjorklund (Euclidean) algorithm. Each track is a concentric ring; you dial in
`(steps, pulses, rotation)` and the algorithm spaces the pulses as evenly as possible
around the circle. Because rings can have different step counts, they drift in and out
of phase — true polymeter — while a single fixed playhead at the top of the wheel lights
and triggers each pulse as the rings rotate past it.

## Why it's cool

Euclidean rhythm sequencers are a well-loved CS/music crossover (Toussaint's *The
Euclidean Algorithm Generates Traditional Musical Rhythms*), but most are cluttered
plugins that need a DAW. Girandole distils the idea to one screen with no install and no
samples — every voice is synthesized live in WebAudio. The rotating-playhead-over-
concentric-rings view makes polymeter phase drift *visible*: you can watch two rings of
different lengths slide apart and slam back into alignment, which no step grid can show.
The whole kit encodes into the URL hash, so any groove you make is a shareable link.

## Features

- **Euclidean generator per track** — `(steps, pulses, rotation)` distributes pulses
  evenly around each ring (Bjorklund's algorithm).
- **Five synthesized voices** — kick, snare, closed hat, open hat, clave. Pure
  oscillator + filtered noise + envelope. No samples.
- **Concentric-ring visualization** with a single fixed top playhead; active pulses glow
  and fire their voice exactly as the sweep crosses them.
- **True polymeter** — rings of different step counts clock the same 16th-note tick, so
  they phase against each other. When all downbeats realign at the top, the whole wheel
  flashes and accents.
- **Global tempo + swing**, with a lookahead scheduler (scheduling note-ons against
  `AudioContext.currentTime`) for tight timing.
- **Tactile editing** — drag a ring to rotate it, scroll over a ring to add/remove
  pulses, click to select, click again to mute.
- **Presets + mutation** — named world grooves (tresillo, son clave, cascara, gahu), a
  Randomize button, and a Mutate button that nudges one track.
- **Shareable state** — the full kit (per-track voice/steps/pulses/rotation/mute plus
  tempo/swing) serializes into the URL hash and restores on load.
- **Bounce to WAV** — render a two-cycle loop offline and download it.

## Run it

No build, no server, no dependencies.

1. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
2. Click **Play**. Audio starts on that first gesture (browser autoplay policy).

That's it.

## Controls

**On the wheel**

- Drag a ring — rotate it (shifts the Euclidean pattern).
- Scroll over a ring — add / remove a pulse.
- Click a ring — select it; click the selected ring again to mute it.

**Side panel**

- **Play / Stop**, **Random** (randomize the whole kit), **Mutate** (nudge one track).
- **Tempo** and **Swing** sliders.
- **Preset** menu — load a named groove.
- **Copy link** — copy the current groove's URL to the clipboard.
- **Bounce WAV** — download a two-cycle render of the loop.
- Per-track **S** toggles solo; the selected/muted state shows on each chip.

**Keyboard**

| Key | Action |
|-----|--------|
| `Space` | play / stop |
| `1`–`5` | select track |
| `↑` / `↓` | add / remove a pulse |
| `←` / `→` | rotate the pattern |
| `[` / `]` | fewer / more steps |
| `m` | mute the selected track |
| `s` | solo the selected track |

## Share links

State lives entirely in the URL hash, so a link *is* the groove. Open one of these to
hear it (append the hash to your local `index.html` URL):

- Default kit — `#b120s12_0.16.4.0.0_1.16.2.4.0_2.16.8.0.0_3.8.3.2.0_4.16.5.0.0`
- Son clave — `#b96s18_4.16.5.0.0_0.16.4.0.0_1.16.2.4.0_2.16.8.0.0`
- Cascara — `#b132s20_4.16.10.0.0_0.16.3.0.0_1.16.2.4.0_2.8.4.0.0`

Hash format: `b<bpm>s<swing%>` then one `_`-separated group per track of
`voice.steps.pulses.rotation.mute`.

## License

MIT — see [LICENSE](LICENSE).
