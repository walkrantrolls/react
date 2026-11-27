import { useState } from "react";
import TodoListProject from "../../projects/todo-list/src/App.jsx";
import TabsProject from "../../projects/tabs/TabsProject.jsx";
import ContactFormProject from "../../projects/contact-form/ContactFormProject.jsx";

const PROJECTS = [
  {
    id: "todo-list",
    label: "Todo List",
    summary: "Task manager",
    component: TodoListProject,
  },
  {
    id: "tabs",
    label: "Tabs",
    summary: "Reusable UI component",
    component: TabsProject,
  },
  {
    id: "contact-form",
    label: "Contact Form",
    summary: "Form submission",
    component: ContactFormProject,
  },
];

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find((project) => project.id === activeProjectId);
  const ActiveProject = activeProject.component;

  function handleProjectTabKeyDown(event, currentIndex) {
    const keyActions = {
      ArrowDown: (index) => (index + 1) % PROJECTS.length,
      ArrowRight: (index) => (index + 1) % PROJECTS.length,
      ArrowUp: (index) => (index - 1 + PROJECTS.length) % PROJECTS.length,
      ArrowLeft: (index) => (index - 1 + PROJECTS.length) % PROJECTS.length,
      Home: () => 0,
      End: () => PROJECTS.length - 1,
    };
    const getNextIndex = keyActions[event.key];

    if (!getNextIndex) return;

    event.preventDefault();
    const nextProject = PROJECTS[getNextIndex(currentIndex)];
    setActiveProjectId(nextProject.id);
    document.getElementById(`project-tab-${nextProject.id}`)?.focus();
  }

  return (
    <div className="app-layout">
      <aside className="project-sidebar" aria-label="React project sidebar">
        <a className="sidebar-brand" href="https://github.com/walkrantrolls/react" target="_blank" rel="noreferrer">
          <span className="sidebar-brand-mark" aria-hidden="true">R</span>
          <span>react<span className="sidebar-brand-dot">.</span></span>
        </a>

        <div className="sidebar-heading">
          <p className="sidebar-kicker">PROJECT WORKSPACE</p>
          <h2 className="sidebar-title">Your projects</h2>
          <p className="sidebar-description">Small interfaces, built with care.</p>
        </div>

        <nav className="project-navigation" aria-label="React projects">
          <p className="sidebar-section-label">PROJECTS <span>{String(PROJECTS.length).padStart(2, "0")}</span></p>
          <div className="project-tablist" role="tablist" aria-label="React projects">
            {PROJECTS.map((project, index) => {
              const selected = project.id === activeProjectId;

              return (
                <button
                  aria-controls="project-panel"
                  aria-selected={selected}
                  className={`project-tab ${selected ? "is-active" : ""}`}
                  id={`project-tab-${project.id}`}
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  onKeyDown={(event) => handleProjectTabKeyDown(event, index)}
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <span className="project-tab-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-tab-copy">
                    <span className="project-tab-name">{project.label}</span>
                    <span className="project-tab-summary">{project.summary}</span>
                  </span>
                  <span className="project-tab-arrow" aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-live-dot" aria-hidden="true" />
          <span>OPEN SOURCE PROJECTS</span>
          <a href="https://github.com/walkrantrolls/react" target="_blank" rel="noreferrer" aria-label="Browse React projects on GitHub">↗</a>
        </div>
      </aside>

      <main className="project-main">
        <div className="page-shell">
          <div
            aria-labelledby={`project-tab-${activeProject.id}`}
            className="project-panel"
            id="project-panel"
            role="tabpanel"
            tabIndex={0}
          >
            <ActiveProject />
          </div>
        </div>
      </main>
    </div>
  );
}
