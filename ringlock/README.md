# Ringlock

**Drag the beacons, watch the fix lock — and learn why geometry, not just noise, decides where GPS thinks you are.**

Ringlock is a single-file, zero-dependency interactive explainer for GPS trilateration. Drag 3–4 beacons and a receiver around a canvas; each beacon draws a range ring, the rings' overlap pins the receiver's estimated position live, and a noise slider turns that crisp point into a visible cloud of uncertainty.

## Why it's cool

Most trilateration demos stop at "three circles cross here." Ringlock goes one layer deeper — to **geometric dilution of precision (GDOP)**, the thing working engineers actually care about. Drag the beacons into a tight cluster or a straight line and watch a fixed-noise fix turn to garbage: the error region balloons even though the signal noise never changed. That's the "oh, *that's* why GPS is worse in an urban canyon" moment, delivered in seconds.

It's honest math — real linear least-squares plus a Monte-Carlo simulation and an analytic covariance ellipse that agree with each other — small enough to read the whole source in one sitting.

## Features

- **Draggable beacons and receiver.** Each beacon's ring radius equals its true (noise-free) distance to the receiver, so the rings always cross at the truth.
- **Live least-squares fix.** A linear trilateration solver computes the position from the *noisy* ranges, drawn as a crosshair with a dashed residual line to the true position.
- **Noise slider.** Thickens each ring into a ±2σ band and spins up a ~200-point Monte-Carlo scatter of plausible fixes, so uncertainty becomes a visible blob.
- **2 / 3 / 4 beacon toggle.** 2 rings give two ambiguous crossings (tap to pick; add a 3rd to kill the phantom); 3 give a unique fix; 4 over-determine it and shrink the error.
- **Live GDOP gauge + analytic 2σ ellipse.** A color-banded gauge and a plain-language good/fair/poor verdict, backed by the covariance ellipse `σ²·(HᵀH)⁻¹`, so theory and the Monte-Carlo cloud line up.
- **Degenerate-geometry guard.** Collinear or coincident beacons are surfaced as "no unique fix," not NaN.
- **Shareable scenarios.** Beacon positions, receiver, noise, and beacon count round-trip through the URL hash — every configuration is a copy-paste link.

## Run it

No build step, no server, no network. Open `index.html` in any modern browser:

- Double-click `index.html`, or
- Drag it into a browser tab.

That's it.

## Controls

- **Drag** any beacon (B1–B4) or the green receiver dot to move it. The cursor shows a grab hint when it's over a draggable handle.
- **Scenario presets** — *Open sky*, *Urban canyon*, *Collinear* — jump to configurations that make the GDOP point in one click.
- **2 / 3 / 4** segmented control sets the beacon count.
- **Clock / signal noise** slider sets the per-range measurement error (in metres).
- **Monte-Carlo cloud** / **Analytic ellipse** checkboxes toggle those overlays.
- **Copy shareable link** writes the current scenario to the clipboard (falls back to the address bar where the clipboard API is blocked).
- In **2-beacon** mode, tap either crossing to mark it your pick vs. the phantom.

## Try these

- **Open sky vs. Urban canyon:** click each preset and watch GDOP go from ~1 to ~7 at the *same* noise setting.
- **Collinear:** click the preset (or line the beacons up yourself) to see the fix collapse to "no unique fix," then nudge one beacon off the line to recover.
- **Over-determination:** set 4 beacons, spread them out, and drag the noise up — the Monte-Carlo cloud stays tighter than with 3.

## How it works (the math)

- **Fix:** linearize the range equations against beacon 0 and solve the 2×2 normal equations `HᵀH x = Hᵀb` (least squares over all beacons).
- **GDOP:** `sqrt(trace((HᵀH)⁻¹))` where the rows of `H` are the unit line-of-sight vectors from receiver to each beacon.
- **Error ellipse:** eigen-decomposition of `σ²·(HᵀH)⁻¹`, drawn at 2σ.
- **2-beacon case:** explicit circle-circle intersection (two candidate points), since least squares is undefined there.
- Every `2×2` inverse is guarded against a near-zero determinant, so degenerate geometry surfaces as "no fix" instead of NaN.

## License

MIT — see [LICENSE](LICENSE).
