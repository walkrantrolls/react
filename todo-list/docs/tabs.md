# Tabs Component

## Problem

Build a tabbed interface that displays one of three related descriptions at a time: HTML, CSS, or JavaScript. Selecting a button changes the visible panel.

## Concept

The component uses React state to remember the currently selected tab. Each button updates that state. The component returns the button row and all three paragraphs; CSS displays the selected paragraph and hides the rest.

## Implementation

The supplied implementation lives in `src/projects/tabs/`:

- `tabs.tsx` contains the component and its click-to-select state.
- `styles.css` applies the base font and visibility rules.
- `app.tsx` mounts the component.
- `index.tsx` attaches the React app to the page in Strict Mode.

The entry point is loaded by `tabs-demo.html`, a second Vite HTML entry. In the portfolio, the Tabs project displays that page in an iframe. This preserves the supplied CSS selectors (`p.active` and `p:not(.active)`) without letting them affect paragraphs elsewhere in the portfolio.

## Execution walkthrough

1. The component initializes `activeTab` to `"html"`.
2. React renders the HTML, CSS, and JavaScript buttons.
3. The HTML paragraph receives the `active` class; the other paragraphs do not.
4. The stylesheet shows `p.active` and hides `p:not(.active)`.
5. Clicking a button calls `handleClick` with its tab key.
6. `setActiveTab` updates component state, and React renders the new active class.

## Edge cases

- Before interaction, HTML is selected.
- Clicking the already selected tab leaves the same panel visible.
- Each button uses a fixed key that corresponds to one panel.
- The example does not implement keyboard arrow navigation or ARIA tab semantics; its behavior follows the supplied source.

## Tests

Run `npm test` from `todo-list/`. The Tabs tests cover the initial panel, switching to CSS, and switching among all three panels. The portfolio integration test verifies that selecting the Tabs project loads its standalone demo page.

## Real-world demonstration

The standalone demo models a simple reference panel where a reader switches among HTML, CSS, and JavaScript descriptions. The same pattern is used in documentation, settings views, and compact product detail pages to keep related content in one place.

## Complexity

For this fixed three-tab example, rendering creates three buttons and three paragraphs, so rendering is O(1) with respect to the fixed tab count. A click updates one state value and triggers a render of the same fixed set of elements. State storage is O(1).
