# Todo List project — implementation notes

## Problem

A user needs to create tasks from a text field and remove them from a list. Input must be treated as plain text, and the form must work for keyboard and assistive-technology users.

## Behavior and decisions

- A native form handles both button clicks and Enter submissions.
- A visible submit button and an associated label make the input discoverable.
- Whitespace is trimmed. Empty input is rejected and retained so the user can correct it.
- Successful submission appends immutably, clears the field, and announces the addition through a polite live region.
- Task text is rendered as a React text child; user input is never passed to `innerHTML`.
- Each task has an individually named delete control.
- Completion and filtering are included as usability additions.

## Data model

Each task is a plain object:

```js
{ id: "unique-id", text: "Prepare project notes", completed: false }
```

The pure operations in `src/todoModel.js` return new arrays and never mutate the previous list. The project component owns task, filter, draft, and status state.

## Execution flow

1. Typing updates the controlled input state.
2. Form submission prevents navigation and trims the draft.
3. Blank text announces validation without adding a task or clearing the input.
4. Valid text is passed to `addTask`, which returns a new array.
5. React renders the text safely, the input resets, and the live region announces success.
6. The delete control calls `removeTask`; the returned array omits that task.
7. Completion state is toggled immutably, while filters derive the visible subset.

## Tests

Run `npm test` from `playground/`. The project tests cover form submission, input clearing, whitespace, safe text rendering, deletion, completion, filters, task counts, and immutable collection operations.

## Complexity

For `n` tasks, adding, deleting, toggling, filtering, and deriving counts scan or copy the task array in O(n) time. Array-producing operations use O(n) additional space; counting uses O(1).

The list is in-memory and resets on page refresh.
