# Deployment

The React project playground is published at [walkrantrolls.github.io/react](https://walkrantrolls.github.io/react/).

The GitHub Actions workflow builds the Vite app from `playground/`, runs the suite for both projects, and deploys `playground/dist` to GitHub Pages. Vite uses `/react/` as its base in Actions and `/` for local development.
