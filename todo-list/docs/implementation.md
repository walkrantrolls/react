# Todo List — implementation notes

## Problem

A user needs to create tasks from a text field and remove them from a list. Input must be treated as plain text, and the form must work for keyboard and assistive-technology users.

## Behavior and decisions

- A native `<form>` handles both button clicks and Enter submissions.
- A visible submit button and a programmatically associated label make the input discoverable.
- Whitespace is trimmed. Empty or whitespace-only input is rejected and left in the field so the user can correct it.
- A successful submission appends a new task immutably, clears the field, and announces the addition through a polite live region.
- Task content is rendered as a React text child. React escapes text values; user input is never passed to `innerHTML`.
- Each task has a dedicated, individually named delete control.
- Completion and list filters are small usability additions; they use native buttons with accessible names and `aria-pressed` state.

## Data model

Each task is a plain object:

```js
{ id: "unique-id", text: "Prepare project notes", completed: false }
```

The pure operations in `src/todoModel.js` return new arrays and never mutate the previous list. The component keeps the task list, current filter, draft input, and status message in React state.

## Execution flow

1. The user types into the controlled input. React updates `draft`.
2. Submitting the form prevents page navigation and trims the draft.
3. Blank text sets a validation announcement without adding a task or clearing the input.
4. Valid text is passed to `addTask`, which creates a task and returns a new array.
5. React renders the task as escaped text. The input resets and the live region announces success.
6. The delete button calls `removeTask`; the returned array omits the selected task.
7. Completion state is toggled immutably, and filters derive a visible subset without changing stored tasks.

## Project sidebar

The project registry in `src/App.jsx` drives the sidebar tab list. Each registry entry supplies a stable ID, label, short description, and React component. Selecting a tab renders its project in the associated tab panel. Left/right and up/down arrows move between project tabs; Home and End select the first and last tab. On narrow screens, the sidebar becomes a horizontally scrollable project strip.

To add another project, implement its component in `src/` and add one entry to `PROJECTS`. The sidebar, tab panel, and project count are derived from that registry.

## Accessibility

- The input has the accessible name “New task” through a `label`.
- The form is keyboard-operable and Enter submits it.
- Status updates use `role="status"` and `aria-live="polite"`.
- Filter controls expose selection with `aria-pressed`.
- Completion and delete buttons have task-specific accessible names.
- Visible focus styles are provided for interactive controls.
- Empty states explain what is happening instead of leaving a blank list.

## Tests

Run `npm test` inside `todo-list/`. Vitest runs in jsdom with React Testing Library.

The tests cover:

- task normalization and blank input rejection
- immutable add, toggle, and delete operations
- task filtering and derived counts, including the empty list
- submit button and Enter-key flows
- input clearing only after a successful add
- accessible input naming and status announcements
- rendering markup-like input as text, with no injected image element
- delete, completion, and filter interactions

## Complexity

Let `n` be the number of tasks.

| Operation | Time | Extra space | Reason |
| --- | --- | --- | --- |
| Add | O(n) | O(n) | Copies the existing array and appends one task |
| Delete | O(n) | O(n) | Filters into a new array |
| Toggle completion | O(n) | O(n) | Maps to a new array |
| Filter visible tasks | O(n) | O(k) | Scans tasks and returns the matching subset |
| Derive counts | O(n) | O(1) | Single pass over the task list |

The list is intentionally in-memory: refreshing the page resets it. Persistence can be added later as a separate concern.
