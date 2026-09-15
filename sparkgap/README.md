# Sparkgap

A single-page Morse telegraph station: type it, hear it, key it, share it.

Sparkgap is a self-contained, zero-dependency Morse code station that lives in one HTML file.
Type text and watch it turn into properly-timed Morse; hear it as clean dits and dahs at a chosen
WPM; flip to key mode and send by hand while an adaptive decoder reads your fist back into text;
then drop the whole message into a link that replays note-for-note. No build step, no libraries,
no network.

## Why it's cool

Most Morse toys either translate text *or* beep. Sparkgap is a whole station in one file, and the
standout piece is the **adaptive-threshold decoder**: hold the key by hand and it learns your dit
length on the fly — no calibration screen — classifying presses into dits/dahs and gaps into
letter/word breaks, decoding live. Pair that with a real WebAudio oscilloscope of the tone envelope,
a Paris-standard 1:3:7 timing engine, and shareable replay-by-URL, and it feels like actual
equipment.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into Chrome/Firefox/Safari.
No server, build, or network required.

Click **SEND** once first: browser autoplay policy requires a user gesture before audio can start.

## Controls

**Transport**
- **SEND** — play the message box as Morse (also resumes audio on first use).
- **STOP** — halt playback (dimmed when nothing is playing).
- **COPY REPLAY LINK** — copy a URL with the message baked into the hash; open it anywhere to reload
  the exact text. Falls back to the address bar if the clipboard API is unavailable (e.g. Firefox on
  `file://`).
- **EXPORT WAV** — render the current message to a 16-bit PCM `.wav` and download it.

**Keying**
- **KEY MODE** toggles between *Straight Key* and *Iambic Paddle*.
- *Straight Key*: hold **SPACE** (or press-and-hold the on-screen key) to send. The adaptive decoder
  reads your keying into the **DECODED** box live.
- *Iambic Paddle*: hold **← / →** (or the on-screen DIT/DAH pads). Squeeze both to alternate. The
  **Keyer** selector switches between Mode A and Mode B.
- **CLEAR DECODE** wipes the decoded text and element history.

**Sliders / options**
- **SPEED** — 5–40 WPM (Paris standard).
- **SIDETONE** — tone pitch, 300–1000 Hz.
- **KEYER WEIGHT** — 35–65% mark/space split for the paddle keyer (element period stays constant).
- **Farnsworth** — stretches inter-character/word spacing while keeping character speed high.

## How the decoder and share link work

- **Adaptive decoder**: it keeps a running estimate of your dit length and derives every threshold
  from it — presses shorter than ~2 dits are dits, longer are dahs; gaps over ~2 dits end a
  character, over ~5 dits end a word. It tracks keydown/keyup *edges* only, so keyboard auto-repeat
  is ignored. Each decoded element is colored by confidence (green / yellow / red), and the scope
  overlays the live dit estimate plus the dit/dah and gap thresholds as moving markers. The `hint`
  line under the decoded box shows the current numbers.
- **Share link**: the message box is serialized into the URL hash (`#m=...`) on every edit using
  `history.replaceState`, so it never pollutes browser history. COPY REPLAY LINK hands you that URL;
  opening it auto-loads the message.

## Layout

Everything is in `index.html` — HTML, inline CSS (the brass-and-ink telegraph look), and inline JS
(Morse tables, timing scheduler, WebAudio graph, oscilloscope render loop, adaptive decoder, iambic
keyer, WAV encoder, URL-hash share). No other files.

## License

MIT — see [LICENSE](LICENSE).
