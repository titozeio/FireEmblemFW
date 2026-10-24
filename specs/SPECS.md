# Project Specs

## What We Are Building

A simple, static companion website for **Fire Emblem: Fortune's Weave** that makes the
character and class data currently stored in an Excel workbook accessible and usable from
a mobile device.

The site is a single landing page built with vanilla HTML, CSS and JavaScript. It contains
two sections, one per workbook sheet:

- **Characters** — roster data with tier scores, recruit routes and recommended class paths.
- **Classes** — class data with type, requirements, weapons, movement, skills and notes.

The data is converted from the Excel workbook into JSON that the page consumes with plain
JavaScript. No backend, database or build framework is required.

## Why

Viewing and comparing the data in Excel or Google Sheets is cumbersome on a phone: it is
hard to read, filter by route and sort by tier score. A dedicated mobile-first page should
make it fast to answer questions such as "which characters are available on the Theodora
route?" or "which S-tier units exist?" while keeping the same information as the source
workbook.

## How

- **Data pipeline:** one-off conversion from `FE_Fortunes_Weave_Character_Classes.xlsx` into
  a JSON file consumable by vanilla JS. The JSON is the runtime source of truth; the
  workbook remains the source for authoring.
- **Stack:** vanilla HTML, CSS and JavaScript only. No framework, no bundler.
- **Structure:** a single landing page with two sections: `Characters` and `Classes`.
- **Characters section:**
  - Display all workbook columns: Name, Type, Tier Score, Tier Letter, Recruit Route,
    Initial/Intermediate/Advanced/Master/Divine Class, Role/Notes.
  - Filter by Recruit Route, Tier Score and Tier Letter.
  - Sort by Name and Tier Score.
  - Free-text search by character name.
- **Classes section:**
  - Display all workbook columns: Class, Type, Min Level, Renown, License, Weapon Ranks
    Required, Weapons, Movement, Class Skills, Mastery Skill, Spanish Name, Notes.
  - Filter by Type.
  - Sort by Class and Type.
  - Free-text search by class name.
- **Content scope:** the content is the same as the workbook's main tables. The redundant
  side list of class names in the `Classes` sheet (columns M-R) is intentionally excluded.
  The workbook's final "Notes / Sources" rows are shown as a footer for each section.
- **Design:** a clean aesthetic inspired by Fire Emblem (typography, palette and restrained
  ornamentation) without sacrificing legibility.
- **Responsiveness:** mobile-first, with the primary target being phones in **landscape**
  orientation, giving special attention to iPhone 16 landscape resolutions.
- **Accessibility:** follow usability and accessibility best practices (semantic HTML,
  keyboard support, visible focus, sufficient contrast, ARIA where needed, respect for
  reduced motion).
- **Code quality:** follow good practices for vanilla front-end code: small modules, clear
  naming, separation of data / rendering / state, and no unnecessary dependencies.
- **Hosting:** deployable as a static site (e.g. GitHub Pages); no server-side runtime.

## Non-Goals

- No backend, database, authentication or user accounts.
- No editing, creating or persisting data from the website; it is read-only.
- No data beyond what the workbook contains (no extra guides, builds or theorycrafting).
- No internationalisation or language toggle; UI text is in English and data keeps its
  original English/unofficial-Spanish labels.
- No game engine, simulator or interactive battle mechanics.
- No support for the excluded DLC companions or unreleased content.
- No framework or build tooling unless a concrete need appears later.

## Operating Principles

- **Mobile-first, landscape-aware:** design for small landscape screens first, then enhance.
- **Data fidelity:** the site must not invent or reinterpret game data; missing values (`—`)
  are displayed as-is.
- **Readability over decoration:** Fire Emblem-inspired styling must never reduce contrast,
  legibility or usability.
- **Accessibility by default:** every interactive control is usable with keyboard and screen
  reader, and state is conveyed without relying on colour alone.
- **Progressive simplicity:** prefer plain HTML/CSS/JS and small, focused code over
  abstractions or dependencies.
- **Single source of truth:** the JSON is generated from the workbook; changes to game data
  start in the workbook.

## Additional Notes

- Source workbook: `FE_Fortunes_Weave_Character_Classes.xlsx`.
  - `Characters`: 69 character rows.
  - `Classes`: 60 class rows.
- Tier mapping: S=5, A=4, B=3, C=2, D=1.
- `Recruit Route` value `All` means the unit is available on every route; any other value is
  a route-exclusive or route-specific recruitment.
- `—` marks missing / not applicable values and must be preserved.
- Spanish class names are unofficial fan translations; English names are kept where no
  standard translation exists.
- The project follows the Agile SDD methodology; see `AGENTS.md`.
