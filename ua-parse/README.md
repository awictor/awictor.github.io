# UAParse

**User-agent string parser** — paste any user-agent and see the browser, version, operating system, rendering engine, device type, and whether it looks like a bot. One offline HTML file, no signup, no tracking.

👉 **[Open UAParse](https://awictor.github.io/ua-parse/)**

## Features
- Browser + version (Chrome, Firefox, Safari, Edge, Opera, Samsung Internet, IE)
- OS + version (Windows with NT-name mapping, macOS, iOS, Android, Chrome OS, Linux)
- Rendering engine (Blink, WebKit, Gecko, Trident) and device type (mobile / tablet / desktop)
- Bot / crawler detection; one-click "use my browser"; dark mode; 100% client-side

## Why
Log files and analytics are full of user-agent strings, and eyeballing them is tedious and error-prone (Edge hides inside a Chrome UA, iPads look like iPhones). UAParse applies the right precedence rules and shows the answer instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `parseUA` function is covered by headless tests over canonical UA strings — Chrome/Windows, Safari/iPhone, iPad-as-tablet, Firefox/macOS, Edge-before-Chrome precedence, Android phone vs tablet, Googlebot, legacy IE11, and empty input. CI runs them on every push.

## License
MIT © Alex Wictor
