# Columns

**Align delimited text into neat columns** — paste rows of delimited data (spaces, commas, tabs, pipes, or a custom character) and get it padded so every column lines up, like `column -t`. Left or right align. One offline HTML file, no signup, no tracking.

👉 **[Open Columns](https://awictor.github.io/text-columns/)**

## Features
- Delimiters: whitespace, comma, tab, pipe, or custom
- Adjustable gap between columns; left or right alignment
- Cells trimmed; ragged rows handled; **no trailing whitespace** when left-aligned
- Copy button; dark mode; 100% client-side; works offline

## Why
Aligning columns by hand is tedious, and not everyone has `column -t` handy. Columns turns messy delimited text into a clean, readable table you can paste into code comments, READMEs, or config. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`splitRows`, `colWidths`, `align`) are covered by headless tests — delimiter splitting, exact left/right output, equal column offsets, no-trailing-space, and ragged rows; CI runs them on every push.

## License
MIT © Alex Wictor
