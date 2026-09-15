# Vernier

**Watch a vector ratchet its way to any angle — and see how your calculator computes sine with no multiply, just shifts and adds.**

Vernier is a single-file, zero-dependency canvas explainer for **CORDIC** (COordinate Rotation DIgital Computer) — the algorithm real calculators, FPGAs, and DSP chips use to compute `cos`, `sin`, and magnitude *without a hardware multiplier*.

## Why it's cool

Every developer has typed `Math.sin` without wondering how the silicon actually does it. The answer is surprisingly elegant: a table of ~12 `arctan` constants plus shifts and adds. No Taylor series, no lookup of sine values, no multiplier. Vernier lets you drag, step through, and verify that against the real library value in real time.

Drag a target angle around a unit circle and the vector zig-zags toward it — at each step it rotates by exactly `±arctan(2⁻ⁱ)`, a rotation that on real hardware is just a bit-shift and an add:

```
x' = x − d·(y >> i)
y' = y + d·(x >> i)
z' = z − d·arctan(2⁻ⁱ)
```

The running angle over- and undershoots the target and homes in like a vernier scale. When the dust settles, the vector's coordinates **are** `(cos θ, sin θ)` — scaled by the fixed CORDIC gain `K ≈ 1.6468`.

## Features

- **Rotation mode** → recovers `sin`/`cos` for a target angle. Drag the rim handle or use the fine slider.
- **Vectoring mode** → drives `y → 0` to recover `atan2(y, x)` and magnitude `|v|` from a dragged point.
- **Per-stage trace table** — iteration `i`, the `±` decision, the `arctan(2⁻ⁱ)` angle added, the accumulated angle, and `x, y`, with the currently-animating row highlighted.
- **Live bit-shift view** — the 17-bit binary of `x` and `y` with the low `i` bits shifted out highlighted in red, showing that each rotation really is `>> i` — the entire "multiply."
- **Fixed-point (Q15) mode** — a toggle that runs the engine with true integer arithmetic shifts, alongside honest quadrant pre-rotation covering the full `[-180°, 180°]` range.
- **Iteration slider (1–16)** — watch the result snap toward the true value as you add stages.
- **Error-vs-stages plot** — log-scale convergence (~1 bit per stage) with the current stage highlighted.
- **Live accuracy readout** — CORDIC vs. `Math.*` with the absolute error, so convergence is quantified, not just felt.
- **Shareable URL** — the target angle / point + iteration count are encoded in the location hash, so any converged state can be linked.

## Run it

No build, no dependencies, no network calls. Just open the file:

```
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

Or double-click `index.html`, or drag it into any modern browser tab.

## Controls

| Control | Action |
|---|---|
| Drag on the canvas | Set the target angle (rotation) or place the point (vectoring) |
| **angle θ** slider | Fine-tune the target angle in rotation mode |
| **stages n** slider | Number of CORDIC iterations (1–16) |
| Mode toggle | Switch between rotation (→ sin/cos) and vectoring (→ atan2/\|v\|) |
| **fixed-point (Q15)** | Run with true integer `>>` shifts instead of floats |
| **copy share link** | Copy a URL that reproduces the current state |

## Notes on the math

- **The gain `K`.** Each `±arctan(2⁻ⁱ)` rotation is done without normalizing the vector length, so the vector grows by a fixed factor `K = Π √(1 + 2⁻²ⁱ) ≈ 1.6468`. CORDIC compensates by dividing the final `x, y` by `K` (equivalently, starting `x` at `1/K`). Vernier shows both `K` and `1/K` in the readout.
- **Scope.** The core rotation stays in `[-90°, 90°]` where the `arctan` series converges; angles outside that range are handled with a quadrant pre-rotation (a ±180° shift with a sign flip) so the full `[-180°, 180°]` range is honest without special-casing the inner loop.

## License

MIT © 2026 Alex Wictor
