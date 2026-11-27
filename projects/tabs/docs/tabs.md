# Tabs Component

## Problem

Build a tabbed interface that displays one of three related descriptions at a time: HTML, CSS, or JavaScript. Selecting a button changes the visible panel.

## Concept and implementation

The supplied implementation lives in `projects/tabs/src/`:

- `tabs.tsx` keeps the selected key in React state and updates it from button clicks.
- `styles.css` applies the base font and visibility rules.
- `app.tsx` renders the component.
- `index.tsx` attaches the app to a root in Strict Mode.

The playground loads this source through a dedicated Vite demo page in an iframe. That keeps the supplied global `p.active` and `p:not(.active)` selectors scoped to the Tabs project.

## Execution walkthrough

1. The component initializes `activeTab` to `"html"`.
2. React renders the HTML, CSS, and JavaScript buttons.
3. The HTML paragraph receives the `active` class; the others do not.
4. The stylesheet shows the active paragraph and hides the others.
5. Clicking a button calls `handleClick` with its tab key.
6. `setActiveTab` updates state and React applies the active class to the selected paragraph.

## Edge cases

- HTML is selected before interaction.
- Clicking the selected tab keeps the same panel visible.
- Each fixed button key maps to one panel.
- The supplied example does not implement keyboard arrow navigation or ARIA tab semantics.

## Tests

Run `npm test` from `playground/`. Tests cover initial selection, CSS selection, switching among all three panels, and opening the standalone demo from the project sidebar.

## Real-world demonstration

The demo models a reference panel that switches among HTML, CSS, and JavaScript descriptions. Tabs also keep related documentation, settings, or product details together in a compact view.

## Complexity

The fixed example renders three buttons and three paragraphs. Rendering and a selection update therefore take constant time for this fixed number of tabs, and active state takes constant space.
