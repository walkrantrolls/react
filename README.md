# React projects

A collection of React projects and experiments. Each project has its own implementation, tests, and notes; the shared playground provides project navigation and the live portfolio.

## Projects

- [Todo List](./projects/todo-list/) — task creation and deletion with plain-text rendering.
- [Tabs](./projects/tabs/) — the supplied HTML/CSS/JavaScript tabs component challenge.
- [Contact Form](./projects/contact-form/) — a labeled form that submits JSON to the GreatFrontEnd endpoint.

## Live playground

[Open the React playground](https://walkrantrolls.github.io/react/)

The sidebar switches between the Todo List, Tabs, and Contact Form projects.

## Run locally

The playground owns the Vite app and dependency setup:

```sh
cd playground
npm install
npm run dev
```

Run the project and integration tests, then build the site:

```sh
npm test
npm run build
```

## Repository layout

```text
react/
├── .github/workflows/deploy-react-playground.yml
├── playground/                 # Shared navigation shell and Pages build
│   ├── src/
│   ├── index.html
│   ├── tabs-demo.html
│   ├── contact-form-demo.html
│   ├── package.json
│   └── vite.config.js
└── projects/
    ├── todo-list/              # Todo List project
    ├── tabs/                   # Tabs component project
    └── contact-form/           # Contact Form project
```
