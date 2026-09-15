# Filament

**Watch the electrical current arc through an Enigma machine, one keystroke at a time.**

The Enigma cipher wasn't math — it was an electrical circuit. Filament renders it as
exactly that. Press a key and a glowing filament of "current" traces the full signal
path: keyboard → plugboard → rotors III→II→I → reflector → back through the rotors →
plugboard → lamp. The rotors step *before* the current flows, so the machine's famous
mechanical quirks — the double-step, the fact that no letter can ever encrypt to itself —
stop being trivia and become things you literally see happen.

One self-contained `index.html`. No dependencies, no build, no network.

## Why it's cool

Most Enigma demos are black-box letter mappers. Filament turns the cipher back into the
physical circuit it was and lets you watch the current thread through the rotor wiring and
bounce off the reflector. The whole machine state plus your message live in the URL hash,
so a settings link *is* a reproducible two-way cipher: paste the same link and the
ciphertext decrypts back to plaintext.

## Features

- **Animated signal path** — every keypress traces the current across an 11-column
  schematic (keyboard, plugboard, three rotors, reflector, back again, lamp). Speed slider
  plus a scrub slider to move a spark along the path and freeze any stage.
- **Historically correct engine** — rotors I–V with real wiring and notches, reflectors
  UKW-B / UKW-C, ring settings (Ringstellung), starting positions, and accurate stepping
  including the double-step anomaly, shown ticking in the rotor windows before current flows.
- **Live keyboard + lampboard** — the pressed key and the lit lamp glow; ciphertext builds
  up in traditional 5-letter groups as you type.
- **Click-to-wire plugboard (Steckerbrett)** — click two letters to connect a pair, click a
  wired letter to remove it; the wiring affects the traced path and the cipher.
- **Shareable, reproducible state** — rotors, rings, positions, reflector, plugboard, and
  message all serialize into the URL hash. The same link both encrypts and decrypts.
- **Insight callouts** — an on-load self-test against known Enigma vectors lights a
  "test vectors verified" badge, a live A–Z strip proves no letter maps to itself at the
  current rotor positions, and a per-keystroke readout spells out each stage
  (`A → plug → III → II → I → REF → … → lamp`).

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
That's the whole install. Everything runs locally in the page.

## Controls & usage

- **Type** on your physical keyboard, or click the on-screen keys.
- **Presets** — three one-click setups auto-run so you immediately see current arc:
  - *Historical B-Dienst* — rotors I-II-III, no plugboard.
  - *Plugboard-heavy* — rotors II-IV-V with six plug pairs (encrypts `HELLOWORLD` → `MZIVUHWQPN`).
  - *Double-step demo* — positioned to fire the double-step within a few keystrokes.
- **Rotor order / reflector / rings / start pos** — change any of them; the machine resets
  and the URL hash updates.
- **Scrub path** — drag to move the spark along the last traced path and inspect each stage.
- **Animation speed** — slows the filament down so you can follow the transformation.
- **Clear** — reset the message (keeps your machine settings).
- **Copy ciphertext** — copies the raw (ungrouped) cipher text.
- **Copy shareable link** — copies a URL that reproduces the exact machine state and message.
  Works on `http(s)://` and `file://`; if the browser blocks the clipboard, the value is
  shown so you can copy it manually.
- **Decrypt back ↺** — re-runs the ciphertext through the *same* settings to demonstrate
  Enigma's reciprocity (ciphertext → original plaintext).

## How to read the traced circuit

Each column in the schematic is a wiring interface, left to right:

```
KB → plug → III → II → I → REF → I → II → III → plug → LMP
```

Current enters at the keyboard (KB), crosses any plugboard swap, passes forward through the
three rotors (right to left, III→II→I), hits the reflector (REF), returns back through the
rotors in reverse, crosses the plugboard again, and lights a lamp (LMP). Because the
reflector must send the signal back out on a *different* contact than it came in, a letter
can never map to itself — the flaw that handed codebreakers a reliable crib. The live A–Z
strip proves it at whatever rotor positions the machine is currently in.

### The double-step

Enigma's stepping isn't a clean odometer. When the middle rotor sits on its notch, it steps
itself *and* the left rotor on the next keypress — so the middle rotor advances on two
consecutive keystrokes. Filament fires a **DOUBLE STEP** flag and shows the windows ticking
so you can watch the anomaly happen instead of reading about it.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
