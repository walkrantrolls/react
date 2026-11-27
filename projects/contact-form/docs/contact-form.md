# Contact Form

## Problem

Collect a visitor's name, email address, and message, then submit those values to the GreatFrontEnd contact form endpoint.

## Implementation

The project source follows the supplied solution:

- `App.jsx` renders the labeled inputs, textarea, and POST form.
- `submitForm.js` checks the form action and method, serializes the fields into JSON, posts them, and alerts the response text.
- `styles.css` applies the source form styling.
- `index.jsx` mounts the form app.

The playground loads the project in an iframe so its global `body`, `form`, `label`, `input`, and `textarea` selectors stay within this demo.

## Execution flow

1. The visitor enters a name, email, and message.
2. Submitting calls `submitForm`, which prevents a full page navigation.
3. The handler verifies that the form action and method match the challenge values.
4. It reads the form through `FormData` and sends a JSON POST request.
5. The response text is shown in an alert; request errors produce an error alert.

## Tests

Run `npm test` from `playground/`. Tests verify the labeled fields, JSON request payload, success response, and request-error handling. Network access is mocked.

## Complexity

Reading the three form fields and creating the request payload take O(1) time and space because the form has a fixed number of fields.
