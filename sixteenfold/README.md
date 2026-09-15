# Sixteenfold

**A Renaissance geomancy oracle in one HTML file. Ask a question; a deterministic PRNG casts sixteen lines in the sand, and the full Shield Chart is _derived_ — by binary math — exactly as the historical method prescribes.**

## Why it's cool

Geomancy is secretly binary math. Each of the 16 canonical figures is 4 bits (Fire · Air · Water · Earth), and the entire Shield Chart (*Scutum*) is built from the four Mothers by two operations a programmer will recognize instantly:

- **a matrix transpose** — the four Daughters are the Mothers read down their columns, and
- **an XNOR row-combine** — two figures merge row by row (rows differ → single point, rows match → double point) to produce the Nieces, the two Witnesses, the Judge, and the Reconciler.

So the oracle isn't hand-wavy randomness. Only the initial cast is stochastic (and even that is seeded), and everything after it is a pure function of the four Mothers. A given question + seed always yields the same chart — fully reproducible, and shareable by URL. It's an 800-year-old algorithm (Arabic *ʿilm al-raml* by way of Agrippa) that happens to be a clean little bit-manipulation exercise.

## Features

- **Deterministic cast.** Question + optional seed feeds an xmur3 → mulberry32 PRNG that casts 16 tally lines; each line's parity (odd = single point, even = double point) builds the four Mother figures.
- **Authentic Shield derivation.** Daughters by transpose; Nieces, Witnesses, Judge, and Reconciler by XNOR row-combine — all deterministic, no re-rolling.
- **All 16 canonical figures** encoded with their correct 4-bit pattern, Latin name, English gloss, one-line keyword, and nature (favourable / cautionary / mutable). Any derived pattern resolves to a real named figure.
- **A sober reading.** The Judge is the answer, read through its two Witnesses (right = how it came / the querent, left = how it goes / the matter), plus a favourability tally and a Part-of-Fortune parity note. Stated plainly, no fortune-cookie.
- **"Show the math"** toggle exposes the per-figure bits and the live transpose / XNOR derivation.
- **Shareable URL.** The question + seed are written to the URL hash; opening that link replays the identical chart. "Copy link" copies it (with a clipboard fallback for `file://`).
- **Built-in self-verification.** A badge (bottom-right) runs a battery on load: all 16 patterns resolve, combine is commutative + associative, transpose is an involution, thousands of random casts all produce valid figures, the Judge is always an even figure, and determinism holds. Click it for the detail.
- **Accessible + responsive.** Honours `prefers-reduced-motion`, adds a non-color nature cue (＋ / －) so the shield doesn't rely on red/green alone, and scales the shield down on narrow phones.
- **Zero dependencies**, no build step, no network — one self-contained file.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. There is no server or build step.

1. Type a **question**.
2. Optionally set a **seed** (any text — leave blank for a fixed default, or click **New seed** for a random one).
3. Click **Cast the sand**.

## Controls

| Control | What it does |
|---|---|
| **Cast the sand** (or Enter) | Cast and derive the full Shield Chart |
| **New seed** | Randomize the seed and re-cast |
| **Show the math** | Toggle the binary derivation (bits + transpose/XNOR steps) |
| **Copy link** | Copy a URL that replays this exact chart |
| Verify badge (bottom-right) | Show the self-verification results |

### URL / sharing

The cast is encoded in the hash, e.g. `index.html#q=Should%20I%20take%20the%20offer%3F&s=dawn-01`. Anyone who opens that link sees the same chart (no animation on replay). Append `?test` to the URL to auto-open the self-verification panel.

## How the derivation works

```
Mothers   M1..M4     cast from the parity of 16 tally lines (4 lines each)
Daughters D1..D4  =  transpose(M)              columns of the Mothers
Nieces    N1 = M1 ⊕ M2   N2 = M3 ⊕ M4          (⊕ = per-row XNOR)
          N3 = D1 ⊕ D2   N4 = D3 ⊕ D4
Witnesses Right = N1 ⊕ N2      Left = N3 ⊕ N4
Judge     J = Right ⊕ Left                     the answer
Reconciler R = J ⊕ M1
```

The Judge is always an *even* figure — a classic validity invariant of the chart, and one of the checks the self-verification badge asserts.

## License

MIT — see [LICENSE](LICENSE).
