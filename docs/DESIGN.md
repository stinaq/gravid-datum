# Design

How the app looks. For behavior, see [FEATURES.md](FEATURES.md).

## Feeling

**Nordic clinical calm.** A clinical quick-reference tool. Calm, legible and fast to read at
a glance on a phone, often one-handed. One thing in focus at a time. Trustworthy without looking
like an old hospital system: warm off-white, deep teal, lots of whitespace, soft rounded corners.

## Key elements

- **Mobile first.** Designed for phone widths and scaled up for larger screens, never the
  other way around.
- **Date inputs** at the top: Senaste mens, Datum, and BF shown next to them.
- **Week wheel:** three columns side by side, like a dial.
  - The center column (current week) is in focus: full contrast, on a card, with labels and
    notes.
  - The side columns (previous and next week) show values only and are faded, and fade out
    slightly at the screen edges, so it reads as a wheel that continues. Their values must stay
    fully readable.
  - All columns use the same text size, so nothing grows or shrinks while it moves.
  - **Spinning is one continuous motion.** Each week keeps its own element and slides to its
    new slot, restyling on the way (card, fade). One more week waits just off-screen on each
    side to slide in. A drag follows the finger, and on release the wheel carries on from where
    it was let go. Every column has the center's width, so only its position animates and text
    never stretches.
  - **Previous/next buttons** are pill-shaped, each showing the neighbour's age with a chevron
    (`‹ 11+3`, `13+3 ›`). A missing neighbour has no button. They always sit above the wheel.
    On touch devices a second row sits below it, so the thumb reaches one from either end of
    the page. Desktop (a precise pointer) gets only the top row.
- **Not a table.** Each column is a vertical stack of `label → value unit`, with gestational
  age (`12+3`) as the column heading.
- **Labels vs. values vs. no data** must never look alike:
  - Labels are small, uppercase, letter-spaced, muted teal.
  - Values are large, bold ink.
  - No data is a quiet sage pill in the value's place.

## Icon

- A very simplified white silhouette of a pregnant person in profile, on the accent teal.
- `public/favicon.svg` is the source. `public/apple-touch-icon.png` (180×180, square corners
  because iOS rounds them) is rendered from it for the phone home screen.

## Tokens

CSS custom properties in `src/styles/global.scss`. Components use the tokens, never raw colors.

### Color

One palette. All text is teal-tinted ink, never neutral black or grey.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#F7F4EF` | Page background, warm off-white |
| `--color-surface` | `#FFFDF9` | Cards, inputs, the focused column |
| `--color-primary` | `#1F4E4A` | Deep teal: title, headings, input values, buttons, focus rings |
| `--color-text` | `#1B3633` | Body and value text |
| `--color-muted` | `#526863` | Labels and secondary text (AA on bg and surface) |
| `--color-sage` | `#9DB4A0` | Decorative only (hover borders). Too light for text |
| `--color-sage-bg` | `#E6EDE5` | No-data pill, selected date, pressed buttons |
| `--color-border` | `#E3E2D9` | Dividers and input borders |
| `--color-warm` | `#C66B4E` | Terracotta accent. Used sparingly |
| `--color-warm-text` | `#9A4A31` | Terracotta text: errors, today in the calendar |
| `--color-warm-bg` | `#F7E6DE` | Error background |

### Type

- Humanist sans-serif: Inter, then Source Sans 3 and IBM Plex Sans, then the system font. The
  fonts are not bundled, so the system font is what most devices show.
- Sizes: `--font-body` 1rem, `--font-small` 0.8125rem, `--font-tiny` 0.6875rem. Numbers use
  tabular figures.

### Shape and spacing

- Spacing: `--space-1` to `--space-6` (0.25–1.5rem).
- Corners: `--radius` 16px for cards and inputs, `--radius-small` 10px. Buttons and pills are
  fully rounded.
- One soft teal-tinted shadow (`--shadow`), only on the focused column.
