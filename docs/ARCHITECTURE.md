# Architecture

## Purpose

A static, mobile-first companion site for **Fire Emblem: Fortune's Weave**. It reads two
JSON datasets generated from the source Excel workbook and renders them as filterable,
sortable, searchable tables in vanilla HTML, CSS and JavaScript.

There is no backend, no runtime framework and no bundler. The only development dependency
is used by the Excel-to-JSON conversion script.

## Stack

- **HTML5**, **CSS3** (custom properties, flex/grid, media queries) and **vanilla JS**
  (ES modules).
- **Node.js 20+** only for the conversion script and the unit tests.
- **`exceljs`** as the single `devDependency` to read the `.xlsx` workbook.
- **`node --test`** for unit-testing pure logic.
- Static hosting via **GitHub Pages from the root of `main`**; all asset paths are relative.

Browser support: current Chrome, Firefox, Safari and Edge (ES modules, modern CSS).

## Repository Layout

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js        # bootstrap: load data, wire controls, initial render
│   ├── data.js        # JSON loading and normalisation into app models
│   ├── state.js       # filter / sort / search state
│   ├── logic.js       # pure filter, sort and search functions (testable)
│   └── render.js      # DOM rendering for characters and classes
├── data/
│   ├── characters.json
│   └── classes.json
├── scripts/
│   └── build-data.mjs # Excel -> JSON conversion
├── tests/
│   ├── logic.test.js
│   └── data.test.js
├── package.json       # scripts + exceljs devDependency only
├── docs/
├── specs/
└── FE_Fortunes_Weave_Character_Classes.xlsx
```

`package.json` sets `"type": "module"` so browser ES modules and `node --test` share the
same `.js` logic files.

## Data Pipeline

`scripts/build-data.mjs` reads `FE_Fortunes_Weave_Character_Classes.xlsx` and writes
`data/characters.json` and `data/classes.json`.

Rules:

- The first row of each sheet is the header and is not data.
- Fully empty rows are skipped.
- Rows whose first cell is `Notes / Sources` and the rows after it are collected into the
  JSON `meta.notes` array instead of the data arrays.
- The redundant side list in the `Classes` sheet (columns M-R) is ignored.
- String values are trimmed; `—` is preserved verbatim as "not applicable".
- Column names are mapped to camelCase JSON keys.
- `meta` records the source workbook name and the generation timestamp.

### Data models

`data/characters.json`

```json
{
  "meta": { "source": "FE_Fortunes_Weave_Character_Classes.xlsx", "generatedAt": "...", "notes": [] },
  "characters": [
    {
      "name": "Alexandra",
      "type": "Recruitable",
      "tierScore": 5,
      "tierLetter": "S",
      "recruitRoute": "All",
      "initialClass": "Gladiator",
      "intermediateClass": "Wing Soldier",
      "advancedClass": "Dragoon",
      "masterClass": "Celestial Trooper",
      "divineClass": "The Cavalier",
      "roleNotes": "..."
    }
  ]
}
```

`data/classes.json`

```json
{
  "meta": { "source": "FE_Fortunes_Weave_Character_Classes.xlsx", "generatedAt": "...", "notes": [] },
  "classes": [
    {
      "name": "Commoner",
      "type": "Base",
      "minLevel": "—",
      "renown": "—",
      "license": "—",
      "weaponRanksRequired": "—",
      "weapons": "Any",
      "movement": "4 (foot)",
      "classSkills": "—",
      "masterySkill": "Combat Basics",
      "spanishName": "Plebeyo",
      "notes": "Starting class; no exam."
    }
  ]
}
```

`tierScore` is emitted as a number; every other field stays a string so that `—` and ranges
are preserved exactly.

## Frontend Architecture

- **Separation of concerns:** `logic.js` holds pure functions with no DOM access; `render.js`
  builds DOM; `state.js` owns the current filter/sort/search values; `main.js` coordinates.
- **State:** plain objects, one per section (`characters`, `classes`). No global mutable
  singletons beyond the section controllers.
- **Rendering:** the full dataset is fetched once on load. Filtering, sorting and search are
  applied in memory and the table body is re-rendered. No virtual DOM.
- **Tables:** semantic `<table>` elements with `<caption>`, `<thead>` and `<th scope="col">`.
  A sticky header and sticky first column keep context while the table scrolls.
  Horizontally scrollable wrappers are focusable (`tabindex="0"`) with an accessible label.
- **Controls:** native `<select>` for filters and sort, native `<input type="search">` for
  search, each with a `<label>`. No custom widgets.
- **Empty state:** when filters return no rows, an accessible status message is shown and
  the table body is cleared.
- **Notes:** the JSON `meta.notes` are rendered in a `<footer>` per section.
- **No client-side routing or persistence:** state resets on reload.

## Responsive Strategy

- Mobile-first CSS; base styles target small screens.
- Primary target: phones in **landscape**, tuned against iPhone 16 landscape
  (852 × 393 CSS px) and similar widths.
- Tables use horizontal scrolling with sticky first column and sticky header to keep all
  columns reachable without breaking the semantic table structure.
- Controls stack in a single column on narrow widths and wrap into a row when space allows.
- Touch targets are at least 44 × 44 CSS px.

## Accessibility

- Landmarks (`header`, `main`, `section`, `footer`) and a visible page heading structure.
- Every control has a programmatic label; filter/sort state is also announced in text.
- Visible focus styles, keyboard-operable controls and logical tab order.
- Contrast meets WCAG AA; colour is never the only carrier of meaning.
- Results count and empty state exposed via an `aria-live="polite"` status region.
- `prefers-reduced-motion` is respected for any transition.

## Verification

- `node --test` covers the pure logic (`logic.js`) and the data loading/normalisation
  (`data.js`) using small fixtures.
- Manual browser checks cover layout at iPhone 16 landscape, keyboard navigation, zoom to
  200%, and a screen-reader pass.
- The data script is re-runnable and its output is deterministic except for `generatedAt`.

## Governance

- Developers own Git flow and release decisions.
- Docs are updated before any change to this contract.
