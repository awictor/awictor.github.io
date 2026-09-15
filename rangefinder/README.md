# Rangefinder

**See exactly what an npm semver range means — and which versions it lets in.**

Paste an npm-style version range (`^1.2.3`, `~2.0`, `1.x`, `1.2.0 - 2.3.4`, `>=1.5 <3 || 4.0.0`) and Rangefinder parses it, explains it in plain English, normalizes it to a canonical set of comparators, and plots the allowed intervals as shaded bands on a version number line. Paste or auto-generate candidate versions and each lights up satisfied (green) or excluded (grey), sorted, with the highest match called out.

## Why it's cool

Semver ranges are something millions of devs read daily and still second-guess. Does `1.3.0` actually satisfy `^1.2.3`? Why not `2.0.0`? Rangefinder turns the abstract string into a picture — you see the allowed band and watch versions fall inside or outside it, and clicking an excluded version tells you the exact comparator it failed. It's a shareable "here's proof your dependency pin is wrong" link.

## Features

- **Parses the real npm grammar** — caret `^`, tilde `~`, x-ranges (`1.x`, `1.2.*`), hyphen ranges (`a - b`), comparators (`>=`, `>`, `<`, `<=`, `=`, with or without a space after the operator), space-joined AND, and `||` unions. Partial versions expand correctly (`>1.2` → `>=1.3.0`).
- **Plain-English explanation** with the gotchas spelled out (e.g. `^0.2.3` locks to `0.2.x` with no minor bumps; `^0.0.3` pins the exact patch).
- **Canonical normalization** to a comparator set, plus a version number line with shaded allowed-interval bands and version ticks.
- **Candidate list** — paste versions or auto-generate a sample; correct semver sort, satisfied/excluded highlighting, and the highest satisfying pick. Invalid versions are flagged. Prereleases follow the common "only visible when a comparator names that release" rule.
- **Compare mode** — enter a second range to see the intersection interval and whether one range subsumes the other (equivalent / contained / overlapping / disjoint), with a copyable proof link.
- **Everything lives in the URL hash** — range, compare-range, and version list all serialize to the hash, so any state is a bookmarkable, shareable link.
- **Built-in self-test** — a fixed table of `(version, range) → expected` runs on every load as a regression guard.

Zero dependencies, single HTML file, works offline. Keyboard-accessible chips and gallery, responsive number line.

## Run

Open `index.html` in any modern browser — double-click it or drag it into a tab. There is no build step and no server.

```
# or serve it locally if you prefer
python -m http.server 8000   # then visit http://localhost:8000/index.html
```

## Usage

- **Semver range** — type a range in the top box. Malformed input shows a live parse error; otherwise you get the English explanation and canonical form.
- **Auto-fill sample versions** — generates a handful of versions around the range's lower bound so you immediately see hits and misses.
- **Candidate versions** — one per line. Chips sort and colour themselves; hover, click, or Tab-focus a chip to see why it passed or failed.
- **Gotcha gallery** — click (or Tab + Enter) any preset to load it into the playground.
- **Compare with a second range** — fills in the intersection and subsumption verdict.
- **Copy link** — copies the current URL with all state encoded in the hash.

## Notes on scope

Rangefinder implements the widely-used subset of the semver spec: release versions plus basic prerelease precedence and the common prerelease-visibility rule. Build metadata (`+...`) is parsed and ignored for comparison, matching npm. The number line maps versions with a simple linear scale over the union of range bounds and candidates, so it's a visualization aid rather than a precise metric axis.

## License

MIT — see [LICENSE](LICENSE).
