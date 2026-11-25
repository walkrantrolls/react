# Deployment

The project is built with Vite and published to the repository Pages URL:

`https://walkrantrolls.github.io/react/`

The workflow in `.github/workflows/deploy-todo-list.yml` installs dependencies, runs the test suite, builds the static app, and deploys `todo-list/dist` to GitHub Pages when changes are pushed to `main`.

## One-time GitHub setup

In the `walkrantrolls/react` repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Merge the project PR into `main` (or push an update to `main`) to start the deployment workflow.
4. Check the **Actions** tab. When the Pages workflow completes, the live URL above should load the app.

Vite uses `/react/` as its base path in GitHub Actions, while local development uses `/`.
