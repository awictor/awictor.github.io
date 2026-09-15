# Selvage

**Watch a single flipped bit heal itself — the self-mending edge of Hamming(7,4).**

Selvage is a single-screen, zero-dependency interactive explainer for the Hamming(7,4)
error-correcting code, built around the classic three-circle Venn diagram. Toggle 4 data
bits; Selvage computes the 3 parity bits so every circle holds an even number of ones. Then
click any of the 7 transmitted bits to corrupt it — and watch the decoder light up exactly
which parity circles went "odd," read off the 3-bit syndrome, point straight at the guilty
bit, and flip it back.

Named for the *selvage* — the self-finished woven edge that keeps fabric from unraveling —
because that is exactly what parity bits do for data.

## Why it's cool

Error-correcting codes feel like magic. Selvage makes the magic legible in one screen. The
Venn diagram turns abstract XOR parity into something you can count on your fingers (every
circle must stay even), and the click-to-break-then-watch-it-heal loop lands the payoff a
textbook can't. The syndrome-as-binary-address trick — the failed checks literally spell the
broken bit's position in binary — is the genuine "oh, *that's* why it works" moment. Every
number on screen is honest single-digit XOR parity; nothing is faked.

## Features

- **Live encoder** — toggle the 4 data bits (d₃, d₅, d₆, d₇); parity bits p₁, p₂, p₄ are
  auto-computed so each Venn circle stays even. The invariant is shown live.
- **Canonical Hamming Venn layout** — three overlapping circles, one per parity check; data
  bits sit in the overlaps, and the center bit belongs to all three.
- **Click (or keyboard) to break a bit** — inject an error into any transmitted bit; the
  circles that now hold an odd count flash "odd."
- **Syndrome readout** — the three pass/fail checks form a binary number s = (s₄ s₂ s₁) that
  *is* the position of the broken bit.
- **Decode & correct** — the located bit pulses, flips back, and every circle returns to even,
  with a plain-language explanation of why.
- **Corrupt me / Reset** — inject a random single-bit error for instant gratification, or clear
  it.
- **Spot the culprit puzzle** — a hidden random error; guess the broken bit before the syndrome
  is revealed, then heal it.
- **SECDED mode** — add the 8th overall-parity bit to demonstrate double-error *detection* vs.
  single-error *correction*. Break two bits to reach the "detected but uncorrectable" state.
- **No-code baseline** — send the raw data bits with no parity and see that the receiver has no
  way to detect a flip. Shows exactly why the redundant bits earn their keep.
- **Shareable URLs** — the full state (data bits, error positions, SECDED, puzzle answer) is
  encoded in the URL hash for reproducible scenarios. (Sharing works best when the page is
  served over http rather than opened via `file://`.)

## Run it

No build step, no dependencies, no network calls.

```
# just open the file
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or double-click `index.html`. Any modern browser works.

To use shareable links, serve it over http instead of `file://`:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls & usage

1. **Set the message.** Click the data-bit toggles (d₃, d₅, d₆, d₇). Parity bits recompute so
   every circle stays even.
2. **Break a bit.** Click any bit in the diagram — or Tab to focus one and press `Enter` /
   `Space`. Its circles flash "odd."
3. **Read the syndrome.** The three syndrome digits (s₄ s₂ s₁) form a binary number that points
   at the broken bit's position.
4. **Heal it.** Hit **Decode & correct** — the culprit flips back and every circle is even
   again.
5. **Explore.** Try **Corrupt me** for a random error, **New puzzle** to test yourself, the
   **SECDED** toggle to break two bits, or **No-code baseline** to see life without parity.

Hovering an equation or a syndrome digit cross-highlights its circle, its covered bits, and its
syndrome bit together.

## How Hamming(7,4) works

A 7-bit codeword carries 4 data bits and 3 parity bits, one parity bit per Venn circle. Each
parity bit is the XOR of the data bits in its circle, chosen so the circle holds an *even*
number of ones (even parity).

On receipt, you recompute each circle's parity. A circle that comes out *odd* has failed its
check. Write the three checks as a binary number — s₄ s₂ s₁ — and that number is exactly the
position (1–7) of the flipped bit. Flip it back and you've corrected the error. If no circle
fails, the syndrome is 0 and the message is intact.

Hamming(7,4) corrects **any single-bit error**. Adding an 8th overall-parity bit (SECDED)
lets it additionally **detect** any double-bit error, though it can't locate and correct those.

## License

MIT — see [LICENSE](LICENSE).
