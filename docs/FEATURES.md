# Features

What the app does. For how the code is structured, see [ARCHITECTURE.md](ARCHITECTURE.md). For
how it looks, see [DESIGN.md](DESIGN.md).

## Purpose and audience

A quick reference for **midwives and clinicians**. Given the first day of the last menstrual
period (LMP) and a later date, the app shows the gestational age and the reference values for
fetus and pregnant person at that age. The focus is on finding the values for *one* specific
age fast on a phone, not on browsing whole tables.

The UI is in Swedish (dates, weeks, messages). Measure labels keep the mixed wording below.

## Inputs

| Input | Default | Notes |
|---|---|---|
| **Senaste mens** (LMP) | empty | Picked with a date picker library. Nothing else is shown until it is set. |
| **Datum** (reference date) | today | Picked with a date picker library, or moved by spinning the wheel (F5). |

Results update live whenever either date changes. There is no submit button. The pickers can
navigate 2 years back and 2 years forward from today, and selecting a day closes the picker.

## F1 Days since LMP

- Complete calendar days from LMP to the reference date. The LMP day itself is day **0**.
- Computed from calendar dates only (time of day and DST never affect it).

## F2 Gestational age (weeks)

- Complete weeks = `floor(days / 7)`. The first week is week **0**.
- Displayed as `v+d`, e.g. `12+3` (12 complete weeks, 3 days).

## F3 Expected due date (BF)

- `LMP + 280 days`, shown as `YYYY-MM-DD`.
- Shown whenever LMP is set, even if the reference date is out of range.

## F4 Reference values

Six measures, shown in this order with these labels:

| # | Label | Unit | Value shape |
|---|---|---|---|
| 3 | symfys - fundusmått | cm | range: two whole numbers, `min–max` |
| 4 | CRL (crown rump length) | mm | single whole number |
| 5 | BPD - biparietaldiameter | mm | single whole number |
| 6 | fostrets vikt | g | single whole number |
| 7 | AD - abdominaldiameter | mm | single whole number |
| 8 | FL - femur length | mm | single whole number |

All values are whole numbers with no decimals. Numbers use Swedish formatting (e.g. `1 250`).

### Reference data

- Supplied manually by the project owner, one data file per measure (see ARCHITECTURE.md).
  **Agents must not invent values.**
- Today every entry is keyed by **complete week**. Each entry can also take an optional day
  (`week + day`), so finer granularity can be added later without changing the structure.
- **Lookup:** the entry used is the latest one that starts at or before the current
  gestational age. It covers the time until the next entry starts **or** until the end of its
  own week, whichever comes first. Weekly data therefore covers exactly its own week, and a
  missing week shows as "no data". It is never filled in from the week before.
- **No interpolation.** Only numbers that are in the data file are shown.
- **Start and end** come from the first and last entry in each file. There is no separate
  config for them.
- Each value shows the age of the entry it came from, e.g. `värden för 12+0`.
- Outside a measure's data, show `Ingen data` in its place, so the layout
  stays stable.
- The source is not shown in the UI, but it is written at the top of each data file.

## F5 Week wheel

- The main column shows the current week: F1, F2 and all F4 values.
- To the left and right, the previous and next week are shown with their F4 values and
  gestational age, less prominent. Their values line up with the center column's rows, so
  they show the value only, without the label or the `värden för` note.
- Swiping, tapping a side column, or pressing the previous/next buttons moves the
  **reference date** ±7 days. The buttons sit above the wheel, and on touch devices also below
  it. That date shows in
  the date picker, and F1/F2/F4 follow. The `+d` part stays the same.
- At the range limits the missing neighbour is shown empty, its button is hidden, and you
  can't spin past it.

## Validation

| Case | Behavior |
|---|---|
| LMP not set | Show only the inputs. |
| Reference date before LMP | Error `Datumet är före senaste mens`. No values, no wheel. F3 is still shown. |
| More than 42 complete weeks (later than 42+6) | Error `Utanför intervallet (max 42+6)`. No values, no wheel. F3 is still shown. |

## Acceptance criteria

- [ ] LMP = reference date → `0` days, `0+0`.
- [ ] LMP + 6 days → `6` days, `0+6`. LMP + 7 days → `7` days, `1+0`.
- [ ] Day counts are correct across a DST change and across a year boundary.
- [ ] BF = LMP + 280 days.
- [ ] Reference date before LMP → error, no values.
- [ ] `42+6` → values shown. `43+0` → error.
- [ ] With weekly data, `12+0` and `12+6` show the week-12 entry, labeled `värden för 12+0`.
- [ ] If week 13 is missing from a file, `13+x` shows `Ingen data` for that measure.
- [ ] Before a measure's first entry and after its last week → `Ingen data`.
- [ ] Symfys-fundusmått renders as `min–max cm`. The others render as `value unit`.
- [ ] Spinning to the next week sets the reference date to +7 days and the date picker shows it.
- [ ] At `0+x` there is no previous week. At `42+x` there is no next week.
- [ ] Every data file passes validation: entries sorted, no duplicate ages, whole numbers,
      `min ≤ max` for ranges, weeks within 0–42, day within 0–6.

## Possible future features (out of scope now)

- Cycle-length adjustment of gestational age.
- Ultrasound-corrected dating.
- Daily (or finer) reference data, which the structure already allows.
- Showing the data source in the UI.
- Dates in the URL so a result can be bookmarked or shared.
- An `Idag` button that resets the reference date to today.
