# Design

How the app looks. For behavior, see [FEATURES.md](FEATURES.md).

## Feeling

A clinical quick-reference tool. Calm, legible and fast to read at a glance on a phone, often
one-handed. One thing in focus at a time.

## Key elements

- **Mobile first.** Designed for phone widths and scaled up for larger screens, never the
  other way around.
- **Date inputs** at the top: Senaste mens, Datum, and BF shown next to them.
- **Week wheel:** three columns side by side, like a dial.
  - The center column (current week) is in focus: full contrast, largest type.
  - The side columns (previous and next week) are smaller and faded, and fade out slightly at
    the screen edges, so it reads as a wheel that continues. Their values must stay fully
    readable.
  - Spinning animates the neighbour into the center.
- **Not a table.** Each column is a vertical stack of `label → value unit`, with gestational
  age (`12+3`) as the column heading.

## Icon

- A very simplified white silhouette of a pregnant person in profile, on the accent teal.
- `public/favicon.svg` is the source. `public/apple-touch-icon.png` (180×180, square corners
  because iOS rounds them) is rendered from it for the phone home screen.

## Tokens

To be defined (colors, type scale, spacing) as CSS custom properties in `src/styles/global.scss`.
