# Winnow

**Paste your `.gitignore` and a file tree — see exactly what git keeps, what it drops, and which rule decided.**

Winnow is a single-file, zero-dependency `.gitignore` playground and debugger that runs entirely in your browser. Paste your ignore rules on the left and a list of paths on the right; Winnow reproduces git's real matching semantics and shows, for every path, whether it's **tracked** (green) or **ignored** (struck-through grey) — and crucially *which rule line decided it*, in `git check-ignore -v` style.

## Why it's cool

Every developer has fought "why is this file *still* ignored / *still* tracked?" and reached for `git check-ignore -v` — which needs a real repo and a terminal. Winnow makes that decision visible on any hypothetical tree, no repo required. Each path lights up with its verdict and deciding rule inline, clicking a rule highlights every path it governs, and it explicitly flags the most common `.gitignore` footgun: **a `!file` negation that can never win because the file's parent directory is already excluded** (git never descends into an ignored directory). When it catches that trap, it proposes the concrete `dir/*` rewrite and shows the corrected verdict live.

Named for winnowing — separating grain (tracked) from chaff (ignored).

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. Zero dependencies, zero build, zero network.

If you prefer a localhost URL:

```sh
python -m http.server
# then open http://localhost:8000/index.html
```

`file://` works fully, including the folder-drop feature.

## Controls & usage

- **Rules pane (left):** type or paste `.gitignore` rules. The parsed-rule list below updates live; **hover or click a rule** to light up exactly the paths it currently decides (others dim).
- **Paths pane (middle):** one path per line; end a line with `/` to mark it a directory. Or **drop a repo folder** onto the drop zone (or use *pick a folder*) to auto-populate the tree from a real repo — `.git/` is skipped and the list is capped at 1000 paths.
- **Result pane (right):** a collapsible tree where each entry shows its verdict. Click any path for its detail: the verdict, a copyable `git check-ignore -v` parity line, the full trail of rules tested (last match wins), and — when relevant — the footgun warning with its fix.
- **Presets:** the dropdown loads classic cases (node_modules & build artifacts, the negation-inside-ignored-dir gotcha and its fix, anchoring & double-star).
- **Diff mode:** paste a second ruleset (version B / *before*); paths whose verdict flips against your current rules (version A / *after*) get `→ ignored` / `→ tracked` badges.
- **Copy share link:** serializes rules + paths into the URL hash for a bookmarkable, offline proof link. Very large trees are excluded from the link (the button disables) to avoid unusable URLs.
- **Self-test:** a fixed regression table runs on load; the header badge shows the pass count.

## Supported `.gitignore` semantics

- Leading `/` anchoring; trailing `/` directory-only match
- `*` (within a path segment), `?` (single char), character classes `[a-z]` / `[!abc]`
- `**` — leading `**/`, trailing `/**`, and middle `a/**/b`
- `#` comments, `\#` / `\!` escaping, blank-line skipping
- Last-match-wins evaluation with `!` negation
- Git's parent-directory short-circuit: a file inside an ignored directory stays ignored regardless of later negations

## Limitations

Winnow implements a faithful, well-tested *subset* of git's pathspec matching — the rules developers actually hit. It does not consult a real index or nested `.gitignore` files, and a few exotic fnmatch corners are out of scope. Verdicts are computed against the paths you provide, treated as if rooted at the repo root.

## License

MIT © Alex Wictor — see [LICENSE](LICENSE).
