# Perigon

**Draw a perfect circle in one stroke — get scored on how round your hand really is.**

Perigon is a zero-dependency, single-file browser game. You put down one continuous
freehand stroke with a mouse, trackpad, or finger. On release it fits the best-matching
true circle to your path and grades your roundness from 0 to 100 (S / A / B / C / D / F).

## Why it's cool

Most "draw a circle" toys just print a percentage. Perigon shows you the *geometry of your
error*. A **deviation rose** is painted over your fitted circle — a color band unrolled
around 360° that runs **warm where you bulged out** and **cool where you pinched in**, so
you can literally see the shape of your own imperfection. Your personal best is ghosted
behind every attempt as a faint reference ring, a sparkline tracks your recent runs, and a
one-line share hash lets you dare someone to beat your score.

## Features

- **One-stroke freehand input** — pointer events cover mouse, trackpad, and touch on a
  full-screen canvas.
- **Best-fit circle analysis** — computes the stroke's centroid and mean radius, then the
  per-point radial deviation. Roundness is `100 · (1 − stddev/meanRadius)`, adjusted for
  closure and angular coverage, then clamped to 0–100.
- **Fairness guards** — a scribble or a tiny arc doesn't win. A score requires a minimum
  radius, near-full angular sweep (~360°), and a start/end closure check.
- **Deviation rose** — residuals binned by angle and smoothed, drawn as a warm/cool polar
  band over the fitted ring.
- **Personal-best ghost + replay race** — your best stroke ghosts behind each attempt and
  animates chasing your new one after you draw again.
- **Daily challenge** — a seeded target ring for the day. Your score blends roundness with
  how well your fitted circle matches the target's center and radius, plus a local day-streak
  counter.
- **Multisensory feedback** — a live Web Audio tone whose pitch tracks stroke steadiness
  (wobble = warble), a resolve chord on high grades, and a haptic pulse on reveal. All of it
  is behind a persistent **Sound** toggle in the top bar.
- **Persistence + sharing** — best score and recent history live in `localStorage`;
  results export to a PNG card or a shareable URL hash.

## Run it

No build step, no server, no dependencies.

- **Open `index.html` directly in any modern browser** — double-click it, or drag it into a
  tab.
- Or, if you prefer serving it (nicer clipboard behavior on some browsers):
  ```
  python3 -m http.server 8000
  ```
  then open <http://localhost:8000/>.

## Controls

- **Draw** — press and drag one continuous circle, then release to be scored.
- **Free / Daily** — switch modes in the top-right. Daily gives everyone the same seeded
  target ring for the day.
- **Sound** — toggle audio + haptics; the choice is remembered.
- **Save PNG** — download a result card (circle + deviation rose + grade).
- **Copy link** — copies a challenge URL encoding your score for a friend to beat.
- **Draw again ↺** — replays the ghost race, then clears the canvas for your next attempt.

## Scoring notes

- **Closure** — how close your start and end points are, relative to your radius.
- **Coverage** — how much of a full 360° your stroke actually swept.
- **Steadiness** — inverse of the average turn-angle jitter along the stroke.

## Share-hash format

The share link appends `#c=<base64>` where the payload is
`{ s: score, g: grade, m: mode, t: streak }`. Loading a link with that hash shows the score
to beat.

## License

MIT — see [LICENSE](LICENSE).
