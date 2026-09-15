# Aloft

**Type a juggling pattern in siteswap. Watch it come alive.**

Aloft is a single-screen siteswap animator: a live juggling simulator driven by
the real mathematical notation jugglers actually use. Type a pattern like `531`,
`97531`, or `441` and watch balls arc between two hands with physically-scaled
throw heights, correct timing, and automatic hand assignment.

## Why it's cool

Siteswap is a beloved real notation among jugglers and math nerds, but almost
nobody has seen it *animate*. Aloft turns three cryptic digits into a hypnotic,
physically-plausible cascade instantly — paste `97531`, watch a five-ball
firework, and send the link to a friend. It's a genuine visualization of a
combinatorial idea and pure eye candy at the same time.

It's one self-contained HTML file: no build, no dependencies, no network.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
That's the whole install.

To serve it over HTTP instead (so the clipboard "Copy link" button works without
a `file://` fallback):

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## How siteswap works (30-second version)

Each digit is how many beats a ball stays airborne — bigger digit = higher throw.
Throws alternate between the right and left hand. The **average** of the digits
is how many balls the pattern needs (so `531` averages 3 → a 3-ball pattern).
`a`–`f` stand for throws of 10–15. Aloft handles **asynchronous vanilla siteswap**
only (no synchronous `(4,4)` or multiplex `[...]` notation).

A pattern is valid only if every ball lands on a distinct beat; Aloft runs that
check and explains in plain language when a pattern can't be juggled.

## Controls

- **Pattern field** — type any siteswap; the animation re-syncs live as you edit.
- **🎲 Random valid** — generates a guaranteed-valid pattern (3–5 balls).
- **⏸ Pause / ▶ Play** — stop or resume the animation. **Spacebar** toggles it too.
  Defaults to paused if your OS has "reduce motion" enabled.
- **Ladder** — toggles a scrolling causal-ladder diagram: two hand rails, colored
  throw arcs, and a "now" marker synced to the live juggle.
- **🔗 Copy link** — copies the current URL, which encodes the pattern, tempo, and
  ladder state, so anyone who opens it sees exactly what you built.
- **Tempo** — speed slider (0.4×–2.6×).

## Patterns to paste in

| Pattern  | Balls | What it is            |
|----------|-------|-----------------------|
| `3`      | 3     | 3-ball cascade        |
| `441`    | 3     | a classic 3-ball trick|
| `531`    | 3     | box-ish weave         |
| `552`    | 4     | 4-ball with a hold    |
| `4`      | 4     | 4-ball fountain       |
| `534`    | 4     | 4-ball crowd-pleaser  |
| `5`      | 5     | 5-ball cascade        |
| `97531`  | 5     | a tall 5-ball firework|

## License

MIT — see [LICENSE](LICENSE).
