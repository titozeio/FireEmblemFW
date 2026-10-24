# EPIC4 – Responsive, accessibility and deployment

## Objective

Harden the site for mobile-first landscape (iPhone 16), pass an accessibility review
and publish it as a static site on GitHub Pages.

## User Stories

- **US1.** As a user on a phone in landscape (iPhone 16), I want the layout, controls
  and tables to be usable with horizontal scrolling and adequate touch targets.
- **US2.** As a user using a keyboard or screen reader, I want semantic HTML, labels,
  focus states, ARIA live regions and sufficient contrast.
- **US3.** As a developer, I want to verify the site works from the repository root with
  relative paths so it deploys to GitHub Pages.
- **US4.** As the PM, I want the site published to GitHub Pages (root of `main`).

## Scope

- CSS adjustments for landscape breakpoints and iPhone 16 (852×393 CSS px).
- Accessibility checks and small fixes if needed.
- Ensure relative asset paths and no absolute URLs to local files.
- Manual verification.

## Out of Scope

- Custom domain configuration.
- CI/CD pipeline.
- Automated accessibility tests.
