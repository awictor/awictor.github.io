# Palindrome Checker

Check whether a word or phrase is a **palindrome** — reading the same forwards and backwards, ignoring case, spaces and punctuation — and find palindromic words in any text. One offline HTML file, no signup, no tracking.

👉 **[Open Palindrome Checker](https://awictor.github.io/palindrome/)**

## Tests
```
node tests/selftest.mjs
```
Pure functions (`normalize`, `reverse`, `isPalindrome`, `findPalindromicWords`) are covered by headless tests — normalization, reversal, the classic phrase, simple words, single/empty edge cases, numeric palindromes, word finding with min-length and dedupe, case-insensitivity, and exclusion of non-palindromes. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
