# Todo List project — implementation notes

## Problem

Let a user add plain text tasks to a list and delete existing tasks.

## Implementation

`src/App.jsx` contains the complete project implementation. It initializes the list with three sample tasks, stores the input and task array in React state, trims input before adding it, clears the field after a successful add, and removes a task by its id.

Task labels render as React text children, so markup-like user input is displayed as text rather than interpreted as HTML. The input has the accessible name “Add your task.”

## Execution flow

1. The initial task list is created with stable numeric IDs.
2. Typing updates the controlled `todo` value.
3. Clicking Submit trims the input and returns without changing the list when it is empty.
4. A non-empty value is appended immutably and the input is cleared.
5. Each list item has a Delete button that removes the task by ID.

## Tests

Run `npm test` from `playground/`. Tests cover the initial sample tasks, trimmed additions, empty input, plain-text rendering of markup-like input, and deletion.

## Complexity

For `n` tasks, adding and deleting use array operations that take O(n) time and O(n) additional space. Rendering takes O(n) time and space for the list items.
