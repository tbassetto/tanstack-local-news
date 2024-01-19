# Tanstack and search-params

This is a demo to investigate a possible bug in Tanstack Router.

The app works as expected, but try modifying `src/app.tsx` to use `qs` (uncomment line `4`, `12` and `13`) and using `navigate()` changes its behavior and clicking on checkboxes returns 404 pages.
