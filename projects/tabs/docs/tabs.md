# Tabs Component

## Problem

Show one panel of related content at a time, and let the user switch the visible panel by selecting its tab.

## Concept and implementation

The implementation lives in `projects/tabs/src/`:

- `app.tsx` supplies an array of items containing `label`, `value`, and `panel`.
- `tabs.tsx` stores the selected value in React state. It accepts an optional `defaultValue`, otherwise selects the first item.
- `styles.css` styles the tab buttons and selected state.
- `index.tsx` mounts the app in Strict Mode.

The playground loads the Tabs project through a dedicated Vite page in an iframe. This isolates the project's global `body` style.

## Execution walkthrough

1. The app passes its `TABS_DATA` array to `Tabs`.
2. `Tabs` initializes `activeTab` from `defaultValue` or the first item's value.
3. It renders a button for every item's label and marks the selected button with `tabs-list-item--active`.
4. It renders every panel inside a wrapper; inactive wrappers receive the `hidden` attribute.
5. Clicking a tab updates `activeTab`, which changes the selected button class and visible panel.

## Edge cases

- At least one item is required because the initial selection reads `items[0].value`.
- A supplied `defaultValue` should match an item's value.
- Clicking the currently selected tab keeps that item active.
- This supplied implementation does not add keyboard arrow navigation or ARIA tab roles.

## Tests

Run `npm test` from `playground/`. Tests cover default selection, the optional initial value, switching panels, and opening the standalone demo from the project sidebar.

## Real-world demonstration

The content panels describe HTML, CSS, and JavaScript, like a compact reference panel. The same component pattern can organize documentation, settings, or product details.

## Complexity

For `n` items, rendering creates n buttons and n panel wrappers, so render time and element storage are O(n). Selecting a tab updates one state value in O(1); React then re-renders the O(n) item list.
