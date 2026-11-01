# Architecture

How the code is structured and why. This document is feature-agnostic: for what the app does,
see [FEATURES.md](FEATURES.md).

## Decisions

| # | Decision | Why |
|---|---|---|
| A1 | Vite + React + TypeScript (`strict`) | Fast setup. Types document the contracts between layers. |
| A2 | Three layers: `components/` (dumb UI), `core/` (all logic), `App.tsx` (wiring) | Logic is testable in isolation. UI is trivially replaceable. |
| A3 | Hooks live in `core/<feature>/use*.ts`, one per feature | Keeps each feature together in one folder. React is confined to that single file. |
| A4 | Pure functions are separate files from hooks. Lint forbids React imports outside `use*.ts` | Pure core stays framework-free and testable. |
| A5 | Unit tests (Vitest) for core pure functions only | Components and hooks hold no logic, so there is nothing worth testing there. |
| A6 | SCSS modules per component. No CSS library | Scoped styles, no dependency. |
| A7 | All constants in `core/constants.ts`. Reference data in `core/referenceData/`, one file per measure | One seam for settings. Data files stay readable and editable by a human. |
| A8 | Inputs (dates) are validated by pure core functions | Calculations only ever see valid input, and validation is tested. |
| A9 | Hooks return view-ready (formatted) data | Components and `App.tsx` contain zero logic. |
| A10 | No persistence, no backend | Not needed yet. In-memory state only. |
| A11 | Named exports only. Functional components only | Consistent imports, easy refactoring. |

## Folder structure

```
src/
  main.tsx                    # React entry; imports global styles, renders <App />
  App.tsx                     # Composition root: calls hooks, passes props to components
  App.module.scss             # Page layout only
  styles/
    global.scss               # Truly global styles only (reset, body, CSS variables)
  components/
    <ComponentName>/
      <ComponentName>.tsx
      <ComponentName>.module.scss
  core/
    constants.ts              # ALL constants (units, locale, ranges, defaults, thresholds)
    referenceData/            # Reference tables, data only, one file per measure
      types.ts
      referenceTables.ts      # Ordered list of all tables (display order)
      <measure>.ts
    <feature>/
      types.ts                # Feature domain types
      <pureThing>.ts          # Pure functions
      <pureThing>.test.ts     # Tests next to the code
      use<Feature>.ts         # The ONLY React file in this feature
    format/                   # Shared pure display formatting (numbers, dates, units)
```

Add a new `core/<feature>/` folder only for a genuinely new capability. Don't split further
just to look tidy. The app should stay small enough to read in one sitting.

## Layers and dependency rules

```
components  <--props--  App.tsx  --calls-->  core/<feature>/use*.ts  --calls-->  core pure functions
```

| Layer | May import | Must NOT import |
|---|---|---|
| `components/` | React, other components, its own `.module.scss` | anything from `core/` (not even types) |
| `App.tsx` | components, `core/**/use*.ts` | pure core functions directly |
| `core/**/use*.ts` | React, pure core files | components, styles |
| `core/` pure files | other pure core files | React, components, styles, browser APIs |

ESLint enforces these rules (`no-restricted-imports` per path). Pure core files are also
linted against reading the clock (`Date.now()`, `new Date()`), `Math.random` and browser
globals. Never disable the rule to get
past it. Fix the layering instead.

## Components (`src/components/`)

Components are **dumb and flat**:

- Functional arrow components. **Named exports only, no `export default`.**
- One component per folder: `Foo/Foo.tsx` + `Foo/Foo.module.scss`. No barrel `index.ts` files.
- Props in, JSX and callbacks out. **No business logic**: no calculations, parsing,
  formatting or decisions. No conditionals beyond "render this prop if present".
- No state, effects or data fetching.
- Props are primitives or simple objects/arrays of primitives, already formatted for display
  (e.g. `weight: "1 250 g"`, not `weight: 1250`).
- Generic over specific: prefer `DateField`, `ValueRow`, `WeekColumn` over `FetalWeightRow`.
- Keep nesting shallow. Compose in `App.tsx` rather than building deep component trees.
- Props are an exported `type <ComponentName>Props`.

```tsx
import styles from './ResultCard.module.scss';

export type ResultCardProps = {
  title: string;
  cost: string;
  highlighted: boolean;
};

export const ResultCard = ({ title, cost, highlighted }: ResultCardProps) => (
  <div className={highlighted ? styles.highlighted : styles.card}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.cost}>{cost}</p>
  </div>
);
```

## Styling

- All component styles live in that component's `*.module.scss`. Page layout for `App.tsx`
  lives in `App.module.scss`.
- Third-party CSS (the date picker's `style.css`) is imported once in `main.tsx`. Theme it from
  the component that uses it, via `:global(...)` in that component's module.
- `src/styles/global.scss` holds only truly global concerns: reset, `html/body`,
  CSS custom properties (colors, spacing). Nothing component-specific.
- No CSS libraries, no CSS-in-JS. No inline `style={{}}` except for genuinely dynamic values.

## Core (`src/core/`)

### Pure functions

- **Pure**: same input gives the same output. No side effects, no `Date.now()`, no randomness,
  no globals other than imported constants.
- Small, single-purpose, clearly named (`calculateGestationalAge`, not `calc`).
- "Today" is read in the hook and passed in. Pure functions never read the clock.
- Dates are handled as local calendar dates. Day differences never depend on time of day or DST.
- Explicit parameter and return types.
- Never round inside calculations. Round only when formatting for display.
- Calculations receive validated, typed numbers, never raw strings.

### Hooks (`use*.ts`)

- One per feature, and it is the only file in the feature that imports React.
- Only holds state (`useState`, `useMemo`) and calls pure functions. **No inline logic.** If an
  expression does more than pass values through, move it into a pure function and test it.
- Returns **view-ready** data (formatted strings, booleans, error messages) plus change handlers,
  so `App.tsx` only does wiring.

### Constants (`core/constants.ts`)

- Every magic value lives here: locale, UI texts and error messages, date format, days to due
  date, max gestational age, days per week.
- Nothing else hardcodes these. Read constants as inputs to functions instead of scattering
  them through the code. This file is where user settings will plug in later.

### Reference data (`core/referenceData/`)

- Data only. There is one file per measure. Each file starts with its source and exports one
  typed table: `kind` (`'single' | 'range'`), `label`, `unit` and `entries`.
- An entry is `{ week, day?, value }`. `day` defaults to 0 and allows finer granularity later.
  `value` is a number for `single`, or `{ min, max }` for `range`.
- Labels and units live with the data (not in `constants.ts`), so each file is self-contained.
- `referenceTables.ts` lists the tables in display order. Adding a measure means adding a file
  and one line there.
- A pure validator checks every table (sorted, no duplicates, whole numbers, `min <= max`,
  ages in range) and has tests that run against the real data files.
- Real-world figures come from the project owner. **Agents must not invent them.**

### Input validation

- Dates from the date picker are stored as-is in the hook. A pure function validates the
  pair (LMP, reference date) and returns either a typed result or a Swedish error message.

### Dependencies

- Date picker: `react-day-picker` (v10, Swedish locale), used only in components. Never build
  a custom picker. (v10 also publishes as `@daypicker/react`, which has the same API.)
- Date math: `date-fns` (`differenceInCalendarDays`, `addDays`, `format`).

## Testing

- Vitest. Tests sit next to the code: `foo.ts` -> `foo.test.ts`.
- **Every pure function in `core/` has tests**: normal cases, edge cases and invalid input.
- Do not unit test hooks, components or `App.tsx`. If one seems to need a test, its logic
  belongs in a pure function.

## Code conventions

- TypeScript strict. No `any`. No non-null assertions (`!`) without a comment explaining why.
- Named exports everywhere. The only default exports allowed are ones a tool requires (e.g. `vite.config.ts`).
- Use `type` over `interface`.
- File names: `PascalCase` for components, `camelCase` for everything else.
- No new dependencies without asking.
