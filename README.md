# React projects

A collection of React projects and experiments. Each project lives in its own folder so it can be developed and documented independently.

## Projects

### Todo List

An accessible task manager that demonstrates safe form handling, immutable React state, and basic CRUD interactions.

- [Open the Todo List source](./todo-list/)
- [Read the engineering notes](./todo-list/docs/implementation.md)

## Running a project

From the project folder:

```sh
cd todo-list
npm install
npm run dev
```

Run its tests and production build with:

```sh
npm test
npm run build
```

## Repository layout

```text
react/
└── todo-list/
    ├── docs/
    ├── src/
    ├── index.html
    ├── package.json
    └── vite.config.js
```
