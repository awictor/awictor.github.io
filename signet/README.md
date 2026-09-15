# Signet

**A seeded press that mints a molten blob of sealing wax, impressed with an engraved signet device — rake the light and watch the relief catch.**

Signet turns any name or seed into a physical-looking wax seal: an irregular molten blob with a raised rim, glossy sheen, and gravity drips, stamped with a committed intaglio device and a Latin motto ring. Every seal lives in the URL hash, so it's fully deterministic and shareable by link. One file, no build, no network.

## Why it's cool

- The molten blob + rake-light emboss reads as genuinely tactile even though it's flat Canvas 2D — the device is a heightfield with light-shifted highlight/shadow copies, and dragging re-rakes the whole seal live.
- Every seal is a permalink. Copy the link, send it, and the recipient sees the exact same stamp.
- Zero dependencies. Open the file and it runs — offline, from `file://`, anywhere.
- Export a transparent PNG or a layered, spec-clean SVG (blob path, gradients, border rings, device paths, motto on a `<textPath>`).

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. That's the whole setup.

Optional local server (not required):

```sh
python -m http.server
# then visit http://localhost:8000
```

## Controls

- **Device** — the impressed mark: *Entwined monogram*, *N-fold rosette*, *Emblem silhouette*, or *Merchant's mark*. The Monogram and Emblem inputs dim out when the current device doesn't use them.
- **Monogram** — 1–3 initials for the monogram device.
- **Emblem** — bee, key, anchor, crescent, oak sprig, quill, or star (used by the emblem device).
- **Motto ring** — text set on a circular path around the device. Leave it blank to omit.
- **Border** — beaded, rope-twist, dotted, or plain, with **Rings** (1–3) concentric bands.
- **Wax color** — vermilion, oxblood, forest, navy, plum, black, or ivory. (Ignored — and dimmed — for metallic materials.)
- **Material** — solid, marbled (reveals a **second tone** picker), gold leaf, or silver leaf.
- **Ground** — parchment, kraft, envelope flap, or transparent (for a clean PNG cutout).
- **Blob raggedness / Drips / Depth** — reshape the wax outline, drip count (0–3), and impression depth.
- **Glossy finish** — specular sheen on/off.
- **Auto-orbit light** — circles the light source automatically (or drag the seal to aim it yourself).

**Buttons:** *Press a new seal* (new random seed, re-rolls everything) · *Reshape* (re-rolls only the blob shape, keeps device/color/motto) · *Re-stamp* (replays the press animation) · *Copy link* · *Export PNG* · *Export SVG*.

Drag anywhere on the seal to rake the light and make the relief glint.

## Permalink format

All state is encoded in the URL hash as query parameters, e.g.:

```
#seed=k3f9a2&device=monogram&mono=AW&motto=SEMPER%20FIDELIS&border=beaded&rings=2&color=vermilion&material=solid&ground=parchment&irr=48&drip=1&depth=70&glossy=1&foldSeed=48213
```

`seed` derives every default; the other keys override individual parameters. Out-of-range or corrupted values are ignored and fall back to the seed-derived defaults, so a truncated or hand-edited link still renders.

## License

MIT — see [LICENSE](LICENSE).
