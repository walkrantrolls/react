# Tabs Component

## Problem

Build a reusable component that shows one content panel at a time. Users can switch panels by choosing a tab, each instance can start on a requested tab, and multiple instances must keep their selections independent.

## Conceptual model

A tab group needs one changing value: the active tab. Each item pairs a unique `value` with a visible `label` and a `panel`. The component owns the active value in local React state, so separate instances do not share selection state.

## API

```jsx
<Tabs
  items={[
    { value: "html", label: "HTML", panel: <p>Markup content</p> },
    { value: "css", label: "CSS", panel: <p>Style content</p> },
  ]}
  defaultValue="html"
/>
```

- `items`: ordered tab definitions with unique values.
- `defaultValue`: optional initial selection. If omitted, the first item is selected.

## Implementation

`src/components/Tabs.jsx` keeps the active value in local component state. Each button updates that value. The matching panel remains visible while all other panels receive the `hidden` attribute.

## Walkthrough

1. Initialize the active value from `defaultValue`, or use the first item's value.
2. Render each item's label as a button and visually mark the active button.
3. Render each associated panel.
4. Clicking a button updates this Tabs instance's active value.
5. React updates the selected style and hides every panel except the matching one.

## Playground demonstration

The Tabs project shows two component instances: a Web foundations reference view and a team workflow view. The first opens on HTML; the second opens on Build. Switching one group leaves the other group's selection unchanged.

## Edge cases

- Empty item list: the component renders nothing.
- Missing `defaultValue`: the first item becomes active.
- Duplicate item values are invalid because values identify tabs and panels.
- The component is uncontrolled: `defaultValue` is read only during initialization.

## Tests

Run `npm test` in `todo-list/`. `src/components/Tabs.test.jsx` covers rendering, default selection, switching panels, empty input, and independent state across multiple instances. `src/App.test.jsx` verifies the sidebar opens the Tabs project.

## Complexity

For `n` tabs, rendering and lookup are O(n) time and O(n) space for tab and panel elements. Selecting a tab is O(1) state work; React re-renders the component's O(n) children.

## Source prompt

This project follows the core API and behavior of the [GreatFrontEnd Tabs in React challenge](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/tabs/react?qns_context=3a3445f6-16d3-40c6-b46c-039e118f9409).
